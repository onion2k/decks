import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import queryString from 'query-string';
import './App.css';

import ogg_crackle from './sounds/crackle.ogg';
import ogg_stylus from './sounds/stylus2.ogg';
import ogg_drag from './sounds/drag.ogg';

import { Howl } from 'howler';
import YouTube from 'react-youtube';

import VideoControls from './VideoControls.js';
import Playlist from './Playlist.js';
import Record from './Record.js';
import Nav from './Nav.js';

import About from './About.js';

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
        this.onDeleteVideo = this.onDeleteVideo.bind(this);
        this.onToggle      = this.onToggle.bind(this);
        
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
            repeat: false,
            shuffle: false,
            tonearmPos: null
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

        vData.tonearmPos = this.state.tonearmPos; 
        
        this.setState({
            player: event.target,
            vData: vData,
            playlist: pl,
            tonearmPos: null
        });

    }

    onChangeVideo(videoId) {

        var p = this.state.playlistPos;

        if (videoId!==undefined) { p = this.state.playlist.findIndex((track)=>{ return track.videoId===videoId })-1; }
        if (!this.ogg_crackle.playing() && this.state.crackle===true) { this.ogg_crackle.play() };
        
        if (this.state.repeat===true && videoId===undefined) {
            this.state.player.playVideo();
        } else if (this.state.shuffle===true && videoId===undefined) {
            let np = p;
            while (p===np) {
                p = Math.floor(Math.random() * this.state.playlist.length);
            }
            this.setState({
                playlistPos: p,
                videoId: this.state.playlist[p].videoId,
                playing: true,
                autoplay: 1,
                tonearmPos: p
            });                
        } else {
            if (p===this.state.playlist.length-1) { p = 0; } else { p++; }
            this.setState({
                playlistPos: p,
                videoId: this.state.playlist[p].videoId,
                playing: true,
                autoplay: 1,
                tonearmPos: p
            });
        }

    }

    onDeleteVideo(videoId) {

        var p = this.state.playlist.findIndex((track)=>{ return track.videoId===videoId });
        var pl = this.state.playlist;
        pl.splice(p, 1);

        if (0===this.state.playlist.length) { this.onStopVideo(); p = null; }
        if (p===this.state.playlist.length) { p = 0; }
        
        this.setState({
            playlist: pl,
            playlistPos: p,
            videoId: (p===null) ? null : this.state.playlist[p].videoId,
            playing: (p===null) ? false : true,
            autoplay: (p===null) ? 0 : 1
        });

        localStorage.setItem('yt1210-playlist', JSON.stringify(pl));
        
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

        if (this.state.seekTo) {
            this.state.player.seekTo( (pl[t].duration/100)*this.state.seekTo, true );
        }
            
        this.setState({ 
            vData: vData, 
            playing: true, 
            playlist: pl, 
            seekTo: false
        });

    }

    onEnd(event){
        this.onChangeVideo();
    }

    onToggle(toggle){
        let s = {};
        s[toggle] = !this.state[toggle];
        this.setState(s, ()=>{
            if (toggle==='crackle') {
                if (!this.ogg_crackle.playing() && this.state.crackle===true && this.state.playing===true) { 
                    this.ogg_crackle.play(); 
                } else {
                    this.ogg_crackle.stop(); 
                };
            }
        });

    }

    onPlayVideo(moveArm) {

        let pl = this.state.playlist;
        let t = pl.findIndex((track)=>{ return track.videoId===this.state.videoId });

        this.ogg_stylus.play();
        this.state.player.playVideo();
        if (!this.ogg_crackle.playing() && this.state.crackle===true) { this.ogg_crackle.play() };

        if (moveArm) {
            this.setState({ tonearmPos: t });
        }

    }

    onPauseVideo() {
        this.state.player.pauseVideo();
    }

    onStopVideo() {
        this.ogg_crackle.pause();
        this.setState({ playing: false });
        this.state.player.stopVideo();
    }

    onTrack(tracknumber, percentage) {

        if (tracknumber > this.state.playlist.length-1) { return; }

        var next = this.state.playlist[tracknumber].videoId;

        if (this.state.videoId === next) {

            this.setState({
                playing: true,
                autoplay: 1,
                seekTo: percentage,
                tonearmPos: null
            }, ()=>{
                this.onPlayVideo();
            });

        } else {

            this.setState({
                playlistPos: tracknumber,
                videoId: this.state.playlist[tracknumber].videoId,
                playing: true,
                autoplay: 1,
                seekTo: percentage,
                tonearmPos: null
            });

        }
        
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

        let playlistHash = pl.map((track)=>{ return track.videoId}).join(',');
        window.location.hash = playlistHash;

    }

    updatePlaylist(videoId) {

        let pl;

        if (window.location.hash) {
            let plHashList = window.location.hash.substr(1).split(',');
            pl = plHashList.map((videoId)=>{
                return { videoId: videoId, title: '', playing: false, duration: 0, found: false } 
            });
        } else {
            let plJson = localStorage.getItem('yt1210-playlist');
            if (!plJson) {
                pl = [];
            } else {
                pl = JSON.parse(plJson);
            }    
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
                <Record 
                    onTrack={this.onTrack} 
                    vData={ this.state.vData } 
                    playing={ this.state.playing }
                    tonearmPos={ this.state.tonearmPos } 
                />
                <div className="controls">
                    <div className="titleControls">
                        <h1>YT1210</h1>
                        <Nav></Nav>
                    </div>
                    <YouTube
                        videoId={ this.state.videoId }
                        opts={ opts }
                        onReady={ this.onReady }
                        onPlay={ this.onPlay }
                        onEnd={ this.onEnd }
                    />
                    <VideoControls 
                        onPlayVideo={ this.onPlayVideo }
                        onPauseVideo={ this.onPauseVideo }
                        onStopVideo={ this.onStopVideo }
                        onChangeVideo={ this.onChangeVideo }
                        onToggle={ this.onToggle }
                        playing={ this.state.playing }
                        repeat={ this.state.repeat }
                        shuffle={ this.state.shuffle }
                        crackle={ this.state.crackle }
                    />
                    <Switch>
                        <Route path='/about' component={ About } />
                        <Route component={ ()=>{ 
                            return <Playlist 
                                playlist={ this.state.playlist } 
                                trackData={ this.state.trackData } 
                                playing={ this.state.videoId } 
                                onClick={ (i)=>{ this.onChangeVideo(i); } } 
                                onDelete={ (i)=>{ this.onDeleteVideo(i); } } 
                                addTrack={ (videoId)=>{ this.addTrack(videoId); } }
                            ></Playlist> } } />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
