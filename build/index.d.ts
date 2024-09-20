declare const test = "=======>  typescript  plugin-zip-pack...";
declare const deepClone: (obj: Object) => object;

/** vite插件类型 */
type VitePluginsType = {
    name: string;
    apply: "build";
    closeBundle: () => void;
};
type SourceMapUploaderType = {
    uploadURL: string;
    enable?: boolean;
};
/** 数据上报主类 options 参数 */
type ErrorReportType = {
    reportApi: string;
    vue: object;
    module: string;
};

/**
 * @description: 格式化错误信息
 * @param {*} type
 * @param {*} message
 * @param {*} stack
 * @return {*}
 */
declare function formatErrorDatas(type: any, message: any, stack: any): {
    errorType: any;
    message: any;
    stack: any;
    date: string;
};
declare class ErrorReport {
    options: any;
    reportApi: any;
    vueExample: any;
    constructor(options: ErrorReportType);
    init(): void;
    /**
     * @description: 使用TraceKit工具对错误信息统一格式化后上报
     * @return {*}
     */
    formatErrorInfo(): void;
    /**
     * @description: 通过img方式进行错误信息上报
     * @param {*} datas
     * @return {*}
     */
    reportViaImg(datas: any): void;
    vueErrorHandler(): void;
    resourceStatus(imageUrl: any): Promise<{
        status: number;
        statusText: string;
    } | undefined>;
    resourceErrorHandler(): void;
    private createResourceErrorObject;
    jsError(): void;
    promiseError(): void;
}

/** 支持webpack打包后产物类插件 */
declare class SourceMapUploaderWebpack {
    private options;
    constructor(options: SourceMapUploaderType);
    apply(compiler: any): void;
}
/** 支持vite 源码文件上传 */
declare const sourceMapUploaderVite: (options: SourceMapUploaderType) => VitePluginsType;

export { ErrorReport, SourceMapUploaderWebpack, deepClone, formatErrorDatas, sourceMapUploaderVite, test };
