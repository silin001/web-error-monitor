/** vite插件类型 */
export type VitePluginsType = {
  name: string;
  apply: "build";
  closeBundle: () => void;
};

/* source map上传参数类型 */
export type SourceMapUploaderType = {
  uploadURL: string; // source map上传接口
  enable?: boolean;
};

/** 数据上报主类 options 参数 */
export type ErrorReportType = {
  reportApi: string; // 上报接口 api
  vue: object; // vue实力
  module: string; // 属于那个项目
};

// 假设 httpPost 函数的返回类型
export interface ApiResponse {
  code: number;
  data: {
    msg?: string;
  };
}
