import { Link } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";

const ArticleCard = ({ article, direction = "row" }) => {
    return (
        <li
            className={`article-card ${direction === "column" ? "vertical" : ""}`}
        >
            <Link
                to={`/articles/${article.article_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <div className="article-meta">
                    <h2 className="article-title">{article.title}</h2>
                    <h3 className="article-topic">#{article.topic}</h3>
                    <p className="article-author-date">
                        By {article.author} •{" "}
                        {new Date(article.created_at).toLocaleDateString(
                            "en-GB",
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            }
                        )}
                    </p>
                </div>

                <div className="article-img-wrapper">
                    <img
                        className="article-card-img"
                        src={article.article_img_url}
                        alt={`Image for ${article.title}`}
                    />
                </div>

                <section className="votes-and-comments">
                    <span>
                        {article.votes >= 0 ? <GoThumbsup /> : <GoThumbsdown />}{" "}
                        {article.votes}
                    </span>
                    <span>
                        <FaRegCommentDots />
                        {article.comment_count}
                    </span>
                </section>
            </Link>
        </li>
    );
};

export default ArticleCard;
