import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import {
    addCountAtom,
    countAtom,
    doubleCountAtom,
    subCountAtom,
} from '../store/coutAtom';

const Home = () => {
    const [count] = useAtom(countAtom);
    const resetCount = useResetAtom(countAtom);
    const [, addCount] = useAtom(addCountAtom);
    const [, subCount] = useAtom(subCountAtom);
    const [doubleCount] = useAtom(doubleCountAtom);

    return (
        <div id="container">
            <img src="./assets/logo.svg" alt="logo" />
            <h1>Mori: Vite - React - Jotai - React Router!</h1>
            <h2>
                {count}
                {' '}
                × 2 =
                {doubleCount}
            </h2>
            <div className="button-group">
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
        </div>
    );
};

export default Home;
