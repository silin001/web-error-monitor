# 插件简介

`web-error-tracker` 源码使用 ts 编写，用于webpack、vite(生产环境暂不支持) build 结束后上传sourcemap文件，用于源码解析，监控前端页面资源错误时，进行错误信息上报。

- 注意

使用该插件时，需要配合对应的接口服务（接口处理对应源码后，）

# 安装

推荐 `pnpm web-error-tracker`

`cnpm web-error-tracker'`

# 参数配置


- SourceMapUploaderWebpack 源码上传类

```javascript

 {
   uploadURL: 'http://127.0.0.1:4000/sem/sourcemap/upload', // 必传参数，需要上传源码文件接口（目前服务端接口都用的本地接口）
  enable: true, // 可选参数，插件是否开启，默认true开启
 },

```


- ErrorReport 错误上报类

```javascript

 {
    module: 'xxx', // 模块分类（如果：个人项目）
    packingMethod: 'webpack', // 打包方式
    vue: Vue, // vue实例
    // 错误上报接口， 该url前缀需要在 nginx 中配置拦截转发去掉一个 /sem
    reportApi: '/sem/sem/sourcemap/errorMsgReport?data='
 },

```


# webpack项目中使用

- webpack配置文件中配置源码上传到服务端

必须在配置文件配置 `output` 字段配置打包 `.js.map` 文件生成到 dist 同级目录，名称为： `dist-jsmaps` 的目录下。因为插件内部对这个目录进行了处理。

```javascript
// webpack.config.js
const { SourceMapUploaderWebpack } = require("web-error-tracker");

module.exports = {
  configureWebpack: {
    plugins: [
      new SourceMapUploaderWebpack({
        uploadURL: "http://127.0.0.1:4000/sem/sourcemap/upload",
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

- webpack项目中main.js入口文件进行初始化错误上报


```javascript
import { ErrorReport } from 'web-error-tracker'
const isProduction = process.env.NODE_ENV === 'development'
if (!isProduction) {
  console.log('---webpack-生产环境---')
  const myErrorReport = new ErrorReport({
    module: 'xxx',
    packingMethod: 'webpack', // 打包方式
    vue: Vue,
    // nginx 会拦截转发去掉一个 /sem
    reportApi: '/sem/sem/sourcemap/errorMsgReport?data='
  })
  console.log(myErrorReport)
}
```



# vite项目中使用（目前只有dev环境可使用，生产环境待探索！）

ps： 因为vite项目打包部署后，如果页面出现某个资源404错误，控制台报错后直接阻塞了后续进程，导致无法进行错误捕获上报操作

- vite配置文件

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