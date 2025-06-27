import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { username } = useParams();
    const { user } = useContext(UserContext);

    if (!user) return <p>Please sign in to view your profile.</p>;

    return (
        <div>
            <h1>My Profile</h1>
            <div className="user-profile-section">
                <img
                    className="profile-picture"
                    src={user.avatar_url}
                    alt={user.username}
                />
                <div className="profile-text">
                    <p>Name: {user.name}</p>
                    <p>Username: {user.username}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
