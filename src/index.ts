/*
 * @Date: 2024-01-29 16:06:39
 * @LastEditTime: 2024-09-18 16:41:30
 * @Description: 插件入口文件，导出所有实现好的插件
 * @FilePath: /my-v3ts-project/Users/sisi/Desktop/myWeb/my-plugins-project/web-error-tracker/src/index.ts
 */

export * from "./plugins/test";
// 导出vite、webpack插件
// import { vitePluginZipPack, WebpackPluginZipPack } from "./plugin-zip-pack";
// export {
//   vitePluginZipPack,
//   WebpackPluginZipPack
// };

// 上面可简写如下：
export * from "./plugins/web-error-report";
