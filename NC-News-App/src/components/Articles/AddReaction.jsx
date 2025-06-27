import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { MdOutlineAddReaction } from "react-icons/md";
import "./AddReaction.css";

const emojis = [
    "😀",
    "😂",
    "😍",
    "👍",
    "🎉",
    "😢",
    "😡",
    "🤔",
    "👀",
    "🔥",
    "💩",
    "🐱",
];

const AddReaction = ({ article, setReactions }) => {
    const { user } = useContext(UserContext);
    const [isPosting, setIsPosting] = useState(false);
    const [error, setError] = useState(null);
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleEmojiClick = (emoji) => {
        if (!user) return;
        setIsPosting(true);
        setError(null);
        setShowPicker(false);

        setReactions((prevReactions) => {
            const existing = prevReactions.find((r) => r.emoji === emoji);
            if (existing) {
                return prevReactions.map((r) =>
                    r.emoji === emoji ? { ...r, count: Number(r.count) + 1 } : r
                );
            } else {
                return [...prevReactions, { emoji, count: 1 }];
            }
        });

        fetch(
            `https://nc-news-api-jqsh.onrender.com/api/articles/${article.article_id}/emojis`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user.username, emoji }),
            }
        )
            .then((res) => {
                if (!res.ok) throw new Error("Failed to post reaction");
            })
            .catch(() => {
                setReactions((prevReactions) => {
                    const existing = prevReactions.find(
                        (r) => r.emoji === emoji
                    );
                    if (!existing) return prevReactions;

                    if (existing.count === 1) {
                        return prevReactions.filter((r) => r.emoji !== emoji);
                    } else {
                        return prevReactions.map((r) =>
                            r.emoji === emoji
                                ? { ...r, count: Number(r.count) - 1 }
                                : r
                        );
                    }
                });
                setError("Failed to add reaction :(");
            })
            .finally(() => setIsPosting(false));
    };

    return (
        <div className="add-reaction-wrapper">
            {error && (
                <p className={`error-text ${error ? "show" : ""}`}>{error}</p>
            )}
            {user && (
                <button
                    className="add-reaction-button"
                    onClick={() => setShowPicker((prev) => !prev)}
                    disabled={!user || isPosting}
                >
                    <MdOutlineAddReaction />
                </button>
            )}

            {showPicker && (
                <div className="emoji-picker-grid">
                    {emojis.map((emoji) => (
                        <button
                            key={emoji}
                            onClick={() => handleEmojiClick(emoji)}
                            className="emoji-button"
                            aria-label={`Add reaction ${emoji}`}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddReaction;
