# 简介

`web-error-tracker` 【插件源码】，用于打包后上传源码文件、vue 前端项目错误信息监控、上报。

源码基于 ts 编写，最终通过 rollup 打包为 umd 格式的资源包。

# 技术栈

- typescript
- rollup

# npm 源注意！

发布时报错：`Public registration is not allowed`

查看 npm 源： `npm config get registry`

设置 npm 源为 npm 镜像（必须为 npm 镜像才可以发布成功！）：`npm config set registry https://registry.npmjs.org/`

设置 npm 源为淘宝镜像： `npm config set registry https://registry.npm.taobao.org`

设置 npm 源为阿里云镜像： `npm config set registry https://registry.npmmirror.com`



# 打包相关

## 本地打包调试

`pnpm dev`： 本地源码测试

`pnpm dev:test`: 只用于更新本地 lib 目录（不发布 npm 包!）用于本地调试，不使用 rollup 打包（目前该插件实现功能简单，使用 rollup 打包后体积反而会比源码文件大） 而是使用 lib.js 复制 src、index 源码到 lib 目录下

`dev:build`: 用于本地打包（不发布 npm 包!），包含 ts 类型文件，打包完成后进行本地测试

build 文件夹下需要 package.json 文件，不需要打包时的一些依赖，只保留核心依赖即可。


## 打包方式 1（使用 rollup 打包）

可配置打包出支持 esm、cjs、umd。目前直接打包出通用的 umd 格式。

### 最终发布 npm 包打包命令：`pnpm build`

需要先切换到根目录然后执行： `pnpm build`

执行命令后执行脚本顺序：

- set:npmsource （查看当前 npm 源、设置 npm 源为 npm 镜像）
- rollup -c rollup.config.js （使用 rollup 打包，因为使用了插件所以 rollup -c 时会打包出 ts 的类型文件）

- pnpm build:cp （使用 node 执行本地 ./script/rollup-build.js 脚本，复制 build 目录的一些产物到 web-error-traceker-npm 最终要发布到npm官网目录）

- pnpm build:publish （先 cd 到 xxx-npm 要发布npm官网到目录，注意这里进入后就不能使用根目录 dev、getnpm 等指令了， 然后在该目录执行 npm login 登录、输入用户名（我的： sisi001 ）、然后密码 (此时需要查看手机的 otp 6 位数验证码)、 npm publish 发布、然后再 cd 上级目录 还原设置 npm 源为淘宝镜像）


如果发布失败了 记得手动将 `web-error-monitor`目录下的 package.json 的版本号退回，因为在打包命令里配置了每次打包版本号+1



## 打包方式 2（不使用 rollup，体积小）

ps：目前该插件实现功能简单，使用 rollup 打包后体积反而会比源码文件大，所以直接源码上传 npm。

源码使用到了 node 模块、使用 commonJs 语法导出，所以此打包方式只支持 commonJs 引入使用。

- `pnpm lib`

执行命令后先打包、更改 npm 源、然后发布 npm； 发布前需要先登录 npm、输入邮箱、输入验证码，比较麻烦。目前我这里使用了 npm token + f2a 方式验证登录，每次发布时需要在手机的 `Authenticator App` 输入 6 位数的 otp 验证码即可。

- 发布 npm 官网

`"lib:publish": "cd ./lib && npm publish && cd ../ && pnpm setnpmtb",`: 该命令先 cd 指定目录
然后设置 npm 源为 npm 镜像（必须）
然后直接发布、
最后发布完成后在把 npm 源设置为最开始的淘宝源。

ps: lib 目录中 package.json 文件如果后期有依赖更新需要手动更改。

script 目录下的 lib.js 实现是使用 node 模块复制 src、index 文件到 lib 目录
