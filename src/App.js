import React, { Component } from 'react';
import './App.css';

import { Howl } from 'howler';
import YouTube from 'react-youtube';

import Playlist from './Playlist.js';
import Record from './Record.js';

class App extends Component {

    constructor() {

        super();

        this.crackle = new Howl({ src: ['./crackle.ogg'], loop: true, autoplay: false, autoload: true});
        this.state = {
            playing: false,
            playlistPos: 0,
            trackData: {},
            playlist: ['_7qhdcaX8Q0','WEi9ZQrEjr8','3eYSUxoRc0U','qLrnkK2YEcE','MV_3Dpw-BRY','rDBbaGCCIhk'],
            videoId: '_7qhdcaX8Q0',
            autoplay: 0
        }

        this.onReady       = this.onReady.bind(this);
        this.onChangeVideo = this.onChangeVideo.bind(this);
        this.onPlay        = this.onPlay.bind(this);
        this.onEnd         = this.onEnd.bind(this);
        this.onPlayVideo   = this.onPlayVideo.bind(this);
        this.onPauseVideo  = this.onPauseVideo.bind(this);
        this.onStopVideo   = this.onStopVideo.bind(this);

    }

    onReady(event) {
        event.target.setVolume(100);
        let data = event.target.getVideoData();
        data.found = true;
        let tl = Object.assign({}, this.state.trackData);
        tl[this.state.videoId] = data;
        this.setState({
            player: event.target,
            vData: data,
            trackData: tl
        });
    }

    onChangeVideo(videoId) {
        var p = this.state.playlistPos;
        console.log(videoId)
        if (videoId!==undefined) { p = this.state.playlist.indexOf(videoId)-1; }
        if (p===this.state.playlist.length-1) { p = 0; } else { p++; }
        if (!this.crackle.playing()) { this.crackle.play() };
        this.setState({
            playlistPos: p,
            videoId: this.state.playlist[p],
            playing: true,
            autoplay: 1
        });
    }

    onPlay(event){
        let data = this.state.player.getVideoData();
        if (data.title!=='') {
            let tl = Object.assign({}, this.state.trackData);
            data.found = true;
            tl[this.state.videoId] = data;
            this.setState({ vData: data, playing: true, trackData: tl });    
        }
    }

    onEnd(event){
        this.onChangeVideo();
    }

    onPlayVideo() {
        this.crackle.play();
        this.state.player.playVideo();
    }

    onPauseVideo() {
        this.state.player.pauseVideo();
    }

    onStopVideo() {
        this.crackle.pause();
        this.setState({ playing: false });
        this.state.player.stopVideo();
    }

    render() {

        const opts = {
            height: '0',
            width: '0',
            playerVars: {
                controls: 0,
                autoplay: this.state.autoplay
            }
        }

        return (
            <div className="App">
                <Record vData={ this.state.vData } playing={ this.state.playing } />
                <div className="controls">
                    <h1>YT1210</h1>
                    <Playlist playlist={ this.state.playlist } trackData={ this.state.trackData } playing={ this.state.videoId } onClick={ (i)=>{ this.onChangeVideo(i); } }></Playlist>
                    <div className="buttons">
                        <div className='button' onClick={this.onPlayVideo}>Play</div>
                        <div className='button' onClick={this.onPauseVideo}>Pause</div>
                        <div className='button' onClick={this.onStopVideo}>Stop</div>
                        <div className='button' onClick={ ()=>{ this.onChangeVideo(); } }>Next</div>
                    </div>
                </div>
                <div className='video'>
                    <YouTube
                        videoId={ this.state.videoId }
                        opts={ opts }
                        onReady={ this.onReady }
                        onPlay={ this.onPlay }
                        onEnd={ this.onEnd }
                    />
                </div>
            </div>
        );
    }
}

export default App;
