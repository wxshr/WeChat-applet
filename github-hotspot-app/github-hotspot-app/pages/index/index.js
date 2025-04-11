const { getTrendingRepos } = require('../../utils/api.js');

Page({
  data: {
    inputToken: '',
    weekly: [],
    isLoading: false,
    hasMore: true,
    hasError: false,
    errorMsg: '',
    languages: [
      { name: '全部', value: '' },
      { name: 'JavaScript', value: 'javascript' },
      { name: 'Python', value: 'python' },
      { name: 'Java', value: 'java' },
      { name: 'Go', value: 'go' },
      { name: 'C++', value: 'c++' }
    ],
    currentLanguage: ''
  },

  onLoad: function() {
    this.getTrendingRepos();
  },

  getTrendingRepos: function() {
    const that = this;
    this.setData({ 
      isLoading: true,
      hasError: false,
      errorMsg: ''
    });
    
    wx.showLoading({
      title: '加载中...'
    });
    
    getTrendingRepos(this.data.currentLanguage, 'weekly', 1)
      .then(res => {
        console.log('获取到仓库数据:', res ? res.length : 0);
        that.setData({
          weekly: res || [],
          isLoading: false
        });
        wx.hideLoading();
      })
      .catch(err => {
        console.error('获取趋势仓库失败:', err);
        this.setData({ 
          isLoading: false,
          weekly: [],
          hasError: true,
          errorMsg: err.message || '加载数据失败'
        });
        wx.hideLoading();
        wx.showToast({
          title: '加载失败: ' + (err.message || '未知错误'),
          icon: 'none',
          duration: 2000
        });
      });
  },

  onLanguageChange: function(e) {
    const language = e.currentTarget.dataset.language;
    this.setData({
      currentLanguage: language
    });
    this.getTrendingRepos();
  },

  onFavoriteChange: function(e) {
    // 更新列表中的收藏状态
    const { id, isFavorited } = e.detail;
    if (id) {
      const weekly = this.data.weekly.map(item => {
        if (item && item.id === id) {
          return {...item, isFavorited};
        }
        return item;
      });
      this.setData({ weekly });
    }
  },

  onInputToken: function(e) {
    this.setData({
      inputToken: e.detail.value
    });
  },

  onSaveToken: function() {
    if (!this.data.inputToken) {
      wx.showToast({
        title: 'Token不能为空',
        icon: 'none'
      });
      return;
    }
    
    const app = getApp();
    try {
      app.setGithubToken(this.data.inputToken);
      wx.showToast({
        title: 'Token保存成功',
        icon: 'success'
      });
      // 保存成功后重新加载数据
      setTimeout(() => {
        this.getTrendingRepos();
      }, 1000);
    } catch (error) {
      console.error('保存Token失败:', error);
      wx.showToast({
        title: '保存失败',
        icon: 'none'
      });
    }
  },

  onPullDownRefresh: function() {
    this.getTrendingRepos();
    wx.stopPullDownRefresh();
  },
  
  // 点击重试
  onRetry: function() {
    this.getTrendingRepos();
  }
});