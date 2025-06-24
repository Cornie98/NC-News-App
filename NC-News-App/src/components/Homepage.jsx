import { useEffect, useState } from "react";
import ArticleList from "./ArticleList";
import TopArticle from "./TopArticle";
const Homepage = () => {
    const [articles, setArticles] = useState([]);
    const [topArticle, setTopArticle] = useState(null);

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
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h2>Top Article</h2>
            <TopArticle article={topArticle} />
            <h2>All Articles</h2>
            <ArticleList articles={articles} />
        </div>
    );
};
export default Homepage;
