import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Loading from "../Loading";
import ArticleVotes from "./ArticleVotes";
import Comments from "../Comments/Comments";
import ErrorPage from "../ErrorPage";

import { LuMousePointerClick } from "react-icons/lu";

const ArticlePage = () => {
    const [reactions, setReactions] = useState([]);
    const [article, setArticle] = useState(null);
    const { article_id } = useParams();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(
            `https://nc-news-api-jqsh.onrender.com/api/articles/${article_id}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Article not found!");
                }
                return response.json();
            })
            .then((data) => {
                setArticle(data.article);
                setError(false);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setError(true);
                setLoading(false);
            });
    }, [article_id]);

    useEffect(() => {
        fetch(
            `https://nc-news-api-jqsh.onrender.com/api/articles/${article_id}/emojis`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("failed to load emoji reactions");
                }
                return response.json();
            })
            .then((data) => {
                setReactions(data.reactions);
            })
            .catch(() => setError("Couldn't load reactions :("));
    }, [article_id]);

    if (loading) return <Loading />;
    if (error) return <ErrorPage />;

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
                        <ArticleVotes
                            article={article}
                            reactions={reactions}
                            setReactions={setReactions}
                        />
                        <p className="article-body">{article.body}</p>
                    </div>
                    <section>
                        <Comments article={article} />
                    </section>
                    <section className="article-see-more">
                        <Link to={`/topics/${article.topic}`}>
                            <LuMousePointerClick />
                            click me to see more articles about {article.topic}
                            <LuMousePointerClick />
                        </Link>
                    </section>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
};
export default ArticlePage;
