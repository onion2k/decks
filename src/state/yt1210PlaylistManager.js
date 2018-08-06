import { configure, decorate, observable, action, computed } from "mobx";

configure({ enforceActions: true });

export default class yt12010PlaylistManager {

    // Playlists

    playlist = 1;
    current = 0;

    playlists = [
        { "id": 1, "title": "Playlist 1", tracks: [
          { title: "", videoId: "BuVJEn9wk9Y", duration: "" },
          { title: "", videoId: "Rs38lKxmtI4", duration: "" },
          { title: "", videoId: "v_yTphvyiPU", duration: "" },
          { title: "", videoId: "e4Ao-iNPPUc", duration: "" },
          { title: "", videoId: "FALYmqt-7TQ", duration: "" },
          { title: "", videoId: "a3Z4RWZa9WA", duration: "" }
        ]}
    ];

    load = action((id) => {
        this.playlist = id;
        const pl = this.playlists.find((playlist) => playlist.id === this.playlist).tracks;
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

    get tracks() {
        return this.playlists.find((playlist) => playlist.id === this.playlist).tracks;
    };

    updateTrackData = action((data, duration) => {
        const track = this.tracks.find((track)=>track.videoId === data.video_id);
        track.title = data.title;
        track.duration = duration;
    });

    getTracks = action(() => {
        return this.tracks;
    });

    getCurrentTrack = action(() => {
        return this.tracks[this.current];
    });

    getNextTrack = action(() => {
        return this.tracks[this.current++];
    });

}

decorate(yt12010PlaylistManager, {
    playlist: observable,
    tracks: computed,
    playlists: observable,
    load: action,
    playlistAdd: action,
    playlistDelete: action,
    playlistAddTrack: action,
    playlistDeleteTrack: action,
    updateTrackData: action,
    getCurrentTrack: action,
    getNextTrack: action
});