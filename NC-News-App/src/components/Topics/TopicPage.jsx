import ArticleList from "../Articles/ArticleList";
import { useEffect, useState } from "react";
import Filter from "../Filter";

const TopicPage = ({ topic }) => {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState({
        sort_by: "created_at",
        order: "desc",
    });

    useEffect(() => {
        fetch(
            `https://nc-news-api-jqsh.onrender.com/api/articles?topic=${topic.slug}&sort_by=${query.sort_by}&order=${query.order}`
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
    }, [topic.slug, query]);

    return (
        <div>
            <div className="topic-heading">
                <div>
                    <h2>#{topic.slug}</h2>
                    <p>{topic.description}</p>
                </div>
                <Filter onChange={setQuery} />
            </div>

            <ArticleList articles={articles} direction="column" />
        </div>
    );
};

export default TopicPage;
