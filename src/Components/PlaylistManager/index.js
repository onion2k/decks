import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';

class PlaylistManager extends Component {

    constructor(props){
        super(props);

        this.state = {
            newlist: '',
            playlists: props.playlists
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({newlist: event.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        this.props.addList(this.state);
        this.props.playlistStore.playlistToggle = !this.props.playlistStore.playlistToggle;
        this.props.playlistStore.playlists.push('New list');
    }

    render() {
        let playlists;

        if (this.state.playlists.length > 0) {
            playlists = this.state.playlists.map((playlist)=>{
                return <div 
                    key={ playlist.playlistId } 
                    className={ 'track' }
                    onClick={ (e)=>{
                        this.props.playList(playlist.playlistId); 
                        // this.props.history.push('/');
                    } }><i className="fa fa-trash" aria-hidden="true" onClick={ (e)=>{
                        e.stopPropagation();
                        e.preventDefault();
                        this.props.deleteList(playlist.playlistId);
                    } }></i> <i className="fa fa-list" aria-hidden="true"></i> { playlist.title } <span>{ playlist.length || 'No' } tracks</span></div>;
            });
        } else {
            playlists = <div className='track'>No playlists found</div>;
        }
        
        return (
            <div className="PlaylistManager">
                <div className="PlaylistTitle">
                    <span>Your playlists</span>
                </div>
                <div className='Playlist'>
                    { playlists }
                </div>
                <form className="NewTrack">
                    <label>
                        New List:
                        <input type="text" value={ this.state.newlist } onChange={ this.handleChange } />
                    </label>
                    <button onClick={ this.onSubmit }>Add List</button>
                </form>
            </div>
        );
    }
}

export default withRouter(inject("playlistStore")(observer(PlaylistManager)));
