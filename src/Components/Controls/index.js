import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import './Controls.css';

class Controls extends Component {
    render() {

        let playlistsLink, playlistsIcon;

        if (window.location.pathname === '/playlists') {
            playlistsIcon = 'fa fa-music';
            playlistsLink = '/';   
        } else {
            playlistsIcon = 'fa fa-list';
            playlistsLink = '/playlists';
        }

        return (
        <div className="buttons">

            <Link to={ playlistsLink } className='button'><i className={ playlistsIcon } aria-hidden="true"></i></Link>

            <div className='button play' onClick={ (e)=>{
                this.props.yt1210Store.play(e);
                // this.props.onPlayVideo(e, true);
            }}><i className="fa fa-play" aria-hidden="true"></i></div>
            <div className='button' onClick={ (e)=>{ this.props.yt1210Store.pause(e); }}><i className="fa fa-pause" aria-hidden="true"></i></div>
            <div className='button' onClick={ (e)=>{ this.props.yt1210Store.stop(e); }}><i className="fa fa-stop" aria-hidden="true"></i></div>
            <div className='button' onClick={ (e)=>{ this.props.yt1210Store.next(e); }}><i className="fa fa-step-forward" aria-hidden="true"></i></div>

            <div className={'toggle'+(this.props.yt1210Store.repeat?' on':'')} onClick={ ()=>{ this.props.yt1210Store.repeat = !this.props.yt1210Store.repeat; }}><i className="fa fa-repeat" aria-hidden="true"></i></div>
            <div className={'toggle'+(this.props.yt1210Store.shuffle?' on':'')} onClick={ ()=>{ this.props.yt1210Store.shuffle = !this.props.yt1210Store.shuffle; }}><i className="fa fa-random" aria-hidden="true"></i></div>
            <div className={'toggle'+(this.props.yt1210Store.crackle?' on':'')} onClick={ ()=>{ this.props.yt1210Store.crackle = !this.props.yt1210Store.crackle; }}><i className="fa fa-headphones" aria-hidden="true"></i></div>
            <div className={'toggle'+(this.props.yt1210Store.video?' on':'')} onClick={ ()=>{ this.props.yt1210Store.video = !this.props.yt1210Store.video; }}><i className="fa fa-youtube" aria-hidden="true"></i></div>

        </div>
        );
    }
}

export default inject("yt1210Store")(observer(Controls));
