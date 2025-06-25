import ArticleList from "./Articles/ArticleList";
import { useEffect, useState } from "react";
import Filter from "./Filter";

const TopicPage = ({ topicSlug }) => {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState({
        sort_by: "created_at",
        order: "desc",
    });

    useEffect(() => {
        fetch(
            `https://nc-news-api-jqsh.onrender.com/api/articles?topic=${topicSlug}&sort_by=${query.sort_by}&order=${query.order}`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setArticles(data.articles);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [topicSlug, query]);

    return (
        <div>
            <div className="topic-heading">
                <h2>#{topicSlug}</h2>
                <Filter onChange={setQuery} />
            </div>

            <ArticleList articles={articles} direction="column" />
        </div>
    );
};

export default TopicPage;
