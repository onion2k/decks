import { configure, decorate, observable, action, autorun } from "mobx";

import fx from "./yt1210Sounds";

configure({ enforceActions: true });

export default class yt1210Controls {

    constructor(pm){
      this.pm = pm;
    }
    
    videoId = null;
  
    playing = false;
    repeat = false;
    shuffle = false;
    crackle = true;
    video = true;
  
    // play track
    play = (id = null) => {
      // set videoId
      if (!id) {
        this.videoId = this.pm.getCurrentTrack().videoId;
      } else {
        this.videoId = this.pm.getTrackById(id).videoId;
      }
      this.playing = true;
  
      // play stylus fx
      // if crackle and crackle is not playing, play crackle fx
    };
  
    // pause track
    pause = () => {
      this.playing = !this.playing;
      // if crackle, pause crackle fx
    };
  
    // stop track
    stop = () => {
      this.playing = false;
    };
  
    // next track
    next = () => {
      this.videoId = this.pm.getNextTrack().videoId;
      // play scratchin fx
  
      // if skip, play drag fx
    };
  
    // copy playlist from youtube


    toggle_repeat = () => {
      this.repeat = !this.repeat;
      if (this.repeat) { fx.ogg_scratchin.play(); }
    }
  
    toggle_shuffle = () => {
      this.shuffle = !this.shuffle;
    };
  
    toggle_crackle = () => {
      this.crackle = !this.crackle;
    };

    toggle_video = () => {
      this.video = !this.video;
    };
  }
  
  decorate(yt1210Controls, {
    play: action,
    pause: action,
    stop: action,
    next: action,
    toggle_repeat: action,
    toggle_shuffle: action,
    toggle_crackle: action,
    toggle_video: action,
    videoId: observable,
    playing: observable,
    crackle: observable,
    video: observable,
    repeat: observable,
    shuffle: observable
  });
  
