import { configure, decorate, observable, action, autorun } from "mobx";

import fx from "./yt1210Sounds";

export default class yt1210Controls {
    
    videoId = null;
  
    playing = false;
    repeat = false;
    shuffle = false;
    crackle = true;
    video = true;
  
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
  
  decorate(yt1210Controls, {
    videoId: observable,
    playing: observable,
    crackle: observable,
    video: observable,
    repeat: observable,
    shuffle: observable,
  });
  