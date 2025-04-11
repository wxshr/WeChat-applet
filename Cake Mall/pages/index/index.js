Page({
  data: {
    banners: [
      { id: 1, image: '/assets/images/banner1.jpg' },
      { id: 2, image: '/assets/images/banner2.jpg' },
      { id: 3, image: '/assets/images/banner3.jpg' }
    ],
    categories: [
      { id: 1, name: '生日蛋糕', icon: '/assets/icons/birthday.png' },
      { id: 2, name: '婚礼蛋糕', icon: '/assets/icons/wedding.png' },
      { id: 3, name: '甜点', icon: '/assets/icons/dessert.png' },
      { id: 4, name: '礼品', icon: '/assets/icons/gift.png' }
    ],
    cakes: [
      {
        id: 1,
        name: '巧克力慕斯蛋糕',
        price: 188,
        image: '/assets/images/cake1.jpg'
      },
      {
        id: 2,
        name: '草莓奶油蛋糕',
        price: 168,
        image: '/assets/images/cake2.jpg'
      }
      // 更多蛋糕数据...
    ]
  },

  onLoad() {
    // 可以在这里从服务器获取数据
  },

  onCategoryTap(e) {
    const categoryId = e.currentTarget.dataset.id
    // 根据分类ID筛选蛋糕列表
    console.log('选择分类:', categoryId)
  },

  onCakeTap(e) {
    const cakeId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${cakeId}`
    })
  }
}) 