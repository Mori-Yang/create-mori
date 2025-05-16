import { useState } from 'react';
import logo from '../../assets/logo.svg';

const Home = () => {
    const [count, setCount] = useState(0);
    return (
        <>
            <img src={logo} alt="logo" />
            <h1>Mori: Vite - React - React Router!</h1>
            <h2>{count}</h2>
            <button type="button" onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </>
    );
};

export default Home;
