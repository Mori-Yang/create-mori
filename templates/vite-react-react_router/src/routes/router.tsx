import { createBrowserRouter, RouteObject } from "react-router";
import { Fragment } from "react/jsx-runtime";
import App from "../App";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        /**
         * When using `createBrowserRouter` and `RouterProvider`,
         * even without using SSR, the console warns:
         * `hook.js:608 No 'HydrateFallback' element provided to render during initial hydration Error Component Stack`.
         *  related issue: https://github.com/remix-run/react-router/issues/12249
         */
        hydrateFallbackElement: <Fragment></Fragment>,
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
];

const router = createBrowserRouter(routes);

export default router;
