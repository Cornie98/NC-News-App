import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../Comments/Comments";
import { Link } from "react-router-dom";

import ArticleVotes from "./ArticleVotes";

const ArticlePage = () => {
    const [article, setArticle] = useState(null);
    const { article_id } = useParams();

    useEffect(() => {
        fetch(
            `https://nc-news-api-jqsh.onrender.com/api/articles/${article_id}`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data.article);
                setArticle(data.article);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [article_id]);

    return (
        <div>
            {article ? (
                <>
                    <div className="article-section">
                        <h1>{article.title}</h1>

                        <h2>By {article.author}</h2>
                        <Link to={`/topics/${article.topic}`}>
                            #{article.topic}
                        </Link>
                        <p>
                            {new Date(article.created_at).toLocaleDateString(
                                "en-GB",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }
                            )}
                        </p>
                        <img
                            className="article-img"
                            src={article.article_img_url}
                            alt={`Image for ${article.title}`}
                        />
                        <ArticleVotes article={article} />
                        <p className="article-body">{article.body}</p>
                    </div>
                    <section>
                        <Comments article={article} />
                    </section>
                    <section className="article-see-more">
                        <Link to={`/topics/${article.topic}`}>
                            click me to see more articles about {article.topic}
                        </Link>
                    </section>
                </>
            ) : (
                <p>Loading article...</p>
            )}
        </div>
    );
};
export default ArticlePage;
