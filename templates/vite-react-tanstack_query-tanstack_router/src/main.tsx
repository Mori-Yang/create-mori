import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
const router = createRouter({ routeTree });


const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
