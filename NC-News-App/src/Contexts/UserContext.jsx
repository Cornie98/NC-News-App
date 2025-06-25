import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();
export const Users = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        fetch("https://nc-news-api-jqsh.onrender.com/api/users")
            .then((res) => res.json())
            .then((data) => setAllUsers(data.users))
            .catch((err) => console.error(err));
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser, allUsers }}>
            {children}
        </UserContext.Provider>
    );
};
