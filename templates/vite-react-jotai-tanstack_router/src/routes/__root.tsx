import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import React from "react";
const TanStackRouterDevtools =
    process.env.NODE_ENV === "production"
        ? () => null // Render nothing in production
        : React.lazy(() =>
              // Lazy load in development
              import("@tanstack/router-devtools").then((res) => ({
                  default: res.TanStackRouterDevtools,
                  // For Embedded Mode
                  // default: res.TanStackRouterDevtoolsPanel
              }))
          );

/**
 * ! Export must be named Route
 */
export const Route = createRootRoute({
    component: () => (
        <>
            <div>
                <Link to="/">Home</Link> <Link to="/about">About</Link>
            </div>
            <hr />
            <div id="container">
                <Outlet />
            </div>
            <TanStackRouterDevtools />
        </>
    ),
});
