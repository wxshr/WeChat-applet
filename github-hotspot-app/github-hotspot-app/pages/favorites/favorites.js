const util = require('../../utils/util');

Page({
  data: {
    favorites: [],
    isEmpty: true
  },
  
  onLoad: function() {
    this.loadFavorites();
  },
  
  onShow: function() {
    // 每次页面显示时重新加载收藏，以保证数据最新
    this.loadFavorites();
  },
  
  onPullDownRefresh: function() {
    this.loadFavorites();
    wx.stopPullDownRefresh();
  },
  
  // 加载收藏列表
  loadFavorites: function() {
    const favorites = util.getFavorites();
    this.setData({
      favorites: favorites,
      isEmpty: favorites.length === 0
    });
  },
  
  // 收藏状态变化处理
  onFavoriteChange: function(e) {
    const { id, isFavorited } = e.detail;
    
    // 从收藏列表中移除
    if (!isFavorited) {
      const favorites = this.data.favorites.filter(item => item.id !== id);
      this.setData({
        favorites: favorites,
        isEmpty: favorites.length === 0
      });
    }
  },
  
  // 清空所有收藏
  clearAllFavorites: function() {
    wx.showModal({
      title: '确认操作',
      content: '确定要清空所有收藏吗？',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('favorites', []);
          this.setData({
            favorites: [],
            isEmpty: true
          });
          wx.showToast({
            title: '已清空收藏',
            icon: 'success'
          });
        }
      }
    });
  },
  
  // 分享功能
  onShareAppMessage: function() {
    return {
      title: 'GitHub热点 - 我的收藏',
      path: '/pages/favorites/favorites'
    };
  }
}); 