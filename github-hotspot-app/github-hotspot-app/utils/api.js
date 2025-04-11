// GitHub API接口请求模块
const app = getApp();
const { mockRepos, mockRepoDetail, mockCommitActivity } = require('./mock-data');

/**
 * 获取每周热门仓库
 * @param {string} language - 编程语言
 * @param {string} since - 时间范围(daily, weekly, monthly)
 */
function getTrendingRepos(language = '', since = 'weekly', page = 1) {
  return new Promise((resolve, reject) => {
    // 使用模拟数据
    try {
      console.log('使用模拟数据代替GitHub API');
      
      // 根据语言过滤仓库
      let filteredRepos = [...mockRepos];
      if (language) {
        filteredRepos = mockRepos.filter(repo => 
          repo.language && repo.language.toLowerCase() === language.toLowerCase()
        );
      }
      
      // 为每个仓库添加语言颜色和收藏状态
      const repos = filteredRepos.map(item => {
        return {
          ...item,
          language_color: getLanguageColor(item.language),
          isFavorited: isFavorite(item.id)
        };
      });
      
      // 模拟延迟
      setTimeout(() => {
        resolve(repos);
      }, 300);
    } catch (error) {
      console.error('处理模拟数据时出错:', error);
      reject(new Error('处理数据失败'));
    }
  });
}

/**
 * 获取仓库详情
 * @param {string} owner - 仓库所有者
 * @param {string} repo - 仓库名称
 */
function getRepoDetail(owner, repo) {
  return new Promise((resolve, reject) => {
    if (!owner || !repo) {
      reject(new Error('仓库所有者或名称不能为空'));
      return;
    }
    
    // 使用模拟数据
    try {
      console.log(`获取仓库详情 ${owner}/${repo}`);
      
      // 模拟延迟
      setTimeout(() => {
        // 如果是mockRepoDetail对应的仓库，直接返回详细信息
        if (owner === 'facebook' && repo === 'react') {
          resolve(mockRepoDetail);
        } else {
          // 否则，找到对应的仓库并构造详情
          const foundRepo = mockRepos.find(r => r.owner.login === owner && r.name === repo);
          if (foundRepo) {
            const watchers = parseInt(foundRepo.stargazers_count) * 0.05;
            const watchersFormatted = watchers >= 1000 ? (watchers / 1000).toFixed(1) + 'k' : watchers;
            
            resolve({
              ...foundRepo,
              watchers_count: watchersFormatted,
              created_at: "2019-01-15T10:00:00Z",
              updated_at: "2023-03-01T14:30:00Z",
              license: { name: "MIT License" }
            });
          } else {
            reject(new Error('找不到该仓库'));
          }
        }
      }, 300);
    } catch (error) {
      console.error('处理模拟仓库详情数据时出错:', error);
      reject(new Error('处理数据失败'));
    }
  });
}

/**
 * 获取仓库最近一周的提交活动
 * @param {string} owner - 仓库所有者
 * @param {string} repo - 仓库名称
 */
function getRepoActivity(owner, repo) {
  return new Promise((resolve, reject) => {
    if (!owner || !repo) {
      reject(new Error('仓库所有者或名称不能为空'));
      return;
    }
    
    // 使用模拟数据
    try {
      console.log(`获取仓库活动 ${owner}/${repo}`);
      
      // 模拟延迟
      setTimeout(() => {
        resolve(mockCommitActivity);
      }, 300);
    } catch (error) {
      console.error('处理模拟仓库活动数据时出错:', error);
      reject(new Error('处理数据失败'));
    }
  });
}

/**
 * 获取语言对应的颜色
 * @param {string} language - 编程语言
 */
function getLanguageColor(language) {
  if (!language) return '#563d7c';
  
  const colors = {
    'JavaScript': '#f1e05a',
    'Python': '#3572A5',
    'Java': '#b07219',
    'Go': '#00ADD8',
    'C++': '#f34b7d',
    'TypeScript': '#2b7489',
    'Ruby': '#701516',
    'PHP': '#4F5D95',
    'C#': '#178600',
    'Swift': '#ffac45',
    'Dart': '#00B4AB'
  };
  
  return colors[language] || '#563d7c';
}

/**
 * 检查仓库是否已收藏
 * @param {string} repoId - 仓库ID
 */
function isFavorite(repoId) {
  if (!repoId) return false;
  
  try {
    const favorites = wx.getStorageSync('favorites') || [];
    return favorites.some(item => item && item.id === repoId);
  } catch (e) {
    console.error('检查收藏状态失败:', e);
    return false;
  }
}

module.exports = {
  getTrendingRepos,
  getRepoDetail,
  getRepoActivity
};