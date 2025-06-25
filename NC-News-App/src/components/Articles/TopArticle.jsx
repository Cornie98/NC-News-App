import { Link } from "react-router-dom";
const TopArticle = ({ article }) => {
    if (!article) return null;

    return (
        <div className="top-article">
            <div className="top-article-text">
                <h1>{article.title}</h1>

                <p>
                    {new Date(article.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </p>
                <p className="top-article-author">
                    <strong>Author:</strong> {article.author}
                </p>
                <Link to={`/articles/${article.article_id}`}>
                    <button className="read-more">Read more...</button>
                </Link>
            </div>

            <img
                className="top-article-img"
                src={article.article_img_url}
                alt={article.title}
            />
        </div>
    );
};

export default TopArticle;
