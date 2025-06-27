import { useEffect, useState } from "react";
import ArticleList from "./Articles/ArticleList";
import TopArticle from "./Articles/TopArticle";

import Loading from "./Loading";
const Homepage = () => {
    const [articles, setArticles] = useState([]);
    const [topArticle, setTopArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://nc-news-api-jqsh.onrender.com/api/articles")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data.articles);
                setArticles(data.articles);
                if (data.articles.length > 0) {
                    const top = data.articles.reduce((prev, current) =>
                        current.votes > prev.votes ? current : prev
                    );
                    setTopArticle(top);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="main-content">
            {loading ? (
                <Loading />
            ) : (
                <>
                    {topArticle && (
                        <>
                            <TopArticle article={topArticle} />
                        </>
                    )}
                    <h2>All Articles</h2>
                    <ArticleList articles={articles} />
                </>
            )}
        </div>
    );
};
export default Homepage;
