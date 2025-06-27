import { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import Homepage from "./Homepage";
import ArticlePage from "./Articles/ArticlePage";
import TopicPage from "./Topics/TopicPage";
import Topics from "./Topics/Topics";
import UserProfile from "./UserProfile";
import ErrorPage from "./ErrorPage";
import SearchResults from "./Search/SearchResults";
import AddPost from "./AddPost";

const Main = ({ topics }) => {
    const { user } = useContext(UserContext);
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/articles/:article_id" element={<ArticlePage />} />
            {topics.map((topic) => (
                <Route
                    key={topic.slug}
                    path={`/topics/${topic.slug}`}
                    element={<TopicPage topic={topic} />}
                />
            ))}
            <Route path="/topics" element={<Topics topics={topics} />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/post" element={<AddPost topics={topics} />} />
            <Route path="/*" element={<ErrorPage />} />
        </Routes>
    );
};
export default Main;
