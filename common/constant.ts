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

export { BuildTool, Framework, Store, isChina };
