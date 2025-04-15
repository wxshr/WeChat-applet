/**
 * 文化遗产页面
 * 展示各类文化遗产信息，支持分类筛选和瀑布流布局
 */
Page({
  /**
   * 页面的初始数据
   * @property {Number} currentCategory - 当前选中的分类ID
   * @property {Array} categories - 分类数据数组
   * @property {Array} leftList - 瀑布流左侧数据
   * @property {Array} rightList - 瀑布流右侧数据
   * @property {String} searchKeyword - 搜索关键词
   * @property {Boolean} isSearchMode - 是否为搜索模式
   */
  data: {
    currentCategory: 2,
    categories: [
      { id: 2, name: '非物质文化遗产' },
      { id: 3, name: '传统技艺' },
      { id: 4, name: '民俗文化' },
      { id: 5, name: '历史建筑' },
      { id: 6, name: '中医文化' }
    ],
    leftList: [],
    rightList: [],
    searchKeyword: '',
    isSearchMode: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: '文化遗产'
    });
    
    // 如果有搜索关键词，进入搜索模式
    if (options.keyword) {
      this.setData({
        searchKeyword: options.keyword,
        isSearchMode: true
      });
      this.searchHeritage(options.keyword);
    } else {
      this.loadHeritageData();
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 检查全局数据中是否有搜索关键词
    const app = getApp();
    if (app.globalData && app.globalData.searchKeyword) {
      const keyword = app.globalData.searchKeyword;
      this.setData({
        searchKeyword: keyword,
        isSearchMode: true
      });
      this.searchHeritage(keyword);
      
      // 清除全局数据中的搜索关键词，避免重复搜索
      app.globalData.searchKeyword = '';
    }
  },

  /**
   * 切换分类
   * @param {Object} e - 事件对象
   */
  switchCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({
      currentCategory: categoryId,
      isSearchMode: false,
      searchKeyword: ''
    });
    this.loadHeritageData();
  },

  /**
   * 加载文化遗产数据
   */
  loadHeritageData() {
    // 模拟加载数据
    const mockData = [
      {
        id: 1,
        title: '京剧',
        description: '中国国粹，集唱念做打于一体的戏曲艺术。京剧被誉为国粹，是中国影响最大的戏曲剧种之一。',
        imageUrl: '/images/heritage/jingju.jpg',
        category: 2,
        likes: 128,
        comments: 32
      },
      {
        id: 2,
        title: '景德镇陶瓷',
        description: '千年瓷都，传统制瓷工艺的代表。景德镇陶瓷以釉白如玉、声如磬、薄如纸、明如镜著称。',
        imageUrl: '/images/heritage/ceramics.jpg',
        category: 3,
        likes: 256,
        comments: 48
      },
      {
        id: 3,
        title: '春节',
        description: '中国最重要的传统节日，承载着丰富的文化内涵。春节是农历正月初一，延续了数千年。',
        imageUrl: '/images/heritage/spring-festival.jpg',
        category: 4,
        likes: 512,
        comments: 96
      },
      {
        id: 4,
        title: '故宫',
        description: '世界上规模最大的宫殿建筑群，明清两代的皇家宫殿。故宫保存了大量珍贵文物。',
        imageUrl: '/images/heritage/forbidden-city.jpg',
        category: 5,
        likes: 1024,
        comments: 128
      },
      // 添加更多数据确保每个分类都有足够展示
      {
        id: 5,
        title: '昆曲',
        description: '被誉为"百戏之祖"，距今已有六百多年历史。昆曲以曲词婉约、行腔细腻、表演程式化为特色。',
        imageUrl: '/images/heritage/kunqu.jpg',
        category: 2,
        likes: 315,
        comments: 67
      },
      {
        id: 6,
        title: '苏州刺绣',
        description: '历史悠久，工艺精湛的传统手工艺。苏绣以绣工精细、图案秀丽、色彩和谐见长。',
        imageUrl: '/images/heritage/embroidery.jpg',
        category: 3,
        likes: 289,
        comments: 56
      },
      {
        id: 7,
        title: '中医',
        description: '中国传统医学，有着数千年的历史，以整体观念和辨证论治为基本特点，通过望、闻、问、切诊断疾病。',
        imageUrl: '/images/heritage/medicine.jpg',
        category: 6,
        likes: 867,
        comments: 93
      },
      {
        id: 8,
        title: '针灸',
        description: '中医重要治疗手段，通过刺激人体特定穴位来调节机体功能，已有数千年历史，2010年被列入非遗名录。',
        imageUrl: '/images/heritage/acupuncture.jpg',
        category: 6,
        likes: 756,
        comments: 82
      },
      {
        id: 9,
        title: '中药炮制',
        description: '中药材加工炮制技术，是中医药文化的重要组成部分，对保证中药安全有效至关重要。',
        imageUrl: '/images/heritage/herbs.jpg',
        category: 6,
        likes: 634,
        comments: 58
      }
    ];

    // 根据分类筛选数据
    const filteredData = mockData.filter(item => item.category === this.data.currentCategory);
    
    // 均匀分配到左右两列，确保高度大致平衡
    const leftList = [];
    const rightList = [];
    
    filteredData.forEach((item, index) => {
      if (index % 2 === 0) {
        leftList.push(item);
      } else {
        rightList.push(item);
      }
    });

    this.setData({
      leftList,
      rightList
    });
  },

  /**
   * 搜索文化遗产
   * @param {String} keyword - 搜索关键词
   */
  searchHeritage(keyword) {
    // 模拟搜索数据
    const mockData = [
      {
        id: 1,
        title: '京剧',
        description: '中国国粹，集唱念做打于一体的戏曲艺术。京剧被誉为国粹，是中国影响最大的戏曲剧种之一。',
        imageUrl: '/images/heritage/jingju.jpg',
        category: 2,
        likes: 128,
        comments: 32
      },
      {
        id: 2,
        title: '景德镇陶瓷',
        description: '千年瓷都，传统制瓷工艺的代表。景德镇陶瓷以釉白如玉、声如磬、薄如纸、明如镜著称。',
        imageUrl: '/images/heritage/ceramics.jpg',
        category: 3,
        likes: 256,
        comments: 48
      },
      {
        id: 3,
        title: '春节',
        description: '中国最重要的传统节日，承载着丰富的文化内涵。春节是农历正月初一，延续了数千年。',
        imageUrl: '/images/heritage/spring-festival.jpg',
        category: 4,
        likes: 512,
        comments: 96
      },
      {
        id: 4,
        title: '故宫',
        description: '世界上规模最大的宫殿建筑群，明清两代的皇家宫殿。故宫保存了大量珍贵文物。',
        imageUrl: '/images/heritage/forbidden-city.jpg',
        category: 5,
        likes: 1024,
        comments: 128
      },
      {
        id: 5,
        title: '昆曲',
        description: '被誉为"百戏之祖"，距今已有六百多年历史。昆曲以曲词婉约、行腔细腻、表演程式化为特色。',
        imageUrl: '/images/heritage/kunqu.jpg',
        category: 2,
        likes: 315,
        comments: 67
      },
      {
        id: 6,
        title: '苏州刺绣',
        description: '历史悠久，工艺精湛的传统手工艺。苏绣以绣工精细、图案秀丽、色彩和谐见长。',
        imageUrl: '/images/heritage/embroidery.jpg',
        category: 3,
        likes: 289,
        comments: 56
      },
      {
        id: 7,
        title: '中医',
        description: '中国传统医学，有着数千年的历史，以整体观念和辨证论治为基本特点，通过望、闻、问、切诊断疾病。',
        imageUrl: '/images/heritage/medicine.jpg',
        category: 6,
        likes: 867,
        comments: 93
      },
      {
        id: 8,
        title: '针灸',
        description: '中医重要治疗手段，通过刺激人体特定穴位来调节机体功能，已有数千年历史，2010年被列入非遗名录。',
        imageUrl: '/images/heritage/acupuncture.jpg',
        category: 6,
        likes: 756,
        comments: 82
      },
      {
        id: 9,
        title: '中药炮制',
        description: '中药材加工炮制技术，是中医药文化的重要组成部分，对保证中药安全有效至关重要。',
        imageUrl: '/images/heritage/herbs.jpg',
        category: 6,
        likes: 634,
        comments: 58
      }
    ];

    // 根据关键词筛选数据
    const filteredData = mockData.filter(item => 
      item.title.includes(keyword) || 
      item.description.includes(keyword)
    );
    
    // 分配到左右两列
    const leftList = [];
    const rightList = [];
    
    filteredData.forEach((item, index) => {
      if (index % 2 === 0) {
        leftList.push(item);
      } else {
        rightList.push(item);
      }
    });

    this.setData({
      leftList,
      rightList
    });
  },

  /**
   * 显示文化遗产详情
   * @param {Object} e - 事件对象
   */
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/heritage-detail/heritage-detail?id=${id}`
    });
  },

  /**
   * 处理点赞
   * @param {Object} e - 事件对象
   */
  handleLike(e) {
    const id = e.currentTarget.dataset.id;
    const { leftList, rightList } = this.data;
    
    // 更新左侧列表
    const leftIndex = leftList.findIndex(item => item.id === id);
    if (leftIndex !== -1) {
      const item = leftList[leftIndex];
      item.isLiked = !item.isLiked;
      item.likes = item.isLiked ? item.likes + 1 : item.likes - 1;
      this.setData({ leftList });
    }
    
    // 更新右侧列表
    const rightIndex = rightList.findIndex(item => item.id === id);
    if (rightIndex !== -1) {
      const item = rightList[rightIndex];
      item.isLiked = !item.isLiked;
      item.likes = item.isLiked ? item.likes + 1 : item.likes - 1;
      this.setData({ rightList });
    }
  },

  /**
   * 处理评论
   * @param {Object} e - 事件对象
   */
  handleComment(e) {
    const id = e.currentTarget.dataset.id;
    const { leftList, rightList } = this.data;
    
    // 更新左侧列表
    const leftIndex = leftList.findIndex(item => item.id === id);
    if (leftIndex !== -1) {
      const item = leftList[leftIndex];
      item.comments = (item.comments || 0) + 1;
      this.setData({ leftList });
    }
    
    // 更新右侧列表
    const rightIndex = rightList.findIndex(item => item.id === id);
    if (rightIndex !== -1) {
      const item = rightList[rightIndex];
      item.comments = (item.comments || 0) + 1;
      this.setData({ rightList });
    }

    wx.navigateTo({
      url: `/pages/heritage-detail/heritage-detail?id=${id}&tab=comment`
    });
  }
}); 