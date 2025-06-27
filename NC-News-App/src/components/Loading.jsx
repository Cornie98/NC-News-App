import TeaGif from "../assets/TeaGif.gif";
const Loading = () => {
    return (
        <div className="loading-page">
            <p className="loading-text">Please wait</p>
            <p className="loading-text">Your tea is brewing...</p>
            <img
                className="loading-img"
                src={TeaGif}
                alt="tea pour animation"
            />
        </div>
    );
};
export default Loading;
