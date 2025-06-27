import { useState, useEffect } from "react";
import "./App.css";
import { Users } from "./Contexts/UserContext";
import Header from "./components/Header";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

function App() {
    const [topics, setTopics] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("https://nc-news-api-jqsh.onrender.com/api/topics")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTopics(data.topics);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Users>
                <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Sidebar topics={topics}>
                    <Main topics={topics} searchTerm={searchTerm} />
                </Sidebar>
            </Users>
            <Footer />
        </>
    );
}

export default App;
