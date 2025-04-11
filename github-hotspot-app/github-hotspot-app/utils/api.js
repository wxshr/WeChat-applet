// GitHub API接口请求模块
const app = getApp();

/**
 * 获取每周热门仓库
 * @param {string} language - 编程语言
 * @param {string} since - 时间范围(daily, weekly, monthly)
 */
function getTrendingRepos(language = '', since = 'weekly', page = 1) {
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

module.exports = {
  getTrendingRepos,
  getRepoDetail,
  getRepoActivity
}; 