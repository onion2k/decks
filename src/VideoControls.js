import React, { Component } from 'react';
import './VideoControls.css';

class VideoControls extends Component {

    render() {
        return (
        <div className="buttons">
            <div className='button' onClick={ ()=>{ this.props.onPlayVideo(true); }}>Play</div>
            <div className='button' onClick={ ()=>{ this.props.onPauseVideo(); }}>Pause</div>
            <div className='button' onClick={ ()=>{ this.props.onStopVideo(); }}>Stop</div>
            <div className='button' onClick={ ()=>{ this.props.onChangeVideo(); }}>Next</div>
        </div>
        );
    }
}

export default VideoControls;