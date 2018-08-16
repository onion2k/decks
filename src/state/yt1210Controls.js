import { configure, decorate, observable, action } from "mobx";

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
    startTime = 0;
    endTime = 0;
    duration = 0;

    updatePlayState(playing){

      const video = this.pm.getTrackById(this.videoId);

      this.playing = playing;
      this.startTime = Date.now();
      this.endTime = this.startTime + (video.duration * 1000);
      this.duration = video.duration;

    }

    // play track
    play = (id = null) => {
      if (id!==null) {
        this.videoId = this.pm.getTrackById(id).videoId;
      } else {
        this.videoId = this.pm.getCurrentTrack().videoId;
      }
      this.updatePlayState(true);
    };
  
    // pause track
    pause = () => {
      this.playing = !this.playing;
      this.updatePlayState(false);
    };
  
    // stop track
    stop = () => {
      this.playing = false;
      this.updatePlayState(false);
    };
  
    // next track
    next = () => {
        if (this.shuffle) {
            this.videoId = this.pm.getNextTrack().videoId;
        } else {
            this.videoId = this.pm.getNextTrack().videoId;
        }
        this.updatePlayState(true);
      };
  
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
    shuffle: observable,
    startTime: observable,
    endTime: observable,
    duration: observable
  });
  
