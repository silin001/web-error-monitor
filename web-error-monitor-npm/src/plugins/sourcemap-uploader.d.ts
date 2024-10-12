/** vite插件类型 */
type VitePluginZipPackType = {
    name: string;
    apply: "build";
    closeBundle: () => void;
};
type SourceMapUploaderType = {
    uploadURL: string;
    enable?: boolean;
};
declare const _default: {
    pluginSourceMapUploaderVite: (options: SourceMapUploaderType) => VitePluginZipPackType;
};
export default _default;
