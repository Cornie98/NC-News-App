import { Link } from "react-router-dom";

const ArticleCard = ({ article, direction = "row" }) => {
    return (
        <li
            className={`article-card ${direction === "column" ? "vertical" : ""}`}
        >
            <Link
                to={`/articles/${article.article_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <h2>{article.title}</h2>
                <h3>#{article.topic}</h3>
                <p>By {article.author}</p>
                <p>
                    {new Date(article.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </p>

                <img
                    className="article-card-img"
                    src={article.article_img_url}
                    alt={`Image for ${article.title}`}
                ></img>
                <section className="votes-and-comments">
                    <span>votes: {article.votes}</span>
                    <span>comments: {article.comment_count}</span>
                </section>
            </Link>
        </li>
    );
};
export default ArticleCard;
