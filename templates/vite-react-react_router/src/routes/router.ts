import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        lazy: async () => {
            const { default: App } = await import("../App");
            return { Component: App };
        },
        /**
         * When using `createBrowserRouter` and `RouterProvider`,
         * even without using SSR, the console warns:
         * `hook.js:608 No 'HydrateFallback' element provided to render during initial hydration Error Component Stack`.
         */
        hydrateFallbackElement: "",
        children: [
            {
                index: true,
                lazy: async () => {
                    const { default: Home } = await import("../views/Home");
                    return { Component: Home };
                },
            },
            {
                path: "about",
                lazy: async () => {
                    const { default: About } = await import("../views/About");
                    return { Component: About };
                },
            },
        ],
    },
]);

export default router;
