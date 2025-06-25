import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import ArticlePage from "./Articles/ArticlePage";
import TopicPage from "./TopicPage";

const Main = ({ topics }) => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/articles/:article_id" element={<ArticlePage />} />
            {topics.map((topic) => (
                <Route
                    key={topic.slug}
                    path={`/topics/${topic.slug}`}
                    element={<TopicPage topicSlug={topic.slug} />}
                />
            ))}
        </Routes>
    );
};
export default Main;
