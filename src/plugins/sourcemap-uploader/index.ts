/*
 * @Date: 2024-09-19 09:28:42
 * @LastEditTime: 2024-09-23 15:16:03
 * @Description: sourcemap 源码文件上传插件入口文件
 * @FilePath: /my-v3ts-project/Users/sisi/Desktop/myWeb/my-plugins-project/web-error-tracker/src/plugins/sourcemap-uploader/index.ts
 */

import { SourceMapUploaderType, VitePluginsType } from "../../type/index";
import { sourceUpload, SourceMapHandler } from "./sourcemap-uploader";
import { STORAGE_DIR } from "../../utils/constant";

/** 支持webpack打包后产物类插件 */
class SourceMapUploaderWebpack {
  private options: SourceMapUploaderType;
  constructor(
    options: SourceMapUploaderType = { uploadURL: "", enable: false }
  ) {
    this.options = options;
  }
  apply(compiler) {
    if (this.options.enable) {
      return;
    }
    // 判断是否是生产环境
    if (compiler.options.mode === "production") {
      compiler.hooks.done.tap("SourceMapUploaderWebpack", async (stats) => {
        try {
          // 获取打包结束后dist下的源码文件
          const { jsmapsDir, getJsmaps } = new SourceMapHandler("webpack");
          const jsmaps = await getJsmaps(jsmapsDir);
          // map文件上传到node服务
          sourceUpload(
            jsmaps,
            jsmapsDir,
            this.options.uploadURL,
            STORAGE_DIR.webpack
          );
        } catch (error: any) {
          console.error(`Error uploading source maps: ${error.message}`);
          throw error; // 抛出错误以确保 Webpack 知道出错
        }
      });
    }
  }
}

/** 支持vite 源码文件上传 */
const sourceMapUploaderVite = (
  options: SourceMapUploaderType = { uploadURL: "", enable: false }
): VitePluginsType => {
  return {
    name: "source-map-uploader-vite",
    apply: "build",
    async closeBundle() {
      // console.log("vite-打包结束");
      if (options.enable) {
        return;
      }
      // 获取vite打包结束后dist下的源码文件
      const { outputPath, jsmapsDir, getJsmaps, moveJsMaps } =
        new SourceMapHandler("vite");
      const jsmaps = await getJsmaps(outputPath);
      // 移动 jsmap 文件到 jsmaps 目录下
      moveJsMaps(jsmaps, outputPath, jsmapsDir);
      // map文件上传到node服务
      sourceUpload(jsmaps, outputPath, options.uploadURL, STORAGE_DIR.vite);
    },
  };
};

/* 最终导出支持 webpack、vite打包产物 .js.map文件上传 */
export { sourceMapUploaderVite, SourceMapUploaderWebpack };
