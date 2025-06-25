import { useState } from "react";

const CommentForm = ({ articleId, onCommentSubmit }) => {
    const [newComment, setNewComment] = useState("");
    const [username, setUsername] = useState("happyamy2016");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const pendingComment = {
            comment_id: Date.now(),
            author: username,
            body: newComment,
            votes: 0,
            created_at: new Date().toISOString(),
        };

        setIsSubmitting(true);
        setSuccess(false);
        onCommentSubmit(
            pendingComment,
            "optimistic",
            pendingComment.comment_id
        );
        try {
            const response = await fetch(
                `https://nc-news-api-jqsh.onrender.com/api/articles/${articleId}/comments`,
                {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ username, body: newComment }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to post comment :(");
            }
            const { comment } = await response.json();
            onCommentSubmit(comment, "confirmed", pendingComment.comment_id);
            setNewComment("");
        } catch (error) {
            onCommentSubmit(null, "error", pendingComment.comment_id);
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <form className="comment-form" onSubmit={handleSubmit} action="">
            <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={isSubmitting}
            />
            <div className="comment-buttons">
                <button
                    type="reset"
                    onClick={() => setNewComment("")}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button type="submit" disabled={isSubmitting || !newComment}>
                    {isSubmitting
                        ? "Submitting..."
                        : success
                          ? "✓ Submitted"
                          : "Submit"}
                </button>
            </div>
        </form>
    );
};

export default CommentForm;
