import CommentCard from "./CommentCard.jsx";

const CommentList = ({ comments, onDelete }) => {
    return (
        <ul className="comment-list">
            {comments.map((comment) => (
                <CommentCard
                    key={comment.comment_id}
                    comment={comment}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
};
export default CommentList;
