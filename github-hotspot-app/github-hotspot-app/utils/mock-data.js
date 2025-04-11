// 模拟GitHub仓库数据
const mockRepos = [
  {
    id: 1001,
    full_name: "facebook/react",
    name: "react",
    description: "一个用于构建用户界面的JavaScript库",
    language: "JavaScript",
    stargazers_count: "182k",
    forks_count: "38k",
    owner: {
      login: "facebook",
      avatar_url: "https://avatars.githubusercontent.com/facebook"
    }
  },
  {
    id: 1002,
    full_name: "tensorflow/tensorflow",
    name: "tensorflow",
    description: "深度学习框架",
    language: "Python",
    stargazers_count: "165k",
    forks_count: "86k",
    owner: {
      login: "tensorflow",
      avatar_url: "https://avatars.githubusercontent.com/tensorflow"
    }
  },
  {
    id: 1003,
    full_name: "vuejs/vue",
    name: "vue",
    description: "渐进式JavaScript框架",
    language: "JavaScript",
    stargazers_count: "192k",
    forks_count: "30k",
    owner: {
      login: "vuejs",
      avatar_url: "https://avatars.githubusercontent.com/vuejs"
    }
  },
  {
    id: 1004,
    full_name: "microsoft/vscode",
    name: "vscode",
    description: "Visual Studio Code",
    language: "TypeScript",
    stargazers_count: "132k",
    forks_count: "22k",
    owner: {
      login: "microsoft",
      avatar_url: "https://avatars.githubusercontent.com/microsoft"
    }
  },
  {
    id: 1005,
    full_name: "golang/go",
    name: "go",
    description: "Go编程语言",
    language: "Go",
    stargazers_count: "102k",
    forks_count: "15k",
    owner: {
      login: "golang",
      avatar_url: "https://avatars.githubusercontent.com/golang"
    }
  },
  {
    id: 1006,
    full_name: "kubernetes/kubernetes",
    name: "kubernetes",
    description: "容器编排系统",
    language: "Go",
    stargazers_count: "92k",
    forks_count: "34k",
    owner: {
      login: "kubernetes",
      avatar_url: "https://avatars.githubusercontent.com/kubernetes"
    }
  },
  {
    id: 1007,
    full_name: "facebook/react-native",
    name: "react-native",
    description: "使用React构建原生应用的框架",
    language: "JavaScript",
    stargazers_count: "102k",
    forks_count: "22k",
    owner: {
      login: "facebook",
      avatar_url: "https://avatars.githubusercontent.com/facebook"
    }
  },
  {
    id: 1008,
    full_name: "flutter/flutter",
    name: "flutter",
    description: "Google的UI工具包",
    language: "Dart",
    stargazers_count: "142k",
    forks_count: "22k",
    owner: {
      login: "flutter",
      avatar_url: "https://avatars.githubusercontent.com/flutter"
    }
  },
  {
    id: 1009,
    full_name: "pytorch/pytorch",
    name: "pytorch",
    description: "Python中的张量和动态神经网络",
    language: "Python",
    stargazers_count: "60k",
    forks_count: "16k",
    owner: {
      login: "pytorch",
      avatar_url: "https://avatars.githubusercontent.com/pytorch"
    }
  },
  {
    id: 1010,
    full_name: "android/android",
    name: "android",
    description: "Android开源项目",
    language: "Java",
    stargazers_count: "42k",
    forks_count: "14k",
    owner: {
      login: "android",
      avatar_url: "https://avatars.githubusercontent.com/android"
    }
  }
];

// 模拟仓库详情数据
const mockRepoDetail = {
  id: 1001,
  full_name: "facebook/react",
  name: "react",
  description: "一个用于构建用户界面的JavaScript库",
  language: "JavaScript",
  stargazers_count: "182k",
  forks_count: "38k",
  watchers_count: "6.7k",
  homepage: "https://reactjs.org",
  created_at: "2013-05-24T16:15:54Z",
  updated_at: "2023-03-15T10:21:32Z",
  license: {
    name: "MIT License"
  },
  owner: {
    login: "facebook",
    avatar_url: "https://avatars.githubusercontent.com/facebook"
  }
};

// 模拟提交活动数据
const mockCommitActivity = [
  { total: 40 },
  { total: 35 },
  { total: 12 },
  { total: 25 },
  { total: 30 },
  { total: 45 },
  { total: 38 },
  { total: 22 },
  { total: 18 },
  { total: 27 }
];

module.exports = {
  mockRepos,
  mockRepoDetail,
  mockCommitActivity
}; 