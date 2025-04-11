const api = require('../../utils/api');
const util = require('../../utils/util');

Page({
  data: {
    repoInfo: null,
    owner: '',
    repo: '',
    isLoading: false,
    isFavorited: false,
    commitActivity: [],
    currentTab: 'info' // info, activity
  },
  
  onLoad: function(options) {
    // 如果有参数，说明是从首页或收藏页跳转而来，直接加载详情
    if (options.owner && options.repo) {
      this.setData({
        owner: options.owner,
        repo: options.repo
      });
      this.fetchRepoDetail();
    }
  },
  
  // 获取仓库详情
  fetchRepoDetail: function() {
    const { owner, repo } = this.data;
    if (!owner || !repo) return;
    
    this.setData({ isLoading: true });
    
    // 获取仓库详情
    api.getRepoDetail(owner, repo)
      .then(repoInfo => {
        // 更新数据并检查是否已收藏
        this.setData({
          repoInfo: repoInfo,
          isLoading: false,
          isFavorited: util.isFavorite(repoInfo.id)
        });
        
        // 默认加载仓库活动
        this.fetchRepoActivity();
      })
      .catch(err => {
        console.error('获取仓库详情失败:', err);
        this.setData({ isLoading: false });
        wx.showToast({
          title: '获取数据失败',
          icon: 'none'
        });
      });
  },
  
  // 获取仓库活动
  fetchRepoActivity: function() {
    const { owner, repo } = this.data;
    if (!owner || !repo) return;
    
    this.setData({ isLoadingActivity: true });
    
    // 获取仓库提交活动
    api.getRepoActivity(owner, repo)
      .then(activity => {
        // 处理活动数据，取最近10周
        const recentActivity = activity.slice(-10);
        this.setData({
          commitActivity: recentActivity,
          isLoadingActivity: false
        });
      })
      .catch(err => {
        console.error('获取仓库活动失败:', err);
        this.setData({ isLoadingActivity: false });
      });
  },
  
  // 切换选项卡
  switchTab: function(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ currentTab: tab });
  },
  
  // 切换收藏状态
  toggleFavorite: function() {
    if (!this.data.repoInfo) return;
    
    // 切换收藏状态
    const isFavorited = util.toggleFavorite(this.data.repoInfo);
    this.setData({ isFavorited });
    
    // 提示用户
    wx.showToast({
      title: isFavorited ? '已收藏' : '已取消收藏',
      icon: 'success',
      duration: 1500
    });
  },
  
  // 打开GitHub页面
  openGitHub: function() {
    const { repoInfo } = this.data;
    if (!repoInfo || !repoInfo.html_url) return;
    
    // 复制链接到剪贴板
    wx.setClipboardData({
      data: repoInfo.html_url,
      success: () => {
        wx.showToast({
          title: '链接已复制',
          icon: 'success'
        });
      }
    });
  },
  
  // 分享功能
  onShareAppMessage: function() {
    const { owner, repo, repoInfo } = this.data;
    
    return {
      title: repoInfo ? `GitHub热点: ${repoInfo.full_name}` : 'GitHub热点小程序',
      path: `/pages/trending/trending?owner=${owner}&repo=${repo}`
    };
  }
}); 