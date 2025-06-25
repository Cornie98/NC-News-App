import { Link } from "react-router-dom";
import "../Layout.css";

const Sidebar = ({ children, topics }) => {
    return (
        <div className="layout">
            <nav className="sidebar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <h2>Topics</h2>
                    {topics.map((topic) => (
                        <li key={topic.slug}>
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
