import {
    createLazyFileRoute,
    useLocation,
    useNavigate,
} from '@tanstack/react-router';

export const Route = createLazyFileRoute('/about')({
    component: About,
});

function About() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <img src="./assets/logo.svg" alt="logo" />
            <div id="about">
                <a
                    href="https://github.com/Mori-Young/create-mori/blob/master/README.md"
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
        </>
    );
}
