import MyCam from "./MyCam";
import MyScreen from "./MyScreen";


function App() {

    /*const stopButton = <button className="StopAndSend" >stop and send</button>;
    console.log(stopButton);*/

    let hideVideo = {'display': 'none'};

    return (
        <div className="App">
            <header className="App-header">header</header>
            <video id="myCamera"
                   playsInline
                   className="video-js vjs-default-skin"
                   /*style={hideVideo}*/
            />
            <MyCam />
            <video id="myScreen"
                   playsInline
                   className="video-js vjs-default-skin"
                   /*style={hideVideo}*/
            />
            <MyScreen />
            <button className="StopAndSend" >stop and send</button>
        </div>
    );
}

export default App;
