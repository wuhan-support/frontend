# wuhan-support 前端项目
本项目为 https://feiyan.help 网站的前端项目

## 技术栈
- MVVC 框架：Vue.js (https://vuejs.org)
- UI 框架：Vuetify.js (https://vuetifyjs.org)

## 构建与使用
### 构建生产环境
```
$ yarn
$ yarn build
```

### 开启本地开发服务器
```
$ yarn
$ yarn serve
```

## Contributing
本项目使用 Feature Branch 协作方案。若要开发新功能/修复一特定功能，请：
1. 以 `dev` 分支为基础，使用 `git checkout -b {分支名}` 分出以 `feat-{功能名}` 为名的分支，其中 `{功能名}` 的命名标准为：
    - URL-compatible （仅可含有 `[A-Za-z0-9\-]`）
    - 英文
    - 用 1-3 个词简要描述功能名
2. 进行正常开发
3. 开发完成并 `commit` 后，使用 `git push --set-upstream origin {分支名}` 将当前更改 `push` 至 GitHub
4. 访问 GitHub，[创建 Pull Request](https://github.com/wuhan-support/frontend/compare)
    - 其中，`base` 选择 `dev`，`compare` 选择之前的分支名
    - 请在文字描述中/assign [OWNERS](https://github.com/wuhan-support/frontend/blob/dev/OWNERS)文件中的同学进行代码审核
5. 代码合并由@ws-robot 吃小⚪同学负责
