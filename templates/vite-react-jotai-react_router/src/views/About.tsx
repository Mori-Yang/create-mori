import { useLocation, useNavigate } from 'react-router';
import logo from '../../assets/logo.svg';
const About = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <img src={logo} alt="logo" />
            <div id="about">
                <a
                    href="https://github.com/Mori-Yang/create-mori/blob/master/README.md"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Github : Create-Mori
                </a>
                <button type="button" onClick={() => navigate('/')}>
                    <p>
                        ← From
                        {location.pathname}
                        {' '}
                        Back to Home
                    </p>
                </button>
            </div>
        </>
    );
};

export default About;
