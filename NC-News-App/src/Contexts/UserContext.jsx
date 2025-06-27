import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();
export const Users = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [usersError, setUsersError] = useState("");

    useEffect(() => {
        fetch("https://nc-news-api-jqsh.onrender.com/api/users")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.users);
                setAllUsers(data.users);
            })
            .catch((err) => {
                console.error(err);
                setUsersError("Cannot get users :(");
            });
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser, allUsers, usersError }}>
            {children}
        </UserContext.Provider>
    );
};
