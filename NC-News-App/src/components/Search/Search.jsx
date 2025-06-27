import { useNavigate } from "react-router-dom";
const Search = ({ searchTerm, setSearchTerm }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${searchTerm}`);
            setSearchTerm("");
        }
    };
    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="🔎 Search NC News..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
    );
};

export default Search;
