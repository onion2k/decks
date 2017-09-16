import React, { Component } from 'react';
import './PlaylistManager.css';

class PlaylistManager extends Component {

    constructor(){
        super();
        this.state = {
            playlists: [
                { playlistId: 1, title: 'Jazzy Triphop Volume 2' }
            ]
        }
    }

    render() {
        let playlists;

        if (this.state.playlists.length > 0) {
            playlists = this.state.playlists.map((playlist)=>{
                return <div 
                    key={ playlist.playlistId } 
                    className={ 'track'+(playlist.videoId===this.props.playing?' playing':'') }
                    onClick={ (e)=>this.props.onClick(playlist.playlistId) }
                ><i className="fa fa-trash" aria-hidden="true" onClick={ (e)=>{ e.stopPropagation(); this.props.onDelete(playlist.playlistId); } }></i> <i className="fa fa-list" aria-hidden="true"></i> { playlist.title }</div>;
            });
        } else {
            playlists = <div className='track'>No playlists found</div>;
        }
        
        return (
            <div className="PlaylistManager">
                { playlists }
            </div>
        );
    }
}

export default PlaylistManager;