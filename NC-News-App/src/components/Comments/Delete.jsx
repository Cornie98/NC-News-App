import { useState } from "react";
import { GoTrash } from "react-icons/go";

const Delete = ({ commentId, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDelete = async () => {
        if (isDeleting) return;
        const confirmDelete = confirm(
            "Are you sure you want to delete your comment?"
        );
        if (!confirmDelete) return;
        setIsDeleting(true);

        try {
            const response = await fetch(
                `https://nc-news-api-jqsh.onrender.com/api/comments/${commentId}`,
                { method: "DELETE" }
            );
            if (!response.ok) throw new Error("Couldn't delete comment");
            if (onDelete) onDelete(commentId);
        } catch (err) {
            console.error(err);
            alert("Failed to delete comment.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="delete-button"
            disabled={isDeleting}
            title={isDeleting ? "Deleting..." : "Delete comment"}
        >
            <GoTrash />
        </button>
    );
};

export default Delete;
