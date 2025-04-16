const util = require('../utils/util');

Component({
  properties: {
    repo: {
      type: Object,
      value: {}
    },
    isFavorited: {
      type: Boolean,
      value: false
    }
  },
  
  methods: {
    // 格式化时间
    formatTime(dateString) {
      if (!dateString) return '';
      return util.formatTimeAgo(dateString);
    },

    // 点击卡片跳转到详情页
    onTapCard: function() {
      const repo = this.properties.repo;
      if (!repo) return;
      
      wx.navigateTo({
        url: `/pages/repo-detail/repo-detail?owner=${repo.owner.login}&repo=${repo.name}`
      });
    },
    
    // 收藏/取消收藏
    onFavorite: function(e) {
      e.stopPropagation(); // 阻止冒泡，防止触发卡片点击事件
      
      const repo = this.properties.repo;
      if (!repo) return;
      
      // 切换收藏状态
      const isFavorited = util.toggleFavorite(repo);
      this.setData({
        isFavorited: isFavorited
      });
      
      // 触发自定义事件，通知父组件收藏状态变化
      this.triggerEvent('favoriteChange', {
        repo: repo,
        isFavorited: isFavorited
      });
      
      // 提示用户
      wx.showToast({
        title: isFavorited ? '已收藏' : '已取消收藏',
        icon: 'success',
        duration: 1500
      });
    }
  }
}); 