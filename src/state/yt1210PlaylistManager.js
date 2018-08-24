import { configure, decorate, observable, action, computed } from "mobx";
import queryString from "query-string";

configure({ enforceActions: true });

export default class yt1210PlaylistManager {

    constructor(){
        console.log("init state store");
        this.user();
        this.playlist = "default-playlist";
        this.track = 0;
        this.currentTrack = { videoId: "", label: "" };
    }

    user = () => {
        const userdata = localStorage.getItem('yt1210-userdata');
        if (userdata) {
            this.userdata = JSON.parse(userdata);
        } else {
            this.userdata = {
                session: null,
                playlists: [{ "id": 'default-playlist', "title": "Welcome to Decks", tracks: [
                    { title: "", videoId: "Rs38lKxmtI4", duration: "" },
                    { title: "", videoId: "v_yTphvyiPU", duration: "" },
                    { title: "", videoId: "e4Ao-iNPPUc", duration: "" },
                    { title: "", videoId: "FALYmqt-7TQ", duration: "" },
                    { title: "", videoId: "BuVJEn9wk9Y", duration: "" },
                    { title: "", videoId: "a3Z4RWZa9WA", duration: "" }
                    ]
                }]
            }
            localStorage.setItem('yt1210-userdata', JSON.stringify(this.userdata));
        }
    }

    get title() {
        return this.userdata.playlists.find((playlist) => playlist.id === this.playlist).title;
    };

    get tracks() {
        return this.userdata.playlists.find((playlist) => playlist.id === this.playlist).tracks.map((track)=>{
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

    get playlists() {
        return this.userdata.playlists;
    };

    load = (id) => {
        this.playlist = id;
    };

    // add playlist
    playlistAdd = (title)=>{
        this.userdata.playlists.push({ id: this.playlists.length+1, title: title, tracks: [] });
    };

    // delete playlist
    playlistDelete = (index)=>{
        this.userdata.playlists.splice(index, 1);
    };

    // add track
    playlistAddTrack = (link)=>{

        // https://www.youtube.com/watch?v=-ZxPhDC-r3w

        const url = queryString.parse(link.substr(link.indexOf('?')));
        this.userdata.playlists.find((playlist) => playlist.id === this.playlist).tracks.push({ title: "", videoId: url.v, duration: "" });
        localStorage.setItem('yt1210-userdata', JSON.stringify(this.userdata));

    };

    // delete track
    playlistDeleteTrack = (id)=>{

        const index = this.userdata.playlists.find((playlist) => playlist.id === this.playlist).tracks.findIndex((track) => track.videoId === id);
        this.userdata.playlists.find((playlist) => playlist.id === this.playlist).tracks.splice(index, 1);
        localStorage.setItem('yt1210-userdata', JSON.stringify(this.userdata));

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

decorate(yt1210PlaylistManager, {
    userdata: observable,
    currentTrack: observable,
    playlist: observable,
    track: observable,
    title: computed,
    tracks: computed,
    playlists: computed,
    user: action,
    load: action,
    playlistAdd: action,
    playlistDelete: action,
    playlistAddTrack: action,
    playlistDeleteTrack: action,
    updateTrackData: action,
    getCurrentTrack: action,
    getNextTrack: action
});
