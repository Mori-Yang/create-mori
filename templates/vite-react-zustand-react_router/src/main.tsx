import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './routes/router';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
