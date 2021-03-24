import 'video.js/dist/video-js.min.css';
import videojs from 'video.js';
import RecordRTC from 'recordrtc';
import Record from 'videojs-record/dist/videojs.record.js';
import 'videojs-record/dist/css/videojs.record.css';
import {useEffect,useRef} from "react";
/*import {useState} from "react";*/

const MyCam = () => {

    const player = useRef(null);

    const stopFunc = () => {
        console.log(player.current.record().recordedData);
        player.current.record().stop();
        console.log(player.current.record().recordedData);
    };

    useEffect(()=>{
        let options = {
            // video.js options
            controls: true,
            bigPlayButton: false,
            loop: false,
            fluid: false,
            width: 320,
            height: 240,
            plugins: {
                // videojs-record plugin options
                record: {
                    image: false,
                    audio: false,
                    video: true,
                    maxLength: 1800,
                    displayMilliseconds: true,
                    debug: true
                }
            }
        };

        player.current = videojs('myCamera', options, function() {
            // print version information at startup
            const msg = 'Using video.js ' + videojs.VERSION + ' with videojs-record ' + videojs.getPluginVersion('record');
            videojs.log(msg);

            console.log("videojs-record is ready!");
        });

        let button = document.getElementsByClassName('StopAndSend')[0];
        button.addEventListener('click', stopFunc)
        //console.log(button);

        console.log(player.current);
        return ()=>{
            console.log('here download on server');
            stopFunc();
            player.current.dispose();
        };
    }, [])

    useEffect(()=>{
        if(player.current !== null){

            // error handling
            player.current.on('error', (element, error) => {
                console.error(error);
            });

            // device is ready
            player.current.on('deviceReady', () => {
                console.log('device is ready!');
                player.current.record().start();
            });

            // user clicked the record button and started recording
            player.current.on('startRecord', () => {
                console.log('started recording!');
            });

            // user completed recording and stream is available
            player.current.on('finishRecord', () => {
                // the blob object contains the recorded data that
                // can be downloaded by the user, stored on server etc.
                console.log('finished recording: ', player.current.recordedData);

                let data = player.current.recordedData;
                console.log(data);
                let serverUrl = 'http://localhost:5000/';
                let formData = new FormData();
                formData.append('file', data, data.name);

                console.log('uploading recording:', data.name);

                fetch(serverUrl, {
                    method: 'POST',
                    body: formData
                }).then(
                    success => console.log('recording upload complete.')
                ).catch(
                    error => console.error('an upload error occurred!')
                );
            });

            player.current.record().getDevice()
        }

    }, [player.current])

    return <div className="MyCam">
        сорэ
        {/*<button onClick={stopFunc}>stop</button>*/}
    </div>
}

export default MyCam;