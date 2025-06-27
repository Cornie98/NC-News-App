import Filter from "../Filter";
import ArticleList from "../Articles/ArticleList";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState({
        sort_by: "created_at",
        order: "desc",
    });

    const [searchParams] = useSearchParams();
    const term = searchParams.get("q");

    useEffect(() => {
        fetch(
            `https://nc-news-api-jqsh.onrender.com/api/articles?sort_by=${query.sort_by}&order=${query.order}`
        )
            .then((response) => response.json())
            .then((data) => {
                const filtered = data.articles.filter(
                    (article) =>
                        article.title
                            .toLowerCase()
                            .includes(term?.toLowerCase()) ||
                        article.author
                            .toLowerCase()
                            .includes(term?.toLowerCase()) ||
                        article.topic
                            .toLowerCase()
                            .includes(term?.toLowerCase())
                );
                setArticles(filtered);
            });
    });
    return (
        <div>
            <div className="topic-heading">
                <div>
                    <h2>Search results for: "{term}"</h2>
                </div>
                <Filter onChange={setQuery} />
            </div>
            {articles.length === 0 ? (
                <p>No articles found.</p>
            ) : (
                <ArticleList articles={articles} direction="column" />
            )}
        </div>
    );
};

export default SearchResults;
