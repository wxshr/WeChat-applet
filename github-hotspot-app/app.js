// app.js
App({
  onLaunch: function() {
    // 初始化收藏数据
    try {
      const favorites = wx.getStorageSync('favorites');
      if (!favorites) {
        wx.setStorageSync('favorites', []);
      }
    } catch (e) {
      console.error('初始化收藏数据失败:', e);
    }
  },
  
  globalData: {
    apiBaseUrl: 'https://api.github.com',
    userInfo: null
  }
}) 