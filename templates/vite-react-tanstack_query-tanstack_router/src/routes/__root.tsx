import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import '../index.less';
import { lazy, Suspense, useEffect, useState } from 'react';

const TanStackRouterDevtools
    = process.env.NODE_ENV === 'production'
        ? () => null // Render nothing in production
        : lazy(() =>
            // Lazy load in development
            import('@tanstack/react-router-devtools').then(res => ({
                default: res.TanStackRouterDevtools,
                // For Embedded Mode
                // default: res.TanStackRouterDevtoolsPanel
            })),
        );

const ReactQueryDevtoolsProduction = lazy(() =>
    import('@tanstack/react-query-devtools/production').then(
        (d) => ({
            default: d.ReactQueryDevtools,
        })
    )
)

const queryClient = new QueryClient();

/**
 * ! Export must be named Route
    
 */
export const Route = createRootRoute({
    component: () => {
        const [showDevToolsPanel, setShowDevToolsPanel] = useState<boolean>(false);

        useEffect(() => {
            window.__open_devtools_panel__ = () => {
                setShowDevToolsPanel(true);
            };
        }, []);

        return (
            <QueryClientProvider client={queryClient}>
                <TanStackRouterDevtools />
                <ReactQueryDevtools />
                {
                    showDevToolsPanel &&
                    <Suspense>
                        <ReactQueryDevtoolsProduction />
                    </Suspense>
                }
                <div className="p-2 flex gap-2">
                    <Link to="/" className="[&.active]:font-bold">
                        Home
                    </Link>
                    <Link to="/about" className="[&.active]:font-bold">
                        About
                    </Link>
                </div>
                <hr />
                <Outlet />
            </QueryClientProvider>
        )
    }
});
