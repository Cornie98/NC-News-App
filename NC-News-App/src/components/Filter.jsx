import { FaFilter } from "react-icons/fa";

const Filter = ({ onChange }) => {
    const handleSortChange = (e) => {
        const [sort_by, order] = e.target.value.split(",");
        onChange({ sort_by, order });
    };

    return (
        <div className="filter">
            <FaFilter title="Filter" />
            <select onChange={handleSortChange}>
                <option value="created_at,desc">Newest</option>
                <option value="created_at,asc">Oldest</option>
                <option value="votes,desc">Most Votes</option>
                <option value="votes,asc">Fewest Votes</option>
                <option value="comment_count,desc">Most Comments</option>
                <option value="comment_count,asc">Fewest Comments</option>
            </select>
        </div>
    );
};

export default Filter;
