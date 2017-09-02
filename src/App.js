import React, { Component } from 'react';
import './App.css';

import ogg_crackle from './sounds/crackle.ogg';
import ogg_stylus from './sounds/stylus2.ogg';
import ogg_drag from './sounds/drag.ogg';

import { Howl } from 'howler';
import YouTube from 'react-youtube';

import Playlist from './Playlist.js';
import Record from './Record.js';

class App extends Component {

    constructor() {

        super();

        this.ogg_stylus = new Howl({ src: [ogg_stylus], loop: false, autoplay: false, autoload: true});
        this.ogg_crackle = new Howl({ src: [ogg_crackle], loop: true, autoplay: false, autoload: true});
        this.ogg_drag = new Howl({ src: [ogg_drag], loop: false, autoplay: false, autoload: true});
        
        this.state = {
            playing: false,
            playlistPos: 0,
            trackData: {},
            playlist: [
                { videoId: '_7qhdcaX8Q0', title: '', playing: false, duration: 0, found: false },
                { videoId: 'WEi9ZQrEjr8', title: '', playing: false, duration: 0, found: false },
                { videoId: '3eYSUxoRc0U', title: '', playing: false, duration: 0, found: false },
                { videoId: 'qLrnkK2YEcE', title: '', playing: false, duration: 0, found: false },
                { videoId: 'MV_3Dpw-BRY', title: '', playing: false, duration: 0, found: false },
                { videoId: 'rDBbaGCCIhk', title: '', playing: false, duration: 0, found: false },
                { videoId: '4qQyUi4zfDs', title: '', playing: false, duration: 0, found: false },
                { videoId: 'U4E60Ffa9yQ', title: '', playing: false, duration: 0, found: false },
                { videoId: 'KODWcrncnUU', title: '', playing: false, duration: 0, found: false },
                { videoId: '5Yv51XuFqPY', title: '', playing: false, duration: 0, found: false },
                { videoId: '9Z5NMHKY5PE', title: '', playing: false, duration: 0, found: false },

                { videoId: 'fczPlmz-Vug', title: '', playing: false, duration: 0, found: false },
                { videoId: 'cAe1lVDbLf0', title: '', playing: false, duration: 0, found: false },
                { videoId: 'u7K72X4eo_s', title: '', playing: false, duration: 0, found: false },
                { videoId: 'luM6oeCM7Yw', title: '', playing: false, duration: 0, found: false },
                { videoId: 'aqsL0QQaSP4', title: '', playing: false, duration: 0, found: false },
                { videoId: '-gj4_qp4a28', title: '', playing: false, duration: 0, found: false },
                { videoId: 'MMEpaVL_WsU', title: '', playing: false, duration: 0, found: false },
                { videoId: 'B9FzVhw8_bY', title: '', playing: false, duration: 0, found: false },
                { videoId: 'y-4ImbmZZp4', title: '', playing: false, duration: 0, found: false },
                { videoId: 'txBfhpm1jI0', title: '', playing: false, duration: 0, found: false }
                
            ],
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
        this.addTrack   = this.addTrack.bind(this);
        
    }

    onReady(event) {

        event.target.setVolume(100);

        let data = event.target.getVideoData();
        let duration = event.target.getDuration();
        let pl = this.state.playlist;
        let t = pl.findIndex((track)=>{ return track.videoId===this.state.videoId });
        pl[t].title = data.title;
        pl[t].duration = duration;
        pl[t].found = true;

        this.setState({
            player: event.target,
            vData: data,
            playlist: pl,
        });

    }

    onChangeVideo(videoId) {
        var p = this.state.playlistPos;
        if (videoId!==undefined) { p = this.state.playlist.findIndex((track)=>{ return track.videoId===videoId })-1; }
        if (p===this.state.playlist.length-1) { p = 0; } else { p++; }
        if (!this.ogg_crackle.playing()) { this.ogg_crackle.play() };
        //this.ogg_drag.play();
        this.setState({
            playlistPos: p,
            videoId: this.state.playlist[p].videoId,
            playing: true,
            autoplay: 1
        });
    }

    onPlay(event){
        let data = this.state.player.getVideoData();
        let duration = this.state.player.getDuration();
        if (data.title!=='') {

            let pl = this.state.playlist;
            let t = pl.findIndex((track)=>{ return track.videoId===this.state.videoId });
            pl[t].title = data.title;
            pl[t].duration = duration;
            pl[t].found = true;
    
            this.setState({ vData: data, playing: true, playlist: pl });

        }
    }

    onEnd(event){
        this.onChangeVideo();
    }

    onPlayVideo() {
        this.ogg_stylus.play();
        this.ogg_crackle.play();
        this.state.player.playVideo();
    }

    onPauseVideo() {
        this.state.player.pauseVideo();
    }

    onStopVideo() {
        this.ogg_crackle.pause();
        this.setState({ playing: false });
        this.state.player.stopVideo();
    }

    addTrack(state){
        let pl = this.state.playlist;
        pl.push({ videoId: state.newtrack, title: '', playing: false, duration: 0, found: false });
        this.setState({ playlist: pl });
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
                    <Playlist playlist={ this.state.playlist } trackData={ this.state.trackData } playing={ this.state.videoId } onClick={ (i)=>{ this.onChangeVideo(i); } } addTrack={ (videoId)=>{ this.addTrack(videoId); } }></Playlist>
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
