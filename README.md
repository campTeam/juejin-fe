# 仿稀土掘金前端

## 如何开始

> **Note**
>
> 应全程使用 pnpm 作为包管理器（不要使用yarn或npm）

### 1. 拉取代码

```bash
git clone https://github.com/campTeam/juejin-fe.git
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动项目

```bash
pnpm dev
```

### 环境需求

1. 尽量使用 v18.0.0 以上的 node 版本，避免出现 NuxtJS 的一些问题
2. 使用 pnpm 作为包管理器
3. 使用 VSCode 进行开发
    - 默认情况下，拉取代码后应该会提示下载 Volar 和 Volar(TypeScript) 扩展，如果没有，请手动安装。
    - 安装完成后，参考 <https://cn.vuejs.org/guide/typescript/overview.html#volar-takeover-mode> 打开 Volar 的 takeover mode

## 格式规范

项目已经提前配置 ESLint、Prettier 用于统一代码风格和格式化形式。

且配置 Husky 和 lint-staged 用于在提交代码前进行格式检查，确保代码风格统一。一般情况下无需担心格式问题，但如果你想要手动格式化代码，可以使用以下命令：

```bash
pnpm lint:fix
```

## 提交规范

对于 Commit Message，也有一定的规范，具体规则可以参考 <https://www.conventionalcommits.org/zh-hans/v1.0.0/>。也可以看看历史 Commits

## 自动部署

主分支的代码会自动部署到服务器上，可以通过 <https://juejin.daidr.me> 访问，且 commit 更新内容会在飞书群进行通知。

## 环境变量

在根目录下创建 `.env` 文件，可以进行环境变量的配置。下面是一个示例：

```env
NUXT_API_ENTRY="http://127.0.0.1:1337"
NUXT_PUBLIC_API_ENTRY="http://127.0.0.1:1337"
```

`NUXT_API_ENTRY` 用于指定后端访问 API 时的入口地址，如果不指定，默认为 `https://juejin-cms.daidr.me`。

`NUXT_PUBLIC_API_ENTRY` 用于指定前端访问 API 时的入口地址，如果不指定，默认为 `https://juejin-cms.daidr.me`。

本地开发时，若本地运行着 strapi，可以将两个环境变量均设置成 `http://127.0.0.1:1337` 以便于调试。

将两者分开的原因是：后端在某些情况下可以通过内网访问来加速接口响应。

## 文件结构

```bash
TODO
```
