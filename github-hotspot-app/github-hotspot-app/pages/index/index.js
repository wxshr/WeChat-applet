const api = require('../../utils/api');
const util = require('../../utils/util');

Page({
  data: {
    weekly: [], // 每周热门
    isLoading: false,
    hasMore: true,
    currentPage: 1,
    languages: [
      { name: '全部', value: '' },
      { name: 'JavaScript', value: 'javascript' },
      { name: 'Python', value: 'python' },
      { name: 'Java', value: 'java' },
      { name: 'Go', value: 'go' },
      { name: 'Rust', value: 'rust' }
    ],
    currentLanguage: ''
  },

  onLoad: function() {
    this.fetchTrendingRepos();
  },
  
  onPullDownRefresh: function() {
    this.setData({
      weekly: [],
      currentPage: 1,
      hasMore: true
    });
    this.fetchTrendingRepos().then(() => {
      wx.stopPullDownRefresh();
    }).catch(() => {
      wx.stopPullDownRefresh();
    });
  },
  
  onReachBottom: function() {
    if (!this.data.hasMore || this.data.isLoading) return;
    this.fetchTrendingRepos(this.data.currentPage + 1);
  },
  
  // 选择编程语言
  onLanguageChange: function(e) {
    const language = e.currentTarget.dataset.language;
    this.setData({
      currentLanguage: language,
      weekly: [],
      currentPage: 1,
      hasMore: true
    });
    this.fetchTrendingRepos();
  },
  
  // 获取热门仓库
  fetchTrendingRepos: function(page = 1) {
    if (this.data.isLoading) return Promise.reject();
    
    this.setData({ isLoading: true });
    
    return api.getTrendingRepos(this.data.currentLanguage, 'weekly', page)
      .then(repos => {
        // 检查仓库是否已收藏
        repos.forEach(repo => {
          repo.isFavorited = util.isFavorite(repo.id);
        });
        
        // 更新数据
        this.setData({
          weekly: page === 1 ? repos : this.data.weekly.concat(repos),
          isLoading: false,
          hasMore: repos.length === 10,
          currentPage: page
        });
      })
      .catch(err => {
        console.error('获取热门仓库失败:', err);
        this.setData({ isLoading: false });
        wx.showToast({
          title: '获取数据失败',
          icon: 'none'
        });
      });
  },
  
  // 收藏状态变化处理
  onFavoriteChange: function(e) {
    const { repo, isFavorited } = e.detail;
    const index = this.data.weekly.findIndex(item => item.id === repo.id);
    
    if (index > -1) {
      // 更新收藏状态
      this.setData({
        [`weekly[${index}].isFavorited`]: isFavorited
      });
    }
  },
  
  // 分享功能
  onShareAppMessage: function() {
    return {
      title: 'GitHub热点小程序',
      path: '/pages/index/index'
    };
  }
}); 