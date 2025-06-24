import CommentCard from "./CommentCard";

const CommentList = ({ comments }) => {
    return (
        <ul className="comment-list">
            {comments.map((comment) => (
                <CommentCard key={comment.comment_id} comment={comment} />
            ))}
        </ul>
    );
};
export default CommentList;
