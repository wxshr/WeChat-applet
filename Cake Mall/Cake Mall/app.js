App({
  globalData: {
    userInfo: null,
    cartItems: []
  },
  onLaunch() {
    // 获取本地存储的购物车数据
    const cartItems = wx.getStorageSync('cartItems') || []
    this.globalData.cartItems = cartItems
    
    // 更新购物车角标
    this.updateCartBadge()
  },
  
  // 更新购物车角标
  updateCartBadge() {
    const cartItemCount = this.globalData.cartItems.reduce((total, item) => {
      return total + item.quantity
    }, 0)
    
    if (cartItemCount > 0) {
      wx.setTabBarBadge({
        index: 1, // 购物车是第二个标签，索引为1
        text: cartItemCount.toString()
      })
    } else {
      // 如果购物车为空，移除角标
      wx.removeTabBarBadge({
        index: 1
      }).catch(() => {
        // 忽略可能的错误（例如角标不存在）
      })
    }
  }
}) 