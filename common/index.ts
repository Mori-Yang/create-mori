import { BuildTool, Framework, Store } from "./constant.js";

type BuildToolValueTypes =
    (typeof BuildTool.Value)[keyof typeof BuildTool.Value];
type FrameworkValueTypes =
    (typeof Framework.Value)[keyof typeof Framework.Value];
type StoreValueTypes = (typeof Store.Value)[keyof typeof Store.Value];

type Combinations = {
    buildTool: BuildToolValueTypes;
    framework: FrameworkValueTypes;
    store?: StoreValueTypes;
};

export type TemplateConfig = {
    projectName?: string;
    buildTool: BuildToolValueTypes;
    framework: FrameworkValueTypes;
    store?: StoreValueTypes;
};

/**
 * 配置可选组合
 */
const SUPPORTED_COMBINATIONS: Array<Combinations> = [
    {
        buildTool: BuildTool.Value.Vite,
        framework: Framework.Value.Vue,
    },
    {
        buildTool: BuildTool.Value.Vite,
        framework: Framework.Value.React,
    },
    // {
    //     buildTool: BuildTool.Value.Vite,
    //     framework: Framework.Value.React,
    //     store: Store.Value.Zustand,
    // },
    // {
    //     buildTool: BuildTool.Value.Vite,
    //     framework: Framework.Value.React,
    //     store: Store.Value.Jotai,
    // },
    // {
    //     buildTool: BuildTool.Value.Vite,
    //     framework: Framework.Value.Vue,
    //     store: Store.Value.Vuex,
    // },
];

// 获取支持的构建工具
export const getSupportedBuildTools = () => {
    const buildTools = new Set(SUPPORTED_COMBINATIONS.map((c) => c.framework));

    return Array.from(buildTools).map((value) => ({
        title: BuildTool.Text[value],
        value,
    }));
};

// 获取支持的框架
export const getSupportedFrameworks = () => {
    const frameworks = new Set(SUPPORTED_COMBINATIONS.map((c) => c.framework));
    return Array.from(frameworks).map((value) => ({
        title: Framework.Text[value],
        value,
    }));
};

// 获取特定框架下支持的状态管理库
export const getSupportedStores = (framework: FrameworkValueTypes) => {
    const frameworks = new Set(
        SUPPORTED_COMBINATIONS.filter(
            (c): c is Combinations & { store: StoreValueTypes } =>
                c.framework === framework && c.store !== undefined
        ).map((c) => c.store)
    );

    return Array.from(frameworks).map((value) => {
        return {
            title: Store.Text[value],
            value,
        };
    });
};

export * from "./create-template.js";
