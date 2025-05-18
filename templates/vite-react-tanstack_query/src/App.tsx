import { useQuery, useQueryClient } from '@tanstack/react-query';
import { lazy, Suspense, useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import './index.less';

const ReactQueryDevtoolsProduction = lazy(() =>
    import('@tanstack/react-query-devtools/production').then(
        (d) => ({
            default: d.ReactQueryDevtools,
        })
    )
)

const App = () => {
    const [showDevToolsPanel, setShowDevToolsPanel] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery<number>(
        {
            queryKey: ['count'],
            queryFn: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(1);
                    }, 1000);
                });
            }
        }
    )

    useEffect(() => {
        window.__open_devtools_panel__ = () => {
            setShowDevToolsPanel(true);
        };
    }, []);


    function handleClick() {
        queryClient.setQueryData(['count'], (oldData: number) => (oldData || 0) + 1);
    }

    return (
        <>
            {
                showDevToolsPanel &&
                <Suspense>
                    <ReactQueryDevtoolsProduction />
                </Suspense>
            }
            {/* Content */}
            <div id="container">
                <img src={logo} alt="logo" />
                <h1>Mori: Vite - React - Tanstack Query!</h1>
                <h2>{isLoading ? 'Loading...' : data}</h2>
                <button type='button' onClick={handleClick}>Add</button>
            </div>
        </>
    );
};

export default App;
