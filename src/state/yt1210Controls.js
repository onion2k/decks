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
    play = () => {
      // set videoId
      this.videoId = this.pm.getCurrentTrack().videoId;
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
  
  decorate(yt1210Controls, {
    play: action,
    pause: action,
    stop: action,
    next: action,
    videoId: observable,
    playing: observable,
    crackle: observable,
    video: observable,
    repeat: observable,
    shuffle: observable
  });
  
