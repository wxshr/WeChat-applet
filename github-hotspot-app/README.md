# GitHub热点小程序

一个用于浏览GitHub热门仓库和趋势的微信小程序。

## 功能特点

- 浏览GitHub热门仓库
- 按编程语言筛选仓库
- 查看仓库详情和提交活动
- 收藏感兴趣的仓库
- 搜索GitHub仓库
- 查看不同时间范围的趋势（每日、每周、每月）

## 页面说明

### 首页
显示当前热门的GitHub仓库，可以按编程语言筛选。

### 趋势页
显示GitHub趋势仓库，可以选择不同的时间范围和编程语言。

### 仓库详情页
展示仓库的详细信息，包括基本信息、提交活动和贡献者列表。

### 搜索页
搜索GitHub仓库，支持保存搜索历史。

### 收藏页
管理收藏的仓库列表。

## 技术实现

- 使用微信小程序原生开发
- 调用GitHub API获取数据
- 本地存储实现收藏功能
- 组件化开发提高代码复用性

## 图标资源

项目需要以下图标资源，请下载并放置到images目录：

- home.png - 首页图标
- home_selected.png - 首页选中图标
- trending.png - 趋势图标
- trending_selected.png - 趋势选中图标
- favorite.png - 收藏图标
- favorite_selected.png - 收藏选中图标
- search.png - 搜索图标
- star.png - 星星图标
- star_filled.png - 填充星星图标
- star_outline.png - 轮廓星星图标
- fork.png - Fork图标
- issue.png - Issue图标
- github.png - GitHub图标
- share.png - 分享图标
- empty.png - 空状态图标
- empty_favorite.png - 空收藏图标
- history.png - 历史记录图标
- clear.png - 清除图标
- trash.png - 删除图标
- search_tip.png - 搜索提示图标

## 项目结构

```
github-hotspot-app/
├── app.js              - 应用入口
├── app.json            - 应用配置
├── app.wxss            - 全局样式
├── pages/              - 页面目录
│   ├── index/          - 首页
│   ├── trending/       - 趋势页
│   ├── repo-detail/    - 仓库详情页
│   ├── search/         - 搜索页
│   └── favorites/      - 收藏页
├── components/         - 组件目录
│   └── repo-card/      - 仓库卡片组件
├── utils/              - 工具目录
│   ├── api.js          - API接口
│   └── util.js         - 通用工具函数
└── images/             - 图片资源目录
```

## 使用说明

1. 使用微信开发者工具打开项目
2. 在app.json中配置你的AppID
3. 编译并运行项目

## 提示

GitHub API有请求频率限制，推荐在正式环境使用时添加自己的GitHub API Token。

## 关于图片资源

需要添加以下图片资源到`/images`目录：
- home.png / home_selected.png - 首页图标
- trending.png / trending_selected.png - 趋势图标
- favorite.png / favorite_selected.png - 收藏图标
- star.png / star_filled.png / star_outline.png - 星标图标
- fork.png - 分支图标
- eye.png - 关注图标
- github.png - GitHub图标
- empty.png - 空状态图标 