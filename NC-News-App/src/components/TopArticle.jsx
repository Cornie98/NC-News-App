const TopArticle = ({ article }) => {
    if (!article) return null;

    return (
        <div className="top-article">
            <h3>{article.title}</h3>
            <p>
                <strong>Author:</strong> {article.author}
            </p>
            <img src={article.article_img_url} alt="" />
            <p>
                <strong>Votes:</strong> {article.votes}
            </p>
        </div>
    );
};

export default TopArticle;
