import './Background.css'

function Background() {
    return (
        <div className="Background" id="outer-container">
            <Navigation pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id="page-wrap">
                <h1>test</h1>
            </div>
        </div>
    );
}

export default Background;