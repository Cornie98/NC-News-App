import ArticleCard from "./ArticleCard";

const ArticleList = ({ articles }) => {
    return (
        <ul className="article-list">
            {articles.map((article) => (
                <ArticleCard key={article.article_id} article={article} />
            ))}
        </ul>
    );
};
export default ArticleList;
