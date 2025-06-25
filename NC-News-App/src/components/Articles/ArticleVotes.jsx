import { useState } from "react";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";
import { PiShareFatLight } from "react-icons/pi";

const ArticleVotes = ({ article }) => {
    const [votes, setVotes] = useState(article.votes);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleVote = async (increment) => {
        if (isUpdating) return;
        setIsUpdating(true);

        setVotes((currentVotes) => currentVotes + increment);

        try {
            const response = await fetch(
                `https://nc-news-api-jqsh.onrender.com/api/articles/${article.article_id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ inc_votes: increment }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to update vote :(");
            }
            const data = await response.json();
            setVotes(data.article.votes);
        } catch (error) {
            setVotes((currentVotes) => currentVotes - increment);
            console.log(error);
        } finally {
            setIsUpdating(false);
        }
    };
    const handleShareClick = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy:", err);
            alert("Failed to copy link.");
        }
    };

    return (
        <section className="article-vote-section">
            <div className="vote-buttons">
                <span>
                    <button onClick={() => handleVote(1)} disabled={isUpdating}>
                        <GoThumbsup />
                    </button>
                </span>
                <span>{votes}</span>
                <span>
                    <button
                        onClick={() => handleVote(-1)}
                        disabled={isUpdating}
                    >
                        <GoThumbsdown />
                    </button>
                </span>
            </div>
            <button onClick={handleShareClick} className="share-button">
                <PiShareFatLight />
                Share
            </button>
        </section>
    );
};

export default ArticleVotes;
