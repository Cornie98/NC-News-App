import { useEffect, useState } from "react";

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
    }, []);
    return (
        <div>
            <h4>{article.comment_count} Comments</h4>
            <form action="">
                <input type="text" />
            </form>
        </div>
    );
};

export default Comments;
