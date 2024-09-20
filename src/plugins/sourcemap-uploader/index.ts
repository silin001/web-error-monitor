/*
 * @Date: 2024-09-19 09:28:42
 * @LastEditTime: 2024-09-20 10:23:12
 * @Description: sourcemap文件上传插件入口文件
 * @FilePath: /my-v3ts-project/Users/sisi/Desktop/myWeb/my-plugins-project/web-error-tracker/src/plugins/sourcemap-uploader/index.ts
 */

import { SourceMapUploaderType, VitePluginsType } from "../../type/index";
import { sourceUpload, SourceMapHandler } from "./sourcemap-uploader";
import { STORAGE_DIR } from "../../utils/constant";
/** 支持webpack打包后产物类插件 */
class SourceMapUploaderWebpack {
  private options: SourceMapUploaderType;
  constructor(options: SourceMapUploaderType) {
    this.options = options;
  }
  apply(compiler) {
    // 判断是否是生产环境
    if (compiler.options.mode === "production") {
      compiler.hooks.done.tap(
        "SourceMapUploaderWebpack",
        () =>
          async ({ compilation }) => {
            // assets包含了当前编译过程中产生的所有资源文件的信息。
            const { assets } = compilation;
            // 拿到当前输出目录的绝对路径
            const outputPath = compilation.getPath(
              compilation.outputOptions.path,
              {}
            );
            // map文件上传到node服务
            sourceUpload(
              assets,
              outputPath,
              this.options.uploadURL,
              STORAGE_DIR.webpack
            );
          }
      );
    }
  }
}

/** 支持vite 源码文件上传 */
export const sourceMapUploaderVite = (
  options: SourceMapUploaderType
): VitePluginsType => {
  return {
    name: "source-map-uploader-vite",
    apply: "build",
    async closeBundle() {
      // console.log("vite-打包结束");
      // 获取vite打包结束后dist下的源码文件
      const { outputPath, jsmapsDir, getJsmaps, moveJsMaps } =
        new SourceMapHandler();
      const jsmaps = await getJsmaps(outputPath);
      // 移动 jsmap 文件到 jsmaps 目录下
      moveJsMaps(jsmaps, outputPath, jsmapsDir);
      // map文件上传到node服务
      sourceUpload(jsmaps, outputPath, options.uploadURL, STORAGE_DIR.vite);
    },
  };
};

/* 最终导出支持 webpack、vite打包产物 .js.map文件上传 */
export default {
  sourceMapUploaderVite,
  SourceMapUploaderWebpack,
};
