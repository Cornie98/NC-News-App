import ArticleCard from "./ArticleCard";
import "./ArticleList.css";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const ArticleList = ({ articles, direction = "row" }) => {
    const scrollRef = useRef(null);

    const scroll = (amount) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
        }
    };

    return (
        <div
            className={`article-list-wrapper ${direction === "column" ? "vertical" : ""}`}
        >
            {direction === "row" && (
                <button
                    className="scroll-button left"
                    onClick={() => scroll(-300)}
                >
                    <FaArrowLeft />
                </button>
            )}
            <ul
                ref={scrollRef}
                className={`article-list ${direction === "column" ? "vertical" : ""}`}
            >
                {articles.map((article) => (
                    <ArticleCard
                        key={article.article_id}
                        article={article}
                        direction={direction}
                    />
                ))}
            </ul>
            {direction === "row" && (
                <button
                    className="scroll-button right"
                    onClick={() => scroll(300)}
                >
                    <FaArrowRight />
                </button>
            )}
        </div>
    );
};
export default ArticleList;
