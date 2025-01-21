import {
    BuildTool,
    BuildToolValueTypes,
    Combinations,
    Framework,
    FrameworkValueTypes,
    Store,
    StoreValueTypes,
    SUPPORTED_COMBINATIONS,
} from "./constant.js";

export type TemplateConfig = {
    projectName?: string;
    buildTool: BuildToolValueTypes;
    framework: FrameworkValueTypes;
    store?: StoreValueTypes;
};

// 获取支持的构建工具
export const getSupportedBuildTools = () => {
    const buildTools = new Set(SUPPORTED_COMBINATIONS.map((c) => c.buildTool));
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
