import catLogo from "../assets/cat-tea.svg";

const Header = () => {
    return (
        <div className="header">
            <div className="header-left">
                <img src={catLogo} alt="Cat Logo" className="logo" />
                <h1 className="title">NC News</h1>
            </div>
            <form className="search-form">
                <input type="text" placeholder="Search..." />
            </form>
        </div>
    );
};

export default Header;
