import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";

const UserLoginPopup = ({ onClose }) => {
    const { allUsers, user, setUser } = useContext(UserContext);
    const [usernameInput, setUsernameInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [avatarInput, setAvatarInput] = useState("");
    const [message, setMessage] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (isSignUp) {
            try {
                const response = await fetch(
                    "https://nc-news-api-jqsh.onrender.com/api/users",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            username: usernameInput.trim(),
                            name: nameInput.trim(),
                            avatar_url:
                                avatarInput.trim() ||
                                "https://static.wikia.nocookie.net/spinpasta/images/e/e6/Frog.png/revision/latest/scale-to-width-down/340?cb=20240722082821",
                        }),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    setMessage(errorData.msg || "Error signing up");
                    return;
                }

                const data = await response.json();
                setUser(data.user);
                setMessage("");
                onClose();
            } catch (error) {
                console.log(error);
                setMessage("Failed to sign up. Please try again later.");
            }
        } else {
            const foundUser = allUsers.find(
                (u) =>
                    u.username.toLowerCase() ===
                    usernameInput.trim().toLowerCase()
            );

            if (foundUser) {
                setUser(foundUser);
                setMessage("");
                onClose();
            } else {
                setMessage("Username not found. Please sign up!");
            }
        }
    };

    return (
        <div className="login-overlay" onClick={onClose}>
            <div className="login-content" onClick={(e) => e.stopPropagation()}>
                <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
                <form className="add-article-form" onSubmit={handleFormSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                    {isSignUp && (
                        <>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                placeholder="Enter your full name"
                                required={isSignUp}
                            />
                            <label htmlFor="avatar_url">
                                Avatar URL (optional)
                            </label>
                            <input
                                id="avatar_url"
                                type="text"
                                value={avatarInput}
                                onChange={(e) => setAvatarInput(e.target.value)}
                                placeholder="Enter avatar image URL"
                            />
                        </>
                    )}
                    <button type="submit">
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </button>
                </form>
                {message && <p className="warning-msg">{message}</p>}
                <div className="sign-in-buttons">
                    <button
                        className="buttonStyle"
                        style={{ marginTop: "1rem" }}
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setMessage("");
                        }}
                    >
                        {isSignUp ? "Back to Sign In" : "Create an account"}
                    </button>

                    <button
                        className="buttonStyle"
                        onClick={onClose}
                        style={{ marginTop: "0.5rem" }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserLoginPopup;
