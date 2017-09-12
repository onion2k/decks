import React, { Component } from 'react';
import './VideoControls.css';

class VideoControls extends Component {

    render() {
        return (
        <div className="buttons">
            <div className='button play' onClick={ ()=>{ this.props.onPlayVideo(true); }}><i className="fa fa-play" aria-hidden="true"></i></div>
            <div className='button' onClick={ ()=>{ this.props.onPauseVideo(); }}><i className="fa fa-pause" aria-hidden="true"></i></div>
            <div className='button' onClick={ ()=>{ this.props.onStopVideo(); }}><i className="fa fa-stop" aria-hidden="true"></i></div>
            <div className='button' onClick={ ()=>{ this.props.onChangeVideo(); }}><i className="fa fa-step-forward" aria-hidden="true"></i></div>

            <div className={'toggle'+(this.props.repeat?' on':'')} onClick={ ()=>{ this.props.onToggle('repeat'); }}><i className="fa fa-repeat" aria-hidden="true"></i></div>
            <div className={'toggle'+(this.props.shuffle?' on':'')} onClick={ ()=>{ this.props.onToggle('shuffle'); }}><i className="fa fa-random" aria-hidden="true"></i></div>
            <div className={'toggle'+(this.props.crackle?' on':'')} onClick={ ()=>{ this.props.onToggle('crackle'); }}><i className="fa fa-headphones" aria-hidden="true"></i></div>

        </div>
        );
    }
}

export default VideoControls;