// app.js
App({
  onLaunch: function() {
    // 初始化收藏数据
    try {
      const favorites = wx.getStorageSync('favorites');
      if (!favorites) {
        wx.setStorageSync('favorites', []);
      }
      
      // 初始化GitHub Token
      const token = wx.getStorageSync('githubToken');
      if (token) {
        this.globalData.githubToken = token;
      }
    } catch (e) {
      console.error('初始化数据失败:', e);
    }
    
    console.log('当前环境: 本地开发模式');
  },
  
  globalData: {
    apiBaseUrl: 'https://api.github.com',
    userInfo: null,
    githubToken: '',
    isLocalMode: true // 本地开发模式标志，避免直接调用GitHub API
  },

  setGithubToken: function(token) {
    this.globalData.githubToken = token;
    wx.setStorageSync('githubToken', token);
  }
})