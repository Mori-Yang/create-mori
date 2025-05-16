import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createLazyFileRoute('/')({
    component: Index,
});

function Index() {
    const [count, setCount] = useState(0);
    return (
        <div id="container">
            <img src="./assets/logo.svg" alt="logo" />
            <h1>Mori: Vite  - React- Tanstack Router!</h1>
            <h2>{count}</h2>
            <button type="button" onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}
