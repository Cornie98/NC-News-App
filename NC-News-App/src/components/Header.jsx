import catLogo from "../assets/cat-tea.svg";
import pixelCatLogo from "../assets/teacup-cat-1.png";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <Link to="/">
                <div className="header-left">
                    <img
                        src={pixelCatLogo}
                        className="pixel-art"
                        alt="Cat Logo"
                    />
                    <h1 className="title">NC News</h1>
                </div>
            </Link>
            <form className="search-form">
                <input type="text" placeholder="Search..." />
            </form>
        </div>
    );
};

export default Header;
