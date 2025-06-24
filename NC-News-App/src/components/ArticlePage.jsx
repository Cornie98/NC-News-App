import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

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
                    <h3>{article.title}</h3>
                    <h4>{article.topic}</h4>
                    <h4>By {article.author}</h4>
                    <p>
                        {new Date(article.created_at).toLocaleDateString(
                            "en-GB",
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            }
                        )}
                    </p>
                    <img src={article.article_img_url} alt="" />
                    <section>
                        <p>votes:{article.votes}</p>
                    </section>
                    <p>{article.body}</p>
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
