/**
 * 格式化时间
 * @param {Date} date - 日期对象
 */
function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`;
}

/**
 * 格式化数字，保证两位数
 * @param {number} n - 数字
 */
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : `0${n}`;
}

/**
 * 格式化仓库星星数等为K, M单位
 * @param {number} num - 数字
 */
function formatCount(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num;
}

/**
 * 从完整的仓库名称中提取owner和repo名称
 * @param {string} fullName - 完整仓库名称(owner/repo)
 */
function parseRepoFullName(fullName) {
  const parts = fullName.split('/');
  if (parts.length === 2) {
    return {
      owner: parts[0],
      repo: parts[1]
    };
  }
  return null;
}

/**
 * 处理收藏功能
 * @param {object} repo - 仓库对象
 */
function toggleFavorite(repo) {
  try {
    // 获取当前收藏列表
    let favorites = wx.getStorageSync('favorites') || [];
    
    // 检查是否已经收藏
    const index = favorites.findIndex(item => item.id === repo.id);
    
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

/**
 * 检查仓库是否已收藏
 * @param {string} repoId - 仓库ID
 */
function isFavorite(repoId) {
  try {
    const favorites = wx.getStorageSync('favorites') || [];
    return favorites.some(item => item.id === repoId);
  } catch (e) {
    console.error('检查收藏状态失败:', e);
    return false;
  }
}

/**
 * 获取所有收藏的仓库
 */
function getFavorites() {
  try {
    return wx.getStorageSync('favorites') || [];
  } catch (e) {
    console.error('获取收藏列表失败:', e);
    return [];
  }
}

module.exports = {
  formatTime,
  formatCount,
  parseRepoFullName,
  toggleFavorite,
  isFavorite,
  getFavorites
}; 