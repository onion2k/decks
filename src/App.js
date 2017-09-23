import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import queryString from 'query-string';
import './App.css';

import { Howl } from 'howler';
import YouTube from 'react-youtube';

import ogg_crackle from './sounds/crackle.ogg';
import ogg_stylus from './sounds/stylus.ogg';
import ogg_scratchin from './sounds/scratchin.ogg';
import ogg_drag from './sounds/drag.ogg';

import Controls from './Components/Controls';
import Playlist from './Components/Playlist';
import Record from './Components/Record';
import Nav from './Components/Nav';
import About from './Components/About';

import PlaylistManager from './Components/PlaylistManager';

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

        this.playList      = this.playList.bind(this);
        this.addList       = this.addList.bind(this);
        this.deleteList    = this.deleteList.bind(this);
        
        this.ogg_stylus = new Howl({ src: [ogg_stylus], loop: false, autoplay: false, autoload: true});
        this.ogg_crackle = new Howl({ src: [ogg_crackle], loop: true, autoplay: false, autoload: true});
        this.ogg_drag = new Howl({ src: [ogg_drag], loop: false, autoplay: false, autoload: true, volume: 0.05});
        this.ogg_scratchin = new Howl({ src: [ogg_scratchin], loop: false, autoplay: false, autoload: true, volume: 0.5});

        let playlists;
        let plJson = localStorage.getItem('yt1210-playlists');
        if (!plJson) {
            playlists = [
                { playlistId: 1, title: 'Jazzy Triphop Volume 1', length: 0 },
                { playlistId: 2, title: 'Jazzy Triphop Volume 2', length: 0 },
                { playlistId: 3, title: 'Jazzy Triphop Volume 3', length: 0 },
                { playlistId: 4, title: 'Jazzy Triphop Volume 4', length: 0 },
                { playlistId: 5, title: 'Trance Volume 1', length: 0 },
                { playlistId: 6, title: 'Trance Volume 2', length: 0 },
                { playlistId: 7, title: 'Best of The Eagles', length: 0 },
                { playlistId: 8, title: 'No Repeat Sunday', length: 6 }
            ];
            localStorage.setItem('yt1210-playlists', JSON.stringify(playlists));
        } else {
            playlists = JSON.parse(plJson);
        }

        this.state = {
            playing: false,
            playlistPos: 0,
            trackData: {},
            playlist: [],
            videoId: null,
            autoplay: 0,
            crackle: true,
            video: true,
            repeat: false,
            shuffle: false,
            tonearmPos: null,
            playlists: playlists,
            playlistId: null
        }

    }

    componentWillMount(){

        let pl = this.updatePlaylist();
        const videoId = pl.length > 0 ? pl[0].videoId : null;

        this.setState({ playlist: pl, videoId: videoId});

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
    
        if (videoId!==undefined && videoId===this.state.videoId) {
            this.onPlayVideo(true);
        } else if (this.state.repeat===true && videoId===undefined) {
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
                this.ogg_scratchin.play();
            });

        } else {

            this.setState({
                playlistPos: tracknumber,
                videoId: this.state.playlist[tracknumber].videoId,
                playing: true,
                autoplay: 1,
                seekTo: percentage,
                tonearmPos: null
            }, ()=>{
                this.ogg_drag.play();                
            });

        }
        
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

    playList(playlistId){

        var p = this.state.playlists.findIndex((playlist)=>{ return playlist.playlistId===playlistId });

        this.setState({ playlistId: playlistId }, ()=>{
            let pl = this.updatePlaylist();
            const videoId = pl.length > 0 ? pl[0].videoId : null;
            this.setState({ playlistTitle: this.state.playlists[p].title, playlist: pl, videoId: videoId});
        });

    }

    addList(state){

        var newlist = state.newlist;
        var pl = this.state.playlists;

        pl.push({ playlistId: pl.length+1, title: newlist });

        this.setState({ playlists: pl });

        localStorage.setItem('yt1210-playlists', JSON.stringify(pl));
        
    }

    deleteList(playlistId) {

        localStorage.removeItem('yt1210-playlist-'+this.state.playlistId);
        
        var p = this.state.playlists.findIndex((playlist)=>{ return playlist.playlistId===playlistId });
        var pl = this.state.playlists;
        pl.splice(p, 1);

        //Handle deleting the currently playing list

        if (0===this.state.playlists.length) { 
            //p = null;
        }
        
        this.setState({
            playlists: pl
        });

        localStorage.setItem('yt1210-playlists', JSON.stringify(pl));
        
    }

    updatePlaylist(videoId) {

        let pl;

        if (window.location.hash) {
            let plHashList = window.location.hash.substr(1).split(',');
            pl = plHashList.map((videoId)=>{
                return { videoId: videoId, title: '', playing: false, duration: 0, found: false } 
            });
        } else {
            let plJson = localStorage.getItem('yt1210-playlist-'+this.state.playlistId);
            if (!plJson) {
                pl = [];
            } else {
                pl = JSON.parse(plJson);
            }    
        }

        if (videoId) {
            pl.push({ videoId: videoId, title: '', playing: false, duration: 0, found: false });
            localStorage.setItem('yt1210-playlist-'+this.state.playlistId, JSON.stringify(pl));
        }

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

        localStorage.setItem('yt1210-playlist-'+this.state.playlistId, JSON.stringify(pl));
        
    }
        
    render() {

        const opts = {
            width: '100%',
            playerVars: {
                controls: 0,
                autoplay: this.state.autoplay
            }
        }

        if (!this.state.video) {
            opts.height = '0px';
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
                    <Controls 
                        onPlayVideo={ this.onPlayVideo }
                        onPauseVideo={ this.onPauseVideo }
                        onStopVideo={ this.onStopVideo }
                        onChangeVideo={ this.onChangeVideo }
                        onToggle={ this.onToggle }
                        playing={ this.state.playing }
                        repeat={ this.state.repeat }
                        shuffle={ this.state.shuffle }
                        crackle={ this.state.crackle }
                        video={ this.state.video }
                    />
                    <Switch>
                        <Route path='/about' component={ About } />
                        <Route path='/playlists' component={ ()=>{
                            return <PlaylistManager 
                                playList={ this.playList }
                                addList={ this.addList }
                                deleteList={ this.deleteList }
                                playlists={ this.state.playlists }
                            />
                        } } />
                        <Route component={ ()=>{ 
                            return <Playlist 
                                title={ this.state.playlistTitle } 
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
