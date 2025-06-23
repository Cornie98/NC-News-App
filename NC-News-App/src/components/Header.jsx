import catLogo from "../assets/cat-tea.svg";

const Header = () => {
    return (
        <div className="header">
            <img src={catLogo} alt="Cat Logo" className="logo" />
            <h1 className="title">NC News</h1>
        </div>
    );
};

export default Header;
