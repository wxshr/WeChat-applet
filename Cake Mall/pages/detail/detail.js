Page({
  data: {
    cake: {
      id: 1,
      name: '巧克力慕斯蛋糕',
      price: 188,
      description: '采用比利时进口巧克力制作，口感细腻，香浓醇厚。',
      images: [
        '/assets/images/cake1-1.jpg',
        '/assets/images/cake1-2.jpg',
        '/assets/images/cake1-3.jpg'
      ],
      size: '6寸',
      flavor: '巧克力味',
      shelf_life: '冷藏7天'
    },
    quantity: 1
  },

  onLoad(options) {
    const cakeId = options.id
    // 根据ID获取蛋糕详情
    // this.getCakeDetail(cakeId)
  },

  onMinusTap() {
    if (this.data.quantity > 1) {
      this.setData({
        quantity: this.data.quantity - 1
      })
    }
  },

  onPlusTap() {
    this.setData({
      quantity: this.data.quantity + 1
    })
  },

  onAddToCartTap() {
    const app = getApp()
    const { cake, quantity } = this.data
    
    const cartItem = {
      id: cake.id,
      name: cake.name,
      price: cake.price,
      image: cake.images[0],
      quantity: quantity
    }

    const cartItems = app.globalData.cartItems
    const existingItemIndex = cartItems.findIndex(item => item.id === cake.id)

    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += quantity
    } else {
      cartItems.push(cartItem)
    }

    app.globalData.cartItems = cartItems
    wx.setStorageSync('cartItems', cartItems)
    
    // 更新购物车角标
    app.updateCartBadge()

    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    })
  },

  onBuyNowTap() {
    // 实现立即购买逻辑
    wx.showToast({
      title: '购买功能开发中',
      icon: 'none'
    })
  }
}) 