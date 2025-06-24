import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import ArticlePage from "./ArticlePage";

const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/articles/:article_id" element={<ArticlePage />} />
        </Routes>
    );
};
export default Main;
