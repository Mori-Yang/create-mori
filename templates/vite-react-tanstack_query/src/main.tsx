import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

const root = createRoot(document.getElementById('root') as HTMLElement);

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />
            <App />
        </QueryClientProvider>
    </StrictMode>
);
