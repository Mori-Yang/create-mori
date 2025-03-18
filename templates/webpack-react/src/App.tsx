import { useState } from 'react';
import './index.less';

const App = () => {
    const [count, setCount] = useState(0);
    return (
        <div id="container">
            <h1>Mori: Webpack - React!</h1>
            <h2>{count}</h2>
            <button type="button" onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
};

export default App;
