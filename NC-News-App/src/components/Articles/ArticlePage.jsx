import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../Comments/Comments";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";
import { PiShareFat } from "react-icons/pi";

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

                        <h3>By {article.author}</h3>
                        <h3>#{article.topic}</h3>
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
                            alt=""
                        />
                        <section className="article-vote-section">
                            <span>
                                <button>
                                    <GoThumbsup />
                                </button>
                            </span>
                            <span>{article.votes}</span>
                            <span>
                                <button>
                                    <GoThumbsdown />
                                </button>
                            </span>
                        </section>
                        <p className="article-body">{article.body}</p>
                    </div>
                    <section>
                        <Comments article={article} />
                    </section>
                </>
            ) : (
                <p>Loading article...</p>
            )}
        </div>
    );
};
export default ArticlePage;
