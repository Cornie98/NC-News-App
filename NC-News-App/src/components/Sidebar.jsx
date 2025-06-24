import { Link } from "react-router-dom";
import "../Layout.css";

const Sidebar = ({ children }) => {
    return (
        <div className="layout">
            <nav className="sidebar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <h3>Topics</h3>
                    <li>
                        <Link to="/coding">Coding</Link>
                    </li>
                    <li>
                        <Link to="/cooking">Cooking</Link>
                    </li>
                    <li>
                        <Link to="/football">Football</Link>
                    </li>
                </ul>
            </nav>
            <main className="content">{children}</main>
        </div>
    );
};

export default Sidebar;
