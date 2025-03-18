import useRootStore from '../store/useRootStore';

const Home = () => {
    const { count, doubleCount, addCount, subCount, resetCount } = useRootStore(
        state => state,
    );
    return (
        <>
            <img src="./assets/logo.svg" alt="logo" />
            <h1>Mori: Vite - React - Zustand - React Router!</h1>
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

export default Home;
