import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const Comments = ({ article }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        fetch(
            `https://nc-news-api-jqsh.onrender.com/api/articles/${article.article_id}/comments`
        )
            .then((response) => {
                if (!response.ok) {
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.comments);
                setComments(data.comments);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [article.article_id]);

    const handleNewComment = (comment, type, tempId) => {
        if (type === "optimistic") {
            setComments((prev) => [comment, ...prev]);
        } else if (type === "confirmed") {
            setComments((prev) => [
                comment,
                ...prev.filter((comment) => comment.comment_id !== tempId),
            ]);
        } else if (type === "error") {
            setComments((prev) =>
                prev.filter((comment) => comment.comment_id !== tempId)
            );
        }
    };
    const handleDelete = (idToDelete) => {
        setComments((currentComments) =>
            currentComments.filter(
                (comment) => comment.comment_id !== idToDelete
            )
        );
    };
    return (
        <div>
            <h4>{article.comment_count} Comments</h4>
            <CommentForm
                articleId={article.article_id}
                onCommentSubmit={handleNewComment}
            />
            <CommentList comments={comments} onDelete={handleDelete} />
        </div>
    );
};

export default Comments;
