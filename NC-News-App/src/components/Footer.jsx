const Footer = () => {
    return (
        <footer className="footer">
            <p>NC News, Inc. © 2025. All rights reserved.</p>
            <button
                className="back-to-top"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                Back to Top ↑
            </button>
        </footer>
    );
};

export default Footer;
