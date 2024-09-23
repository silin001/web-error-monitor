# 插件简介

`` 源码使用 ts 编写（1.0.17 版本前 js），用于项目 webpack、vite build 结束后压缩打包指定目录资源为.zip 包。

- 新增打包结果推送消息到微信（需关注虾推啥公众号、获取 token）

# 安装

推荐 `pnpm web-error-tracker`

`npm web-error-tracker'`

# 参数配置

```javascript

 {
  uploadURL: '测试包', // 必传参数，需要上传源码文件接口
  enable: true, // 可选参数，插件是否开启，默认true开启
 },

```

# 使用

- vite

```javascript
// vite.config.js
import { sourceMapUploaderVite } from "web-error-tracker";

export default defineConfig({
  plugins: [
    sourceMapUploaderVite({
      uploadURL: "xxx/sourcemap/upload",
    }),
  ],
});
```

- webpack

必须在配置文件配置 output 打包 .js.map 文件生成到 dist 同级目录，名称为： dist-jsmaps 的目录下。因为插件内部对这个目录进行了处理。

```javascript
// webpack.config.js
const { SourceMapUploaderWebpack } = require("web-error-tracker");

module.exports = {
  configureWebpack: {
    plugins: [
      new SourceMapUploaderWebpack({
        uploadURL: "xxx/sourcemap/upload",
      }),
      ,
    ],
    output: {
      // 指定打包 jsmap文件到
      sourceMapFilename: "../dist-jsmaps/[name].js.map",
    },
  },
};
```
