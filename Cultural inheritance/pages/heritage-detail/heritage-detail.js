Page({
  data: {
    heritage: null,
    isLiked: false,
    isCommented: false
  },

  onLoad: function(options) {
    // 获取传递的文化遗产ID
    const heritageId = parseInt(options.id);
    
    // 模拟数据库 - 不同文化遗产的详细信息
    const heritageDatabase = [
      {
        id: 1,
        title: '京剧',
        image: '/images/heritage/jingju.jpg',
        category: '非物质文化遗产',
        likes: 1234,
        comments: 56,
        description: '京剧是中国国粹，形成于清朝乾隆、嘉庆年间，融合了昆曲、秦腔、汉调等多种地方戏曲艺术。京剧以其独特的脸谱、唱腔、表演程式等艺术特色闻名于世。',
        images: [
          '/images/heritage/jingju1.jpg',
          '/images/heritage/jingju2.jpg',
          '/images/heritage/jingju3.jpg'
        ],
        commentList: [
          {
            id: 1,
            avatar: '/images/avatar/user1.jpg',
            username: '文化爱好者',
            content: '京剧真是太美了，每次看都让人陶醉！',
            time: '2024-03-20 14:30'
          },
          {
            id: 2,
            avatar: '/images/avatar/user2.jpg',
            username: '传统艺术迷',
            content: '希望能有更多年轻人了解和学习京剧艺术。',
            time: '2024-03-20 15:45'
          }
        ]
      },
      {
        id: 2,
        title: '景德镇陶瓷',
        image: '/images/heritage/ceramics.jpg',
        category: '传统技艺',
        likes: 978,
        comments: 42,
        description: '景德镇陶瓷是中国著名的传统工艺美术，以"白如玉、明如镜、薄如纸、声如磬"的特点闻名于世。景德镇以产瓷而闻名，被誉为"瓷都"，有着一千多年的制瓷历史。',
        images: [
          '/images/heritage/ceramics1.jpg',
          '/images/heritage/ceramics2.jpg'
        ],
        commentList: [
          {
            id: 1,
            avatar: '/images/avatar/user3.jpg',
            username: '陶艺爱好者',
            content: '景德镇的青花瓷工艺精湛，令人叹为观止！',
            time: '2024-03-18 10:25'
          }
        ]
      },
      {
        id: 3,
        title: '中医',
        image: '/images/heritage/medicine.jpg',
        category: '非物质文化遗产',
        likes: 1842,
        comments: 93,
        description: '中医是中国传统医学，有着数千年的历史，是中华民族的宝贵文化遗产。中医以整体观念和辨证论治为基本特点，通过望、闻、问、切四诊合参的方法来诊断疾病，并采用针灸、中药、推拿、气功等治疗手段。',
        images: [
          '/images/heritage/medicine1.jpg',
          '/images/heritage/medicine2.jpg',
          '/images/heritage/medicine3.jpg'
        ],
        commentList: [
          {
            id: 1,
            avatar: '/images/avatar/user9.jpg',
            username: '中医爱好者',
            content: '中医的整体观念和辨证论治理念非常值得现代医学借鉴！',
            time: '2024-03-15 16:30'
          },
          {
            id: 2,
            avatar: '/images/avatar/user10.jpg',
            username: '医学研究者',
            content: '中医药在许多慢性病的治疗上有独特优势，应该得到更多的推广和研究。',
            time: '2024-03-16 09:20'
          },
          {
            id: 3,
            avatar: '/images/avatar/user11.jpg',
            username: '传统文化保护者',
            content: '中医是中华文明的重要组成部分，凝聚着古人的智慧，我们应该好好传承。',
            time: '2024-03-17 11:45'
          }
        ]
      },
      {
        id: 4,
        title: '春节',
        image: '/images/heritage/spring-festival.jpg',
        category: '民俗文化',
        likes: 1567,
        comments: 83,
        description: '春节是中国最重要的传统节日，俗称"年节"，标志着农历新年的开始。春节期间有许多习俗，如贴春联、放鞭炮、守岁、拜年、舞龙舞狮等，体现了中华民族深厚的文化底蕴。',
        images: [
          '/images/heritage/spring-festival1.jpg',
          '/images/heritage/spring-festival2.jpg',
          '/images/heritage/spring-festival3.jpg',
          '/images/heritage/spring-festival4.jpg'
        ],
        commentList: [
          {
            id: 1,
            avatar: '/images/avatar/user4.jpg',
            username: '传统节日爱好者',
            content: '春节是我最喜欢的节日，全家团圆的氛围特别温馨！',
            time: '2024-02-10 20:15'
          },
          {
            id: 2,
            avatar: '/images/avatar/user5.jpg',
            username: '文化研究者',
            content: '春节习俗背后蕴含着丰富的文化内涵和历史渊源。',
            time: '2024-02-11 09:30'
          }
        ]
      },
      {
        id: 5,
        title: '故宫',
        image: '/images/heritage/forbidden-city.jpg',
        category: '历史建筑',
        likes: 2341,
        comments: 112,
        description: '故宫是中国明清两代的皇家宫殿，世界上现存规模最大、保存最完整的木质结构古建筑群。它不仅是中国古代宫廷建筑之精华，更是中华民族悠久文明的瑰宝。',
        images: [
          '/images/heritage/forbidden-city1.jpg',
          '/images/heritage/forbidden-city2.jpg',
          '/images/heritage/forbidden-city3.jpg',
          '/images/heritage/forbidden-city4.jpg',
          '/images/heritage/forbidden-city5.jpg'
        ],
        commentList: [
          {
            id: 1,
            avatar: '/images/avatar/user6.jpg',
            username: '建筑爱好者',
            content: '故宫的建筑布局体现了中国古代哲学和帝王权威思想，令人折服！',
            time: '2024-03-05 14:20'
          },
          {
            id: 2,
            avatar: '/images/avatar/user7.jpg',
            username: '历史研究者',
            content: '每次参观故宫都能发现新的细节，感受到古人的智慧。',
            time: '2024-03-06 11:35'
          }
        ]
      },
      {
        id: 6,
        title: '昆曲',
        image: '/images/heritage/kunqu.jpg',
        category: '非物质文化遗产',
        likes: 867,
        comments: 35,
        description: '昆曲是中国古老的戏曲艺术形式之一，被誉为"百戏之祖"，距今已有600多年历史。2001年，昆曲被联合国教科文组织列入"人类口述和非物质遗产代表作"名录。',
        images: [
          '/images/heritage/kunqu1.jpg'
        ],
        commentList: [
          {
            id: 1,
            avatar: '/images/avatar/user8.jpg',
            username: '戏曲爱好者',
            content: '昆曲的唱腔委婉动听，表演优美细腻，是中国传统文化的瑰宝！',
            time: '2024-03-12 16:45'
          }
        ]
      }
    ];
    
    // 根据ID获取对应的文化遗产数据
    const heritageData = heritageDatabase.find(item => item.id === heritageId);
    
    // 如果找不到对应ID的数据，使用第一条数据作为默认值
    this.setData({
      heritage: heritageData || heritageDatabase[0]
    });
    
    // 设置页面标题
    if (heritageData) {
      wx.setNavigationBarTitle({
        title: heritageData.title
      });
    }
  },

  // 点赞功能
  onLikeTap: function() {
    const isLiked = !this.data.isLiked;
    this.setData({
      isLiked,
      'heritage.likes': this.data.heritage.likes + (isLiked ? 1 : -1)
    });
  },

  // 评论功能
  onCommentTap: function() {
    this.setData({
      isCommented: !this.data.isCommented
    });
    // 这里可以弹出评论输入框
  },
  
  // 预览图片
  previewImage: function(e) {
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url,
      urls: this.data.heritage.images
    });
  },

  // 分享功能
  onShareTap: function() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  // 分享给朋友
  onShareAppMessage: function() {
    return {
      title: this.data.heritage.title,
      path: `/pages/heritage-detail/heritage-detail?id=${this.data.heritage.id}`,
      imageUrl: this.data.heritage.image
    };
  },

  // 分享到朋友圈
  onShareTimeline: function() {
    return {
      title: this.data.heritage.title,
      query: `id=${this.data.heritage.id}`,
      imageUrl: this.data.heritage.image
    };
  }
}); 