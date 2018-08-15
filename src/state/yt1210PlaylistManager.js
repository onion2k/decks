import { configure, decorate, observable, action, computed } from "mobx";
import queryString from "query-string";

configure({ enforceActions: true });

export default class yt12010PlaylistManager {

    // Playlists

    playlist = 1;
    track = 0;
    currentTrack = { videoId: "", label: "" };

    playlists = [
        { "id": 1, "title": "Playlist 1", tracks: [
            { title: "", videoId: "BuVJEn9wk9Y", duration: "" },
            { title: "", videoId: "Rs38lKxmtI4", duration: "" },
            { title: "", videoId: "v_yTphvyiPU", duration: "" },
            { title: "", videoId: "e4Ao-iNPPUc", duration: "" },
            { title: "", videoId: "FALYmqt-7TQ", duration: "" },
            { title: "", videoId: "a3Z4RWZa9WA", duration: "" }
        ]},
        { "id": 2, "title": "Playlist 2", tracks: [
            { title: "", videoId: "a3Z4RWZa9WA", duration: "" },
            { title: "", videoId: "BuVJEn9wk9Y", duration: "" },
            { title: "", videoId: "Rs38lKxmtI4", duration: "" },
            { title: "", videoId: "v_yTphvyiPU", duration: "" },
            { title: "", videoId: "e4Ao-iNPPUc", duration: "" },
            { title: "", videoId: "FALYmqt-7TQ", duration: "" }
        ]}
    ];

    get title() {
        return this.playlists.find((playlist) => playlist.id === this.playlist).title;
    };

    get tracks() {
        return this.playlists.find((playlist) => playlist.id === this.playlist).tracks.map((track)=>{
            let t = { videoId: track.videoId };
            let lsTrackDetails = localStorage.getItem("yt1210-" + track.videoId);
            if (lsTrackDetails) {
                let lsTrackDetailsJson = JSON.parse(lsTrackDetails);
                t.title = lsTrackDetailsJson.title.substr(0, 50);
                t.duration = lsTrackDetailsJson.duration;
            }
            return t;
        });
    };

    load = (id) => {
        this.playlist = id;
    };

    // add playlist
    playlistAdd = (title)=>{
        this.playlists.push({ id: this.playlists.length+1, title: title, tracks: [] });
    };

    // delete playlist
    playlistDelete = (index)=>{
        this.playlists.splice(index, 1);
    };

    // add track
    playlistAddTrack = (link)=>{
        const url = queryString.parse(link.substr(link.indexOf('?')));
        this.playlists.find((playlist) => playlist.id === this.playlist).tracks.push({ title: "", videoId: url.v, duration: "" });
    };

    // delete track
    playlistDeleteTrack = (id, index)=>{
        this.playlist = this.playlists.find((playlist) => playlist.id === id);
        this.playlist.tracks.splice(index, 1);
    };

    updateTrackData = (data, duration) => {
        const track = this.tracks.find((track)=>track.videoId === data.video_id);
              track.title = data.title;
              track.duration = duration;
        localStorage.setItem('yt1210-'+track.videoId, JSON.stringify({ title: track.title, duration: track.duration }));
        this.currentTrack = track;
    };

    getTracks = () => {
        return this.tracks;
    };

    getCurrentTrack = () => {
        return this.tracks[this.track];
    };

    getNextTrack = () => {
        return this.tracks[this.track++];
    };

    getTrackById = (id) => {
        this.track = this.tracks.findIndex((track) => track.videoId === id);
        return this.tracks[this.track];
    };
}

decorate(yt12010PlaylistManager, {
    currentTrack: observable,
    playlists: observable,
    playlist: observable,
    track: observable,
    title: computed,
    tracks: computed,
    load: action,
    playlistAdd: action,
    playlistDelete: action,
    playlistAddTrack: action,
    playlistDeleteTrack: action,
    updateTrackData: action,
    getCurrentTrack: action,
    getNextTrack: action
});
