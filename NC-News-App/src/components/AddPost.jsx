import { UserContext } from "../Contexts/UserContext";
import { useContext, useState } from "react";
import { PiConfetti } from "react-icons/pi";
import "./AddPost.css";

const AddPost = ({ topics }) => {
    const { user } = useContext(UserContext);

    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [body, setBody] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    if (!user)
        return (
            <h1>
                To post an article <span className="bold">please sign in!</span>
            </h1>
        );
    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMsg("");
        setErrorMsg("");

        const newArticle = {
            author: user.username,
            title,
            topic,
            body,
            article_img_url: imageUrl || undefined,
        };

        fetch("https://nc-news-api-jqsh.onrender.com/api/articles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newArticle),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(({ msg }) => {
                        throw new Error(msg || "Failed to post article");
                    });
                }
                return response.json();
            })
            .then((data) => {
                setSuccessMsg("Article posted successfully! 🎉");
                setTitle("");
                setTopic("");
                setBody("");
                setImageUrl("");
            })
            .catch((err) => {
                setErrorMsg(err.message || "Something went wrong.");
            });
    };
    return (
        <div className="add-post-container">
            <h2>Post a New Article</h2>
            <form className="add-article-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Add Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Write your article body here..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />

                <input
                    type="url"
                    placeholder="Image URL (optional)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                >
                    <option value="">Choose a topic</option>
                    {topics.map(({ slug, description }) => (
                        <option key={slug} value={slug}>
                            {slug}
                        </option>
                    ))}
                </select>

                <button type="submit">Post Article</button>
            </form>
            {successMsg && <p className="success-msg">{successMsg}</p>}

            {errorMsg && <p className="error-msg"> {errorMsg}⚠️</p>}
        </div>
    );
};

export default AddPost;
