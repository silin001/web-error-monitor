import { SourceMapUploaderType, VitePluginsType } from "../../type/index";
/** 支持webpack打包后产物类插件 */
declare class SourceMapUploaderWebpack {
    private options;
    constructor(options: SourceMapUploaderType);
    apply(compiler: any): void;
}
/** 支持vite 源码文件上传 */
declare const sourceMapUploaderVite: (options: SourceMapUploaderType) => VitePluginsType;
export { sourceMapUploaderVite, SourceMapUploaderWebpack };
