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
    allCakes: [
      {
        id: 1,
        name: '巧克力慕斯蛋糕',
        price: 188,
        image: '/assets/images/cake1.jpg',
        categoryId: 1
      },
      {
        id: 2,
        name: '草莓奶油蛋糕',
        price: 168,
        image: '/assets/images/cake2.jpg',
        categoryId: 1
      },
      {
        id: 3,
        name: '抹茶红豆蛋糕',
        price: 198,
        image: '/assets/images/cake3.jpg',
        categoryId: 1
      },
      {
        id: 4,
        name: '黑森林蛋糕',
        price: 208,
        image: '/assets/images/cake4.jpg',
        categoryId: 1
      },
      {
        id: 5,
        name: '浪漫玫瑰婚礼蛋糕',
        price: 998,
        image: '/assets/images/cake5.jpg',
        categoryId: 2
      },
      {
        id: 6,
        name: '多层婚礼蛋糕',
        price: 1288,
        image: '/assets/images/cake6.jpg',
        categoryId: 2
      },
      {
        id: 7,
        name: '马卡龙礼盒',
        price: 98,
        image: '/assets/images/cake7.jpg',
        categoryId: 3
      },
      {
        id: 8,
        name: '曲奇饼干礼盒',
        price: 88,
        image: '/assets/images/cake8.jpg',
        categoryId: 3
      },
      {
        id: 9,
        name: '蛋糕礼品卡',
        price: 100,
        image: '/assets/images/cake9.jpg',
        categoryId: 4
      }
    ],
    cakes: [], // 当前显示的蛋糕列表
    currentCategory: 0,  // 0表示全部
    showCategoryText: '全部' // 显示的分类名称
  },

  onLoad() {
    // 初始加载所有蛋糕
    this.setData({
      cakes: this.data.allCakes
    })
  },

  onCategoryTap(e) {
    const categoryId = e.currentTarget.dataset.id
    let filteredCakes = []
    let categoryName = '全部'
    
    // 查找分类名称
    const categoryObj = this.data.categories.find(item => item.id === categoryId)
    if (categoryObj) {
      categoryName = categoryObj.name
    }
    
    if (categoryId === 0) {
      // 显示全部蛋糕
      filteredCakes = this.data.allCakes
    } else {
      // 根据分类ID筛选蛋糕
      filteredCakes = this.data.allCakes.filter(cake => cake.categoryId === categoryId)
    }
    
    this.setData({
      cakes: filteredCakes,
      currentCategory: categoryId,
      showCategoryText: categoryName
    })
    
    wx.showToast({
      title: `已切换到${categoryName}`,
      icon: 'none'
    })
  },

  onCakeTap(e) {
    const cakeId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${cakeId}`
    })
  }
}) 