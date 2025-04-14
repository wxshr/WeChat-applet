Page({
  data: {
    cake: {},
    quantity: 1,
    cakeData: [
      {
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
      {
        id: 2,
        name: '草莓奶油蛋糕',
        price: 168,
        description: '新鲜草莓搭配轻盈奶油，酸甜可口，夏日首选。',
        images: [
          '/assets/images/cake2-1.jpg',
          '/assets/images/cake2-2.jpg',
          '/assets/images/cake2-3.jpg'
        ],
        size: '8寸',
        flavor: '草莓味',
        shelf_life: '冷藏5天'
      },
      {
        id: 3,
        name: '抹茶红豆蛋糕',
        price: 198,
        description: '日式风味，抹茶清香与红豆的甜蜜完美结合。',
        images: [
          '/assets/images/cake3-1.jpg',
          '/assets/images/cake3-2.jpg',
          '/assets/images/cake3-3.jpg'
        ],
        size: '6寸',
        flavor: '抹茶味',
        shelf_life: '冷藏6天'
      },
      {
        id: 4,
        name: '黑森林蛋糕',
        price: 208,
        description: '德国经典蛋糕，樱桃与巧克力的绝妙组合。',
        images: [
          '/assets/images/cake4-1.jpg',
          '/assets/images/cake4-2.jpg',
          '/assets/images/cake4-3.jpg'
        ],
        size: '8寸',
        flavor: '巧克力樱桃味',
        shelf_life: '冷藏7天'
      },
      {
        id: 5,
        name: '浪漫玫瑰婚礼蛋糕',
        price: 998,
        description: '多层设计，可食用玫瑰装饰，为婚礼增添浪漫气氛。',
        images: [
          '/assets/images/cake5-1.jpg',
          '/assets/images/cake5-2.jpg',
          '/assets/images/cake5-3.jpg'
        ],
        size: '三层 (6寸+8寸+10寸)',
        flavor: '奶油玫瑰味',
        shelf_life: '冷藏3天'
      },
      {
        id: 6,
        name: '多层婚礼蛋糕',
        price: 1288,
        description: '高贵典雅的设计，甜蜜的象征，婚礼必备。',
        images: [
          '/assets/images/cake6-1.jpg',
          '/assets/images/cake6-2.jpg',
          '/assets/images/cake6-3.jpg'
        ],
        size: '四层 (6寸+8寸+10寸+12寸)',
        flavor: '香草味',
        shelf_life: '冷藏3天'
      },
      {
        id: 7,
        name: '马卡龙礼盒',
        price: 98,
        description: '12枚混合口味的法式马卡龙，精美礼盒包装。',
        images: [
          '/assets/images/cake7-1.jpg',
          '/assets/images/cake7-2.jpg',
          '/assets/images/cake7-3.jpg'
        ],
        size: '12枚/盒',
        flavor: '混合口味',
        shelf_life: '冷藏4天'
      },
      {
        id: 8,
        name: '曲奇饼干礼盒',
        price: 88,
        description: '香酥可口的手工曲奇，多种口味，送礼自用两相宜。',
        images: [
          '/assets/images/cake8-1.jpg',
          '/assets/images/cake8-2.jpg',
          '/assets/images/cake8-3.jpg'
        ],
        size: '20枚/盒',
        flavor: '原味/巧克力/抹茶',
        shelf_life: '常温保存15天'
      },
      {
        id: 9,
        name: '蛋糕礼品卡',
        price: 100,
        description: '送给亲友的甜蜜礼物，可兑换店内任意等值蛋糕。',
        images: [
          '/assets/images/cake9-1.jpg',
          '/assets/images/cake9-2.jpg',
          '/assets/images/cake9-3.jpg'
        ],
        size: '100元面值',
        flavor: '不适用',
        shelf_life: '有效期1年'
      }
    ]
  },

  onLoad(options) {
    const cakeId = parseInt(options.id)
    // 根据ID获取蛋糕详情
    this.getCakeDetail(cakeId)
  },
  
  getCakeDetail(id) {
    // 在数据中查找对应ID的蛋糕
    const cake = this.data.cakeData.find(item => item.id === id)
    
    if (cake) {
      this.setData({ cake })
      // 设置导航栏标题
      wx.setNavigationBarTitle({
        title: cake.name
      })
    } else {
      wx.showToast({
        title: '商品不存在',
        icon: 'error'
      })
      // 延迟返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
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