import { useAtom } from "jotai";
import "./index.less";
import {
    addCountAtom,
    countAtom,
    doubleCountAtom,
    resetCountAtom,
    subCountAtom,
} from "./store/countAtom";

const App = () => {
    const [count] = useAtom(countAtom);
    const [, addCount] = useAtom(addCountAtom);
    const [, resetCount] = useAtom(resetCountAtom);
    const [, subCount] = useAtom(subCountAtom);
    const [doubleCount] = useAtom(doubleCountAtom);

    return (
        <div id="container">
            <img src="./assets/logo.svg" alt="logo" />
            <h1>Mori: Vite - React - Jotai!</h1>
            <h2>
                {count} × 2 = {doubleCount}
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

export default App;
