Page({
  data: {
    cartItems: [],
    totalPrice: 0
  },

  onShow() {
    const app = getApp()
    const cartItems = app.globalData.cartItems
    this.setData({ cartItems })
    this.calculateTotal()
  },

  calculateTotal() {
    const totalPrice = this.data.cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity)
    }, 0)
    this.setData({ totalPrice })
  },

  onMinusTap(e) {
    const { index } = e.currentTarget.dataset
    const cartItems = this.data.cartItems
    
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1
      this.setData({ cartItems })
      this.updateStorage()
      this.calculateTotal()
    }
  },

  onPlusTap(e) {
    const { index } = e.currentTarget.dataset
    const cartItems = this.data.cartItems
    cartItems[index].quantity += 1
    this.setData({ cartItems })
    this.updateStorage()
    this.calculateTotal()
  },

  onDeleteTap(e) {
    const { index } = e.currentTarget.dataset
    const cartItems = this.data.cartItems
    cartItems.splice(index, 1)
    this.setData({ cartItems })
    this.updateStorage()
    this.calculateTotal()
  },

  updateStorage() {
    const app = getApp()
    app.globalData.cartItems = this.data.cartItems
    wx.setStorageSync('cartItems', this.data.cartItems)
    
    // 更新购物车角标
    app.updateCartBadge()
  },

  onCheckoutTap() {
    if (this.data.cartItems.length === 0) {
      return wx.showToast({
        title: '购物车为空',
        icon: 'none'
      })
    }
    
    wx.showToast({
      title: '结算功能开发中',
      icon: 'none'
    })
  }
}) 