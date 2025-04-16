const api = require('../../utils/api');
const util = require('../../utils/util');

Page({
  data: {
    searchQuery: '',
    searchHistory: [],
    searchResults: [],
    isLoading: false,
    hasSearched: false,
    hasMore: true,
    currentPage: 1,
    totalCount: 0,
    autoFocus: true
  },
  
  onLoad: function(options) {
    // 加载搜索历史
    this.loadSearchHistory();
    
    // 如果有传入查询参数，则自动搜索
    if (options.query) {
      this.setData({
        searchQuery: options.query,
        autoFocus: false
      });
      this.onSearch();
    }
  },
  
  // 加载搜索历史
  loadSearchHistory: function() {
    try {
      const history = wx.getStorageSync('searchHistory') || [];
      this.setData({ searchHistory: history });
    } catch (e) {
      console.error('加载搜索历史失败:', e);
    }
  },
  
  // 保存搜索历史
  saveSearchHistory: function(query) {
    try {
      let history = wx.getStorageSync('searchHistory') || [];
      
      // 如果已存在相同查询，则先移除
      history = history.filter(item => item !== query);
      
      // 添加到历史记录前面
      history.unshift(query);
      
      // 限制历史记录数量
      if (history.length > 10) {
        history = history.slice(0, 10);
      }
      
      // 保存更新后的历史记录
      wx.setStorageSync('searchHistory', history);
      this.setData({ searchHistory: history });
    } catch (e) {
      console.error('保存搜索历史失败:', e);
    }
  },
  
  // 清空搜索历史
  clearHistory: function() {
    wx.showModal({
      title: '确认操作',
      content: '确定要清空搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('searchHistory', []);
          this.setData({ searchHistory: [] });
        }
      }
    });
  },
  
  // 输入搜索关键词
  onSearchInput: function(e) {
    this.setData({
      searchQuery: e.detail.value
    });
  },
  
  // 清空搜索框
  clearSearch: function() {
    this.setData({
      searchQuery: '',
      autoFocus: true
    });
  },
  
  // 点击历史记录项
  onHistoryItemTap: function(e) {
    const query = e.currentTarget.dataset.query;
    this.setData({
      searchQuery: query
    });
    this.onSearch();
  },
  
  // 搜索处理
  onSearch: function() {
    const { searchQuery } = this.data;
    if (!searchQuery.trim()) return;
    
    // 保存到搜索历史
    this.saveSearchHistory(searchQuery);
    
    // 重置搜索状态
    this.setData({
      searchResults: [],
      currentPage: 1,
      hasMore: true,
      hasSearched: true
    });
    
    // 执行搜索
    this.fetchSearchResults();
  },
  
  // 获取搜索结果
  fetchSearchResults: function(page = 1) {
    const { searchQuery, isLoading } = this.data;
    if (isLoading || !searchQuery.trim()) return;
    
    this.setData({ isLoading: true });
    
    api.searchRepos(searchQuery, page)
      .then(result => {
        // 检查仓库是否已收藏
        const items = result.items || [];
        items.forEach(repo => {
          repo.isFavorited = util.isFavorite(repo.id);
        });
        
        // 更新数据
        this.setData({
          searchResults: page === 1 ? items : this.data.searchResults.concat(items),
          isLoading: false,
          hasMore: items.length === 10,
          currentPage: page,
          totalCount: result.total_count || 0
        });
      })
      .catch(err => {
        console.error('搜索失败:', err);
        this.setData({ isLoading: false });
        wx.showToast({
          title: '搜索失败',
          icon: 'none'
        });
      });
  },
  
  // 收藏状态变化处理
  onFavoriteChange: function(e) {
    const { repo, isFavorited } = e.detail;
    const index = this.data.searchResults.findIndex(item => item.id === repo.id);
    
    if (index > -1) {
      // 更新收藏状态
      this.setData({
        [`searchResults[${index}].isFavorited`]: isFavorited
      });
    }
  },
  
  // 上拉加载更多
  onReachBottom: function() {
    if (!this.data.hasMore || this.data.isLoading) return;
    this.fetchSearchResults(this.data.currentPage + 1);
  },
  
  // 下拉刷新
  onPullDownRefresh: function() {
    if (this.data.hasSearched) {
      this.setData({
        searchResults: [],
        currentPage: 1,
        hasMore: true
      });
      this.fetchSearchResults().then(() => {
        wx.stopPullDownRefresh();
      }).catch(() => {
        wx.stopPullDownRefresh();
      });
    } else {
      this.loadSearchHistory();
      wx.stopPullDownRefresh();
    }
  },
  
  // 分享功能
  onShareAppMessage: function() {
    if (this.data.searchQuery) {
      return {
        title: `GitHub热点: ${this.data.searchQuery}`,
        path: `/pages/search/search?query=${encodeURIComponent(this.data.searchQuery)}`
      };
    }
    return {
      title: 'GitHub热点小程序',
      path: '/pages/search/search'
    };
  }
}); 