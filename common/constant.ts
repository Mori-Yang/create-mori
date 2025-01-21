const isChina = Intl.DateTimeFormat()
    .resolvedOptions()
    .locale.toLowerCase()
    .includes("zh-cn");

const Framework = {
    Text: {
        1: "Vue",
        2: "React",
    },
    Value: {
        Vue: 1,
        React: 2,
    },
} as const;

const BuildTool = {
    Text: {
        1: "Vite",
        2: "Webpack",
    },
    Value: {
        Vite: 1,
        Webpack: 2,
    },
} as const;

const Store = {
    Text: {
        1: "Vuex",
        2: "Pinia",
        3: "Zustand",
        4: "Jotai",
    },
    Value: {
        Vuex: 1,
        Pinia: 2,
        Zustand: 3,
        Jotai: 4,
    },
} as const;

export type BuildToolValueTypes =
    (typeof BuildTool.Value)[keyof typeof BuildTool.Value];
export type FrameworkValueTypes =
    (typeof Framework.Value)[keyof typeof Framework.Value];
export type StoreValueTypes = (typeof Store.Value)[keyof typeof Store.Value];
export type Combinations = {
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
export { BuildTool, Framework, SUPPORTED_COMBINATIONS, Store, isChina };
