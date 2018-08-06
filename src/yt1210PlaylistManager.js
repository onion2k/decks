import { configure, decorate, observable, action, autorun } from "mobx";

export default class yt12010PlaylistManager {

    // Playlists

    playlist = [];

    playlists = [
        { "id": 1, "title": "Playlist 1", tracks: [
          { title: "", videoId: "BuVJEn9wk9Y", duration: "" },
          { title: "", videoId: "Rs38lKxmtI4", duration: "" },
          { title: "", videoId: "v_yTphvyiPU", duration: "" },
          { title: "", videoId: "e4Ao-iNPPUc", duration: "" },
          { title: "", videoId: "FALYmqt-7TQ", duration: "" },
          { title: "", videoId: "a3Z4RWZa9WA", duration: "" }
        ]},
        { "id": 2, "title": "Playlist 2", tracks: [0,1,2,3,4,5] },
        { "id": 3, "title": "Playlist 3", tracks: [0,1,2,3,4,5] },
        { "id": 4, "title": "Playlist 4", tracks: [0,1,2,3,4,5] }
    ];

    load = action((id) => {
        this.playlist = this.playlists.find((playlist) => playlist.id === id).tracks;
        this.videoId = this.playlist[0].videoId;
        this.playing = true;
    });

    // add playlist
    playlistAdd = action((title)=>{
        this.playlists.push({ id: this.playlists.length+1, title: title, tracks: [] });
    });

    // delete playlist
    playlistDelete = action((index)=>{
        this.playlists.splice(index, 1);
    });

    // add track
    playlistAddTrack = action((id, videoId)=>{
        this.playlist = this.playlists.find((playlist) => playlist.id === id);
        this.playlist.tracks.push({ title: "", videoId: videoId, duration: "" });
    });

    // delete track
    playlistDeleteTrack = action((id, index)=>{
        this.playlist = this.playlists.find((playlist) => playlist.id === id);
        this.playlist.tracks.splice(index, 1);
    });

    updateTrackData = action((data, duration) => {

    });

}

decorate(yt12010PlaylistManager, {
    playlist: observable,
    playlists: observable,
    load: action,
    playlistAdd: action,
    playlistDelete: action,
    playlistAddTrack: action,
    playlistDeleteTrack: action,
    updateTrackData: action
});