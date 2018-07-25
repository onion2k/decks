import React, { Component } from 'react';
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

            <div className='button play' onClick={ ()=>{ this.props.onPlayVideo(true); }}><i className="fa fa-play" aria-hidden="true"></i></div>
            <div className='button' onClick={ ()=>{ this.props.onPauseVideo(); }}><i className="fa fa-pause" aria-hidden="true"></i></div>
            <div className='button' onClick={ ()=>{ this.props.onStopVideo(); }}><i className="fa fa-stop" aria-hidden="true"></i></div>
            <div className='button' onClick={ ()=>{ this.props.onChangeVideo(); }}><i className="fa fa-step-forward" aria-hidden="true"></i></div>

            <div className={'toggle'+(this.props.repeat?' on':'')} onClick={ ()=>{ this.props.onToggle('repeat'); }}><i className="fa fa-repeat" aria-hidden="true"></i></div>
            <div className={'toggle'+(this.props.shuffle?' on':'')} onClick={ ()=>{ this.props.onToggle('shuffle'); }}><i className="fa fa-random" aria-hidden="true"></i></div>
            <div className={'toggle'+(this.props.crackle?' on':'')} onClick={ ()=>{ this.props.onToggle('crackle'); }}><i className="fa fa-headphones" aria-hidden="true"></i></div>
            <div className={'toggle'+(this.props.video?' on':'')} onClick={ ()=>{ this.props.onToggle('video'); }}><i className="fa fa-youtube" aria-hidden="true"></i></div>

        </div>
        );
    }
}

export default Controls;