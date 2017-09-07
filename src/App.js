import React, { Component } from 'react';
import queryString from 'query-string';
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

        this.onReady       = this.onReady.bind(this);
        this.onChangeVideo = this.onChangeVideo.bind(this);
        this.onPlay        = this.onPlay.bind(this);
        this.onEnd         = this.onEnd.bind(this);
        this.onPlayVideo   = this.onPlayVideo.bind(this);
        this.onPauseVideo  = this.onPauseVideo.bind(this);
        this.onStopVideo   = this.onStopVideo.bind(this);
        this.onTrack       = this.onTrack.bind(this);
        this.addTrack      = this.addTrack.bind(this);
        this.updatePlaylist = this.updatePlaylist.bind(this);
        this.updateCrackle = this.updateCrackle.bind(this);
        this.updateRepeat  = this.updateRepeat.bind(this);
        
        this.ogg_stylus = new Howl({ src: [ogg_stylus], loop: false, autoplay: false, autoload: true});
        this.ogg_crackle = new Howl({ src: [ogg_crackle], loop: true, autoplay: false, autoload: true});
        this.ogg_drag = new Howl({ src: [ogg_drag], loop: false, autoplay: false, autoload: true});

        let pl = this.updatePlaylist();
        const videoId = pl.length > 0 ? pl[0].videoId : null;

        this.state = {
            playing: false,
            playlistPos: 0,
            trackData: {},
            playlist: pl,
            videoId: videoId,
            autoplay: 0,
            crackle: true,
            repeat: false
        }

    }

    onReady(event) {

        event.target.setVolume(100);

        let vData;
        let pl = this.state.playlist;
        let t = pl.findIndex((track)=>{ return track.videoId===this.state.videoId });

        if (pl[t] && pl[t].found===true) {

            vData = { videoId: pl[t].videoId, title: pl[t].title };
            
        } else if (pl[t] && pl[t].found===false) {

            let data = event.target.getVideoData();
            let duration = event.target.getDuration();

            pl[t].title = data.title.substr(0, 50);
            pl[t].duration = duration;
            pl[t].found = true;
    
            localStorage.setItem('yt1210-'+pl[t].videoId, JSON.stringify({ title: data.title, duration: duration }));

            vData = pl[t];

        } else {

            vData = { videoId: null, title: '' };

        }

        this.setState({
            player: event.target,
            vData: vData,
            playlist: pl,
        });

    }

    onChangeVideo(videoId) {

        var p = this.state.playlistPos;

        if (videoId!==undefined) { p = this.state.playlist.findIndex((track)=>{ return track.videoId===videoId })-1; }
        if (!this.ogg_crackle.playing() && this.state.crackle===true) { this.ogg_crackle.play() };
        
        if (this.state.repeat===true && videoId===undefined) {

            this.state.player.playVideo();

        } else {

            if (p===this.state.playlist.length-1) { p = 0; } else { p++; }

            this.setState({
                playlistPos: p,
                videoId: this.state.playlist[p].videoId,
                playing: true,
                autoplay: 1
            });
    
        }

    }

    onPlay(event){

        let vData;
        let pl = this.state.playlist;
        let t = pl.findIndex((track)=>{ return track.videoId===this.state.videoId });

        if (pl[t] && pl[t].found===true) {

            vData = { videoId: pl[t].videoId, title: pl[t].title };

        } else if (pl[t] && pl[t].found===false) {

            let data = this.state.player.getVideoData();
            let duration = this.state.player.getDuration();

            if (data.title!=='') {
                
                pl[t].title = data.title.substr(0, 50);
                pl[t].duration = duration;
                pl[t].found = true;
        
                localStorage.setItem('yt1210-'+pl[t].videoId, JSON.stringify({ title: data.title, duration: duration }));
            
            }

            vData = pl[t];
            
        } else {

            vData = { videoId: null, title: '' };

        }

        this.setState({ vData: vData, playing: true, playlist: pl });
        
    }

    onEnd(event){
        this.onChangeVideo();
    }

    onPlayVideo() {
        this.ogg_stylus.play();
        if (this.state.crackle===true) { this.ogg_crackle.play(); }
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

    onTrack(tracknumber) {

        this.setState({
            playlistPos: tracknumber,
            videoId: this.state.playlist[tracknumber].videoId,
            playing: true,
            autoplay: 1
        });

    }

    addTrack(state){

        var newtrack;

        if (state.newtrack.length === 11) {
            newtrack = state.newtrack;
        } else {
            const url = queryString.parse(state.newtrack.substr(state.newtrack.indexOf('?')));
            newtrack = url.v;
        }

        let pl = this.updatePlaylist(newtrack);

        this.setState({ playlist: pl }, ()=>{this.onChangeVideo(newtrack)});

    }

    updateCrackle() {
        let c = this.state.crackle;        
        if (c===true) { this.ogg_crackle.stop(); } else if (this.state.playing===true) { this.ogg_crackle.play(); }
        this.setState({ crackle: !c });
    }

    updateRepeat() {
        let r = this.state.repeat;
        this.setState({ repeat: !r });
    }


    updatePlaylist(videoId) {

        let pl;
        let plJson = localStorage.getItem('yt1210-playlist');

        if (!plJson) {
            pl = [];            
        } else {
            pl = JSON.parse(plJson);
        }

        if (videoId) {
            pl.push({ videoId: videoId, title: '', playing: false, duration: 0, found: false });
        }

        localStorage.setItem('yt1210-playlist', JSON.stringify(pl));

        pl.forEach((track)=>{
            var lsPlDetails = localStorage.getItem('yt1210-'+track.videoId);
            if (lsPlDetails){
                let lsPlDetailsJson = JSON.parse(lsPlDetails);
                track.title = lsPlDetailsJson.title.substr(0, 50);
                track.duration = lsPlDetailsJson.duration;
                track.found = true;
            }
        });

        return pl;

    }    

    render() {

        const opts = {
            width: '100%',
            playerVars: {
                controls: 0,
                autoplay: this.state.autoplay
            }
        }

        return (
            <div className="App">
                <Record onTrack={this.onTrack} vData={ this.state.vData } playing={ this.state.playing } />
                <div className="controls">
                    <div className="titleControls">
                        <h1>YT1210</h1>
                        <div className="yt1210Controls">
                            <label>Crackle <input type="checkbox" checked={ this.state.crackle } onChange={ this.updateCrackle } /></label>
                        </div>
                    </div>
                    <div className="buttons">
                        <div className='button' onClick={this.onPlayVideo}>Play</div>
                        <div className='button' onClick={this.onPauseVideo}>Pause</div>
                        <div className='button' onClick={this.onStopVideo}>Stop</div>
                        <div className='button' onClick={ ()=>{ this.onChangeVideo(); } }>Next</div>
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
                    <Playlist playlist={ this.state.playlist } trackData={ this.state.trackData } playing={ this.state.videoId } onClick={ (i)=>{ this.onChangeVideo(i); } } addTrack={ (videoId)=>{ this.addTrack(videoId); } }></Playlist>
                    <div className="repeat">
                        <label>Repeat <input type="checkbox" checked={ this.state.repeat } onChange={ this.updateRepeat } /></label>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
