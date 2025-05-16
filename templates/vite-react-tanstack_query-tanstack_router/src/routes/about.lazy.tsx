import {
    createLazyFileRoute,
    useLocation,
    useNavigate,
} from '@tanstack/react-router';
import logo from '../../assets/logo.svg';
export const Route = createLazyFileRoute('/about')({
    component: About,
});

function About() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div id="container">
            <img src={logo} alt="logo" />
            <div id="about">
                <a
                    href="https://github.com/Mori-Yang/create-mori/blob/master/README.md"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Github : Create-Mori
                </a>
                <button type="button" onClick={() => navigate({ to: '/' })}>
                    ← From
                    {' '}
                    {location.pathname}
                    {' '}
                    Back to Home
                </button>
            </div>
        </div>
    );
}
