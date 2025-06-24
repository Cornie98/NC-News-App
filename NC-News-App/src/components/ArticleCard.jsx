import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
    return (
        <li className="article-card">
            <Link
                to={`/articles/${article.article_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <h3>{article.title}</h3>
                <h4>{article.topic}</h4>
                <p>By {article.author}</p>
                <p>
                    {new Date(article.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </p>

                <img src={article.article_img_url}></img>
                <section>
                    <span>votes:{article.votes}</span>
                    <span>comments:{article.comment_count}</span>
                </section>
            </Link>
        </li>
    );
};
export default ArticleCard;
