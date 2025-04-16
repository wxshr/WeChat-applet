/**
 * 模拟数据，用于开发和测试
 */

// 模拟仓库数据
const mockRepos = [
  {
    id: 1,
    name: "vscode",
    full_name: "microsoft/vscode",
    description: "Visual Studio Code 是一个轻量但功能强大的源代码编辑器，可在您的桌面上运行，适用于 Windows、macOS 和 Linux。",
    owner: {
      login: "microsoft",
      avatar_url: "https://avatars.githubusercontent.com/u/6154722?v=4"
    },
    html_url: "https://github.com/microsoft/vscode",
    language: "TypeScript",
    language_color: "#2b7489",
    stargazers_count: 149000,
    watchers_count: 149000,
    forks_count: 25900,
    open_issues_count: 7800,
    updated_at: "2023-04-15T12:00:00Z",
    created_at: "2015-09-03T20:23:38Z",
    pushed_at: "2023-04-16T08:35:22Z",
    topics: ["editor", "code", "typescript", "web"],
    license: {
      name: "MIT License",
      spdx_id: "MIT"
    },
    default_branch: "main",
    homepage: "https://code.visualstudio.com"
  },
  {
    id: 2,
    name: "react",
    full_name: "facebook/react",
    description: "React 是一个用于构建用户界面的 JavaScript 库。",
    owner: {
      login: "facebook",
      avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4"
    },
    html_url: "https://github.com/facebook/react",
    language: "JavaScript",
    language_color: "#f1e05a",
    stargazers_count: 207000,
    watchers_count: 207000,
    forks_count: 42900,
    open_issues_count: 1245,
    updated_at: "2023-04-16T10:20:30Z",
    created_at: "2013-05-24T16:15:54Z",
    pushed_at: "2023-04-16T10:11:32Z",
    topics: ["react", "javascript", "frontend", "ui"],
    license: {
      name: "MIT License",
      spdx_id: "MIT"
    },
    default_branch: "main",
    homepage: "https://reactjs.org"
  },
  {
    id: 3,
    name: "tensorflow",
    full_name: "tensorflow/tensorflow",
    description: "TensorFlow 是一个用于机器智能的端到端开源平台。",
    owner: {
      login: "tensorflow",
      avatar_url: "https://avatars.githubusercontent.com/u/15658638?v=4"
    },
    html_url: "https://github.com/tensorflow/tensorflow",
    language: "C++",
    language_color: "#f34b7d",
    stargazers_count: 175000,
    watchers_count: 175000,
    forks_count: 88200,
    open_issues_count: 2830,
    updated_at: "2023-04-15T15:48:22Z",
    created_at: "2015-11-07T01:19:20Z",
    pushed_at: "2023-04-16T11:40:15Z",
    topics: ["machine-learning", "deep-learning", "tensorflow", "ai"],
    license: {
      name: "Apache License 2.0",
      spdx_id: "Apache-2.0"
    },
    default_branch: "master",
    homepage: "https://www.tensorflow.org"
  },
  {
    id: 4,
    name: "vue",
    full_name: "vuejs/vue",
    description: "Vue.js 是一套构建用户界面的渐进式框架。",
    owner: {
      login: "vuejs",
      avatar_url: "https://avatars.githubusercontent.com/u/6128107?v=4"
    },
    html_url: "https://github.com/vuejs/vue",
    language: "TypeScript",
    language_color: "#2b7489",
    stargazers_count: 203000,
    watchers_count: 203000,
    forks_count: 33800,
    open_issues_count: 590,
    updated_at: "2023-04-16T09:15:10Z",
    created_at: "2013-07-29T03:24:51Z",
    pushed_at: "2023-04-15T18:22:45Z",
    topics: ["vue", "javascript", "frontend", "framework"],
    license: {
      name: "MIT License",
      spdx_id: "MIT"
    },
    default_branch: "main",
    homepage: "https://vuejs.org"
  },
  {
    id: 5,
    name: "flutter",
    full_name: "flutter/flutter",
    description: "Flutter 让您可以快速、轻松地构建美观的应用程序。",
    owner: {
      login: "flutter",
      avatar_url: "https://avatars.githubusercontent.com/u/14101776?v=4"
    },
    html_url: "https://github.com/flutter/flutter",
    language: "Dart",
    language_color: "#00B4AB",
    stargazers_count: 152000,
    watchers_count: 152000,
    forks_count: 25100,
    open_issues_count: 11500,
    updated_at: "2023-04-16T12:30:40Z",
    created_at: "2015-03-06T22:54:58Z",
    pushed_at: "2023-04-16T11:08:32Z",
    topics: ["flutter", "dart", "mobile", "ui"],
    license: {
      name: "BSD 3-Clause License",
      spdx_id: "BSD-3-Clause"
    },
    default_branch: "master",
    homepage: "https://flutter.dev"
  }
];

// 模拟提交活动数据
const mockCommitActivity = [
  { total: 250, week: 1 },
  { total: 420, week: 2 },
  { total: 380, week: 3 },
  { total: 310, week: 4 },
  { total: 450, week: 5 },
  { total: 500, week: 6 },
  { total: 480, week: 7 },
  { total: 300, week: 8 },
  { total: 350, week: 9 },
  { total: 400, week: 10 }
];

// 模拟贡献者数据
const mockContributors = [
  {
    id: 101,
    login: "contributor1",
    avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
    contributions: 580
  },
  {
    id: 102,
    login: "contributor2",
    avatar_url: "https://avatars.githubusercontent.com/u/23456789?v=4",
    contributions: 420
  },
  {
    id: 103,
    login: "contributor3",
    avatar_url: "https://avatars.githubusercontent.com/u/34567890?v=4",
    contributions: 380
  },
  {
    id: 104,
    login: "contributor4",
    avatar_url: "https://avatars.githubusercontent.com/u/45678901?v=4",
    contributions: 320
  },
  {
    id: 105,
    login: "contributor5",
    avatar_url: "https://avatars.githubusercontent.com/u/56789012?v=4",
    contributions: 280
  }
];

module.exports = {
  mockRepos,
  mockCommitActivity,
  mockContributors
}; 