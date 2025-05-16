import type {
    BuildToolValueTypes,
    FrameworkValueTypes,
    RouterValueTypes,
    StoreValueTypes } from './common/constant.js';
import {
    BuildTool,
    Framework,
    Router,
    Store,
} from './common/constant.js';

export type Combinations = {
    buildTool: BuildToolValueTypes
    framework: FrameworkValueTypes
    store?: StoreValueTypes
    router?: RouterValueTypes
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
        store: Store.Value.TanstackQuery,
    },
    {
        buildTool: BuildTool.Value.Vite,
        framework: Framework.Value.React,
        router: Router.Value.ReactRouter,
    },
    {
        buildTool: BuildTool.Value.Vite,
        framework: Framework.Value.React,
        router: Router.Value.TanstackRouter,
    },
    {
        buildTool: BuildTool.Value.Vite,
        framework: Framework.Value.React,
        store: Store.Value.TanstackQuery,
        router: Router.Value.TanstackRouter,
    },
    {
        buildTool: BuildTool.Value.Vite,
        framework: Framework.Value.React,
        store: Store.Value.Jotai,
        router: Router.Value.TanstackRouter,
    },
    {
        buildTool: BuildTool.Value.Vite,
        framework: Framework.Value.React,
        store: Store.Value.Zustand,
        router: Router.Value.TanstackRouter,
    },
    {
        buildTool: BuildTool.Value.Vite,
        framework: Framework.Value.React,
        store: Store.Value.Zustand,
        router: Router.Value.ReactRouter,
    },
    {
        buildTool: BuildTool.Value.Vite,
        framework: Framework.Value.React,
        store: Store.Value.Jotai,
        router: Router.Value.ReactRouter,
    },
];

export default SUPPORTED_COMBINATIONS;
