import pixelCatLogo from "../assets/teacup-cat1.png";
import pixelCatLogoHover from "../assets/teacup-cat2.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import UserLoginPopup from "./UserLoginPopup";

import Search from "./Search/Search";

const Header = ({ searchTerm, setSearchTerm }) => {
    const { user, setUser } = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="header">
            <Link to="/">
                <div className="header-left">
                    <img
                        src={pixelCatLogo}
                        className="pixel-art default-logo"
                        alt="Teacup Cat Logo"
                    />
                    <img
                        src={pixelCatLogoHover}
                        className="pixel-art hover-logo"
                        alt="Teacup Cat Logo Hovered"
                    />
                    <h1 className="title">NC News</h1>
                </div>
            </Link>

            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="header-right">
                <Link to="/post">
                    <button className="login-button">Add Post</button>
                </Link>

                {user ? (
                    <button
                        className="user-button"
                        onClick={() => setUser(null)}
                    >
                        <p>Sign Out</p>
                        <p>{user.username}</p>
                        <img
                            src={user.avatar_url}
                            alt={user.username}
                            className="user-avatar"
                        />
                    </button>
                ) : (
                    <button
                        className="login-button"
                        onClick={() => setShowLogin(true)}
                    >
                        Sign In
                    </button>
                )}

                {showLogin && (
                    <UserLoginPopup onClose={() => setShowLogin(false)} />
                )}
            </div>
        </div>
    );
};

export default Header;
