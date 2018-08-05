import { configure, decorate, observable, action, autorun } from "mobx";

import fx from "./yt1210Sounds";

configure({ enforceActions: true });

class yt1210Store {
  
  playlist = [];

  videoId = null;

  playing = false;
  repeat = false;
  shuffle = false;
  crackle = true;
  video = true;

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

  tracks = [
    { title: "", videoId: "v_yTphvyiPU", duration: "" },
    { title: "", videoId: "Rs38lKxmtI4", duration: "" },
    { title: "", videoId: "BuVJEn9wk9Y", duration: "" },
    { title: "", videoId: "e4Ao-iNPPUc", duration: "" },
    { title: "", videoId: "FALYmqt-7TQ", duration: "" },
    { title: "", videoId: "a3Z4RWZa9WA", duration: "" }
  ];

  // playlist actions

  // load playlist
  load = action((id) => {
    this.playlist = this.playlists.find((playlist) => playlist.id === id).tracks;
    this.videoId = this.playlist[0].videoId;
    this.playing = true;
  });

  // add playlist

  playlistAdd = action((title)=>{
    this.playlists.push({ id: this.playlists.length+1, title: title, tracks: [] });
  });

  // add track
  playlistAddTrack = action((id, videoId)=>{
    this.playlist = this.playlists.find((playlist) => playlist.id === id);
    this.playlist.tracks.push({ title: "", videoId: videoId, duration: "" });
  });

  // delete playlist
  playlistAddTrack = action((index)=>{
    this.playlists.splice(index, 1);
  }

  // delete track
  playlistDeleteTrack = action((id, index)=>{
    this.playlist = this.playlists.find((playlist) => playlist.id === id);
    this.playlist.tracks.splice(index, 1);
  });

  updateTrackData = action((data, duration) => {

  });

  // play track
  play = action(() => {
    // set videoId
    this.videoId = "v_yTphvyiPU";
    this.playing = true;

    // play stylus fx
    // if crackle and crackle is not playing, play crackle fx
  });

  // pause track
  pause = action(() => {
    this.playing = !this.playing;
    // if crackle, pause crackle fx
  });

  // stop track
  stop = action(() => {
    console.log("stop");
    this.playing = false;
  });

  // next track
  next = action(() => {
    console.log("next");
    this.videoId = "Rs38lKxmtI4";
    // play scratchin fx

    // if skip, play drag fx
  });

  // copy playlist from youtube

  onToggle_repeat = autorun(() => {
    if (this.repeat) {
      fx.ogg_scratchin.play();
    } else {
      console.log("no repeat");
    }
  });

  onToggle_shuffle = autorun(() => {
    if (this.shuffle) {
      console.log("shuffle");
    } else {
      console.log("no shuffle");
    }
  });

  onToggle_crackle = autorun(() => {
    if (!this.crackle && this.playing) {
      console.log("Crackling");
    } else {
      console.log("Stopping");
    }
  });
}

decorate(yt1210Store, {
  playlist: observable,
  videoId: observable,
  playing: observable,
  crackle: observable,
  video: observable,
  repeat: observable,
  shuffle: observable,
  playlists: observable,
  tracks: observable
});

const yt1210State = {
  yt1210Store: new yt1210Store()
};

export default yt1210State;
