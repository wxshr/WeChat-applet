// 安全加载util模块
let util;
try {
  // 尝试从components/utils目录加载
  util = require('./utils/util');
} catch (error) {
  try {
    // 如果失败，尝试从根目录的utils加载
    util = require('../utils/util');
  } catch (error2) {
    // 如果两种方式都失败，提供一个基本的实现
    console.error('无法加载util模块:', error2);
    util = {
      toggleFavorite: function(repo) {
        console.log('使用备用的toggleFavorite函数');
        try {
          // 获取当前收藏列表
          let favorites = wx.getStorageSync('favorites') || [];
          
          // 检查是否已经收藏
          const index = favorites.findIndex(item => item && item.id === repo.id);
          
          if (index > -1) {
            // 如果已收藏，则取消收藏
            favorites.splice(index, 1);
          } else {
            // 如果未收藏，则添加到收藏
            favorites.push(repo);
          }
          
          // 保存更新后的收藏列表
          wx.setStorageSync('favorites', favorites);
          
          // 返回当前收藏状态
          return index === -1;
        } catch (e) {
          console.error('处理收藏失败:', e);
          return false;
        }
      }
    };
  }
}

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
    // 点击卡片跳转到详情页
    onTapCard: function() {
      const repo = this.properties.repo;
      if (!repo) return;
      
      // 安全检查，确保owner和name存在
      const owner = (repo.owner && repo.owner.login) ? repo.owner.login : '';
      const repoName = repo.name || '';
      
      if (!owner || !repoName) {
        wx.showToast({
          title: '仓库信息不完整',
          icon: 'none'
        });
        return;
      }
      
      wx.navigateTo({
        url: `/pages/trending/trending?owner=${owner}&repo=${repoName}`
      });
    },
    
    // 收藏/取消收藏
    onFavorite: function(e) {
      e.stopPropagation(); // 阻止冒泡，防止触发卡片点击事件
      
      const repo = this.properties.repo;
      if (!repo) return;
      
      try {
        // 切换收藏状态
        const isFavorited = util.toggleFavorite(repo);
        this.setData({
          isFavorited: isFavorited
        });
        
        // 触发自定义事件，通知父组件收藏状态变化
        this.triggerEvent('favoriteChange', {
          id: repo.id,
          isFavorited: isFavorited
        });
        
        // 提示用户
        wx.showToast({
          title: isFavorited ? '已收藏' : '已取消收藏',
          icon: 'success',
          duration: 1500
        });
      } catch (error) {
        console.error('收藏操作失败:', error);
        wx.showToast({
          title: '操作失败',
          icon: 'none'
        });
      }
    }
  }
}); 