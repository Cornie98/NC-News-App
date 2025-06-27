import { Link } from "react-router-dom";
import "../Layout.css";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";

const Sidebar = ({ children, topics }) => {
    const { user } = useContext(UserContext);
    const [sidebarShow, setSidebarShow] = useState(false);

    return (
        <div className="layout">
            <div className="hamburger-wrapper">
                <button
                    className="hamburger-button"
                    onClick={() => setSidebarShow(!sidebarShow)}
                >
                    <FaBars />
                </button>
            </div>
            <nav className={`sidebar ${sidebarShow ? "open" : ""}`}>
                <ul>
                    <li className="sidebar-title">
                        <Link to="/">Home</Link>
                    </li>
                    {user && (
                        <li className="sidebar-title">
                            <Link to={`/profile`}>My Profile</Link>
                        </li>
                    )}
                    <li className="sidebar-title">
                        <Link to={`/topics`}>Topics</Link>
                    </li>
                    {topics.map((topic) => (
                        <li className="sidebar-subtitle" key={topic.slug}>
                            <Link to={`/topics/${topic.slug}`}>
                                #{topic.slug}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <main className="content">{children}</main>
        </div>
    );
};

export default Sidebar;
