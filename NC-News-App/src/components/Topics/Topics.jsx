import { Link } from "react-router-dom";
import "./Topics.css";

const Topics = ({ topics }) => {
    return (
        <div className="topics-container">
            {topics.map((topic) => (
                <Link
                    to={`/topics/${topic.slug}`}
                    key={topic.slug}
                    className="topic-card"
                >
                    <h3 className="topic-title">#{topic.slug}</h3>
                    <p className="topic-description">{topic.description}</p>
                    <img src={topic.img_url}></img>
                </Link>
            ))}
        </div>
    );
};

export default Topics;
