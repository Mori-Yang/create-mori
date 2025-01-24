import {
    BuildTool,
    BuildToolValueTypes,
    Framework,
    FrameworkValueTypes,
    Router,
    RouterValueTypes,
    Store,
    StoreValueTypes,
} from "./common/constant.js";

export type Combinations = {
    buildTool: BuildToolValueTypes;
    framework: FrameworkValueTypes;
    store?: StoreValueTypes;
    router?: RouterValueTypes;
};
/**
 * 配置可选组合
 */
const SUPPORTED_COMBINATIONS: Array<Combinations> = [
    {
        buildTool: BuildTool.Value.Vite,
        framework: Framework.Value.React,
    },
    {
        buildTool: BuildTool.Value.Webpack,
        framework: Framework.Value.React,
    },
    {
        buildTool: BuildTool.Value.Vite,
        framework: Framework.Value.React,
        store: Store.Value.Zustand,
    },
    {
        buildTool: BuildTool.Value.Vite,
        framework: Framework.Value.React,
        store: Store.Value.Jotai,
    },
    {
        buildTool: BuildTool.Value.Vite,
        framework: Framework.Value.React,
        router: Router.Value.ReactRouter,
    },
];

export default SUPPORTED_COMBINATIONS;
