import React, { Component } from 'react';
import './PlaylistManager.css';

class PlaylistManager extends Component {

    constructor(props){
        super(props);
        this.state = {
            playlists: props.playlists
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
                ><i className="fa fa-trash" aria-hidden="true" onClick={ (e)=>{ e.stopPropagation(); this.props.onDelete(playlist.playlistId); } }></i> <i className="fa fa-list" aria-hidden="true"></i> { playlist.title } <span>{ playlist.tracks || 'Empty' }</span></div>;
            });
        } else {
            playlists = <div className='track'>No playlists found</div>;
        }
        
        return (
            <div className="PlaylistManager">
                <form className="NewTrack">
                    <label>
                        New List:
                        <input type="text" value={ this.state.newtrack } onChange={ this.handleChange } />
                    </label>
                    <button onClick={ this.onSubmit }>Add List</button>
                </form>
                <div className='Playlist'>
                    { playlists }
                </div>
            </div>
        );
    }
}

export default PlaylistManager;