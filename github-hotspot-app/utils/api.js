// GitHub API接口请求模块
const app = getApp();
const mockData = require('./mock-data');

// 开发环境标志，用于控制是否使用模拟数据
const USE_MOCK_DATA = true;

/**
 * 获取每周热门仓库
 * @param {string} language - 编程语言
 * @param {string} since - 时间范围(daily, weekly, monthly)
 */
function getTrendingRepos(language = '', since = 'weekly', page = 1) {
  // 如果使用模拟数据，直接返回模拟数据
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.mockRepos);
      }, 500); // 模拟网络延迟
    });
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${app.globalData.apiBaseUrl}/search/repositories`,
      method: 'GET',
      data: {
        q: language ? `language:${language}` : 'stars:>1000',
        sort: 'stars',
        order: 'desc',
        per_page: 10,
        page: page
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data.items || []);
        } else {
          reject(new Error(`接口请求失败: ${res.statusCode}`));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * 获取仓库详情
 * @param {string} owner - 仓库所有者
 * @param {string} repo - 仓库名称
 */
function getRepoDetail(owner, repo) {
  // 如果使用模拟数据，从模拟数据中查找匹配的仓库
  if (USE_MOCK_DATA) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundRepo = mockData.mockRepos.find(
          item => item.owner.login === owner && item.name === repo
        );
        if (foundRepo) {
          resolve(foundRepo);
        } else {
          // 如果找不到匹配的仓库，返回第一个仓库
          resolve(mockData.mockRepos[0]);
        }
      }, 500); // 模拟网络延迟
    });
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${app.globalData.apiBaseUrl}/repos/${owner}/${repo}`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(`接口请求失败: ${res.statusCode}`));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * 获取仓库最近一周的提交活动
 * @param {string} owner - 仓库所有者
 * @param {string} repo - 仓库名称
 */
function getRepoActivity(owner, repo) {
  // 如果使用模拟数据，返回模拟的提交活动数据
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.mockCommitActivity);
      }, 500); // 模拟网络延迟
    });
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${app.globalData.apiBaseUrl}/repos/${owner}/${repo}/stats/commit_activity`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(`接口请求失败: ${res.statusCode}`));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * 获取仓库贡献者
 * @param {string} owner - 仓库所有者
 * @param {string} repo - 仓库名称
 */
function getRepoContributors(owner, repo) {
  // 如果使用模拟数据，返回模拟的贡献者数据
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.mockContributors);
      }, 500); // 模拟网络延迟
    });
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${app.globalData.apiBaseUrl}/repos/${owner}/${repo}/contributors`,
      method: 'GET',
      data: {
        per_page: 10 // 只获取前10个贡献者
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(`接口请求失败: ${res.statusCode}`));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * 搜索仓库
 * @param {string} query - 搜索关键词
 * @param {number} page - 页码
 */
function searchRepos(query, page = 1) {
  // 如果使用模拟数据，过滤符合搜索条件的仓库
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 简单过滤，如果搜索词出现在仓库名、描述或全名中即视为匹配
        const filteredRepos = mockData.mockRepos.filter(repo => {
          const lowerQuery = query.toLowerCase();
          return (
            repo.name.toLowerCase().includes(lowerQuery) ||
            repo.full_name.toLowerCase().includes(lowerQuery) ||
            (repo.description && repo.description.toLowerCase().includes(lowerQuery))
          );
        });

        resolve({
          items: filteredRepos,
          total_count: filteredRepos.length
        });
      }, 500); // 模拟网络延迟
    });
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${app.globalData.apiBaseUrl}/search/repositories`,
      method: 'GET',
      data: {
        q: query,
        sort: 'stars',
        order: 'desc',
        per_page: 10,
        page: page
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve({
            items: res.data.items || [],
            total_count: res.data.total_count || 0
          });
        } else {
          reject(new Error(`接口请求失败: ${res.statusCode}`));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

module.exports = {
  getTrendingRepos,
  getRepoDetail,
  getRepoActivity,
  getRepoContributors,
  searchRepos
}; 