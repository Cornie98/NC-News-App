import catLogo from "../assets/cat-tea.svg";
import pixelCatLogo from "../assets/teacup-cat1.png";
import pixelCatLogoHover from "../assets/teacup-cat2.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";

const Header = () => {
    const { allUsers, user, setUser } = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleUserSelect = (selectedUser) => {
        setUser(selectedUser);
        setShowLogin(false);
    };

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
            <form className="search-form">
                <input type="text" placeholder="Search..." />
            </form>
            {user ? (
                <button className="user-button" onClick={handleLoginClick}>
                    <p>Hello,</p>
                    <p>{user.username}</p>
                    <img
                        src={user.avatar_url}
                        alt={user.username}
                        className="user-avatar"
                    />
                </button>
            ) : (
                <button className={"login-button"} onClick={handleLoginClick}>
                    Log In
                </button>
            )}
            {showLogin && (
                <div
                    className="login-overlay"
                    onClick={() => setShowLogin(false)}
                >
                    <div
                        className="login-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>Select a user to log in</h2>
                        <div className="user-grid">
                            {allUsers.map((user) => (
                                <div
                                    key={user.username}
                                    className="user-card"
                                    onClick={() => handleUserSelect(user)}
                                >
                                    <img
                                        src={user.avatar_url}
                                        alt={user.username}
                                    />
                                    <p>{user.username}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setShowLogin(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
