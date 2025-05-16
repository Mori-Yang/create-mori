import { createLazyFileRoute } from '@tanstack/react-router';
import useRootStore from '../store/useRootStore';
import logo from '../../assets/logo.svg';

const Index = () => {
    const { count, doubleCount, addCount, subCount, resetCount } = useRootStore(
        state => state,
    );
    return (
        <>
            <img src={logo} alt="logo" />
            <h1>Mori: Vite - React - Zustand - Tanstack Router!</h1>
            <h2>
                {count}
                {' '}
                × 2 =
                {doubleCount()}
            </h2>
            <div className="btn-group">
                <button type="button" onClick={addCount}>
                    Add
                </button>
                <button type="button" onClick={subCount}>
                    Sub
                </button>
                <button type="button" onClick={resetCount}>
                    Reset
                </button>
            </div>
        </>
    );
};

export const Route = createLazyFileRoute('/')({
    component: Index,
});
