import { useState, useContext } from "react";
import { GoThumbsup, GoThumbsdown, GoTrash } from "react-icons/go";
import Delete from "../Delete";
import { UserContext } from "../../Contexts/UserContext";

const CommentCard = ({ comment, onDelete }) => {
    const [votes, setVotes] = useState(comment.votes);
    const [isUpdating, setIsUpdating] = useState(false);
    const { user } = useContext(UserContext);

    const handleVote = async (increment) => {
        if (isUpdating) return;
        setIsUpdating(true);

        setVotes((currentVotes) => currentVotes + increment);

        try {
            const response = await fetch(
                `https://nc-news-api-jqsh.onrender.com/api/comments/${comment.comment_id}`,
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
            setVotes(data.comment.votes);
        } catch (error) {
            setVotes((currentVotes) => currentVotes - increment);
            console.log(error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <li className="comment-card">
            <section className="comment-name-date-section">
                <h4>
                    <span>@{comment.author}</span>
                </h4>
                <span>
                    {new Date(comment.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            </section>
            <p className="comment-body">{comment.body}</p>

            <section className="comment-vote-section">
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
                <div>
                    {comment.author === user?.username && (
                        <Delete
                            commentId={comment.comment_id}
                            onDelete={onDelete}
                        />
                    )}
                </div>
            </section>
        </li>
    );
};

export default CommentCard;
