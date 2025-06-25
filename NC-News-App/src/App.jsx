import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        fetch("https://nc-news-api-jqsh.onrender.com/api/topics")
            .then((response) => response.json())
            .then((data) => {
                setTopics(data.topics);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Header />
            <Sidebar topics={topics}>
                <Main topics={topics} />
            </Sidebar>
        </>
    );
}

export default App;
