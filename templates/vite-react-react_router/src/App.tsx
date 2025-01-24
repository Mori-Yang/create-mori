import { NavLink, Outlet } from "react-router";
import "./index.less";

const App = () => {
    return (
        <>
            <div id="nav">
                <NavLink to="/">Home</NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    About
                </NavLink>
            </div>
            <div id="container">
                <Outlet />
            </div>
        </>
    );
};

export default App;
