// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  /**
   * 页面的初始数据
   * @property {Object} userInfo - 用户信息对象
   * @property {Array} swiperList - 轮播图数据数组
   * @property {Boolean} showSpecial - 控制特别推荐区域显示
   * @property {String} searchKeyword - 搜索关键词
   */
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    // 轮播图数据
    swiperList: [
      {
        id: 1,
        imageUrl: '/images/heritage1.jpg',
        description: '探索中国传统文化的精髓'
      },
      {
        id: 2,
        imageUrl: '/images/heritage2.jpg',
        description: '感受非物质文化遗产的魅力'
      },
      {
        id: 3,
        imageUrl: '/images/heritage3.jpg',
        description: '传承千年文明，守护文化瑰宝'
      }
    ],
    showSpecial: true,
    searchKeyword: '',
    currentTab: 'index',
    heritageList: [
      {
        id: 1,
        title: '故宫',
        description: '中国明清两代的皇家宫殿，世界上现存规模最大、保存最完整的木质结构古建筑群',
        imageUrl: '/images/heritage5.jpg'
      },
      {
        id: 2,
        title: '长城',
        description: '中国古代伟大的防御工程，是中华民族的精神象征',
        imageUrl: '/images/heritage6.jpg'
      },
      {
        id: 3,
        title: '兵马俑',
        description: '秦始皇陵的陪葬坑，被誉为"世界第八大奇迹"',
        imageUrl: '/images/heritage7.jpg'
      },
      {
        id: 4,
        title: '大运河',
        description: '世界上最长的人工运河，见证了中国古代水运文明的辉煌',
        imageUrl: '/images/heritage8.jpg'
      }
    ],
    // 文化遗产轮播数据
    heritageSwiperList: [
      {
        id: 1,
        title: '京剧',
        description: '中国国粹，传统戏曲艺术的代表',
        imageUrl: '/images/heritage/jingju.jpg'
      },
      {
        id: 2,
        title: '景德镇陶瓷',
        description: '千年制瓷工艺，享誉世界的中国瓷器',
        imageUrl: '/images/heritage/ceramics.jpg'
      },
      {
        id: 3,
        title: '中医',
        description: '中国传统医学，独特的诊疗体系',
        imageUrl: '/images/heritage/medicine.jpg'
      }
    ],
    // 热门物质文化遗产
    popularMaterial: {
      id: 4,
      title: '故宫',
      description: '中国明清两代的皇家宫殿，世界上现存规模最大、保存最完整的木质结构古建筑群',
      imageUrl: '/images/heritage/forbidden-city.jpg',
      likes: 1280
    },
    // 热门非物质文化遗产
    popularIntangible: {
      id: 1,
      title: '京剧',
      description: '中国国粹，融合唱念做打，展现独特魅力的传统戏曲艺术',
      imageUrl: '/images/heritage/jingju.jpg',
      likes: 960
    }
  },

  /**
   * 点击用户头像或昵称
   */
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  /**
   * 选择头像回调
   * @param {Object} e - 事件对象
   */
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },

  /**
   * 输入昵称回调
   * @param {Object} e - 事件对象
   */
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },

  /**
   * 获取用户信息
   * @param {Object} e - 事件对象
   */
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 页面加载时获取热门文化遗产数据
    this.getPopularHeritage();
  },

  /**
   * 获取热门文化遗产数据
   */
  getPopularHeritage() {
    // 这里应该调用后端API获取点赞数最多的文化遗产
    // 目前使用模拟数据
  },

  /**
   * 搜索输入处理
   * @param {Object} e - 事件对象
   */
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  /**
   * 搜索提交处理
   * @param {Object} e - 事件对象
   */
  onSearchSubmit(e) {
    const keyword = e.detail.value || this.data.searchKeyword;
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
      return;
    }
    
    // 搜索匹配的文化遗产
    const mockData = [
      {
        id: 1,
        title: '京剧',
        keywords: ['京剧', '戏曲', '国粹']
      },
      {
        id: 2,
        title: '景德镇陶瓷',
        keywords: ['陶瓷', '景德镇', '瓷器']
      },
      {
        id: 3,
        title: '中医',
        keywords: ['中医', '传统医学', '针灸', '中药']
      },
      {
        id: 4,
        title: '故宫',
        keywords: ['故宫', '紫禁城', '宫殿']
      },
      {
        id: 5,
        title: '昆曲',
        keywords: ['昆曲', '戏曲', '百戏之祖']
      }
    ];
    
    // 查找匹配的文化遗产
    let matchedHeritage = null;
    for (const item of mockData) {
      if (item.title.includes(keyword) || item.keywords.some(k => k.includes(keyword))) {
        matchedHeritage = item;
        break;
      }
    }
    
    if (matchedHeritage) {
      // 如果找到匹配的文化遗产，直接跳转到详情页
      wx.navigateTo({
        url: `/pages/heritage-detail/heritage-detail?id=${matchedHeritage.id}`
      });
    } else {
      // 如果没有找到匹配的文化遗产，跳转到文化遗产列表页进行搜索
      wx.switchTab({
        url: `/pages/heritage/heritage`
      });
      
      // 将关键词保存到全局数据，以便heritage页面获取
      getApp().globalData = getApp().globalData || {};
      getApp().globalData.searchKeyword = keyword;
    }
  },

  /**
   * 切换布局显示
   */
  toggleLayout() {
    this.setData({
      showSpecial: !this.data.showSpecial
    });
  },

  // 切换底部导航
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab
    });
    
    // 页面跳转
    if (tab !== 'index') {
      wx.navigateTo({
        url: `/pages/${tab}/${tab}`
      });
    }
  },

  showHeritageDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/heritage-detail/heritage-detail?id=${id}`
    });
  }
})
