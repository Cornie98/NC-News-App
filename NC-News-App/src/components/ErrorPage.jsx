import { Link } from "react-router-dom";
import teacupCatErr from "../assets/teacup-cat3.png";
const ErrorPage = () => {
    return (
        <div className="error-page">
            <h1>404 - Page Not Found</h1>
            <h2>The page you are looking for does not exist!</h2>
            <img
                className="pixel-art"
                id="error-img"
                src={teacupCatErr}
                alt="sad teacup cat logo"
            />
            <Link to="/" className="home-link">
                Back to homepage
            </Link>
        </div>
    );
};
export default ErrorPage;
