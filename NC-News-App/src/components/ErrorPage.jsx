import { Link } from "react-router-dom";
import teacupCatErr from "../assets/teacup-cat3.png";
const ErrorPage = () => {
    return (
        <div className="error-page">
            <h1>The page you are looking for does not exist!</h1>
            <img
                className="pixel-art"
                id="error-img"
                src={teacupCatErr}
                alt="sad teacup cat logo"
            />
        </div>
    );
};
export default ErrorPage;
