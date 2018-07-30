import { decorate, observable, action, autorun } from "mobx";

class yt1210Store {
    playing = false;
    repeat = false;
    shuffle = false;
    crackle = true;
    video = true;
    playlists = [];

    // sound actions
    // play crackle

    // playlist actions
    // add playlist
    // add track
    // delete playlist
    // delete track

    // play track
    play = action(()=>{
        console.log("play");
    });

    // pause track
    pause = action(()=>{
        console.log("pause");
    });

    // stop track
    stop = action(()=>{
        console.log("stop");
    });

    // next track
    next = action(()=>{
        console.log("next");
    });

    // copy playlist from youtube

    // user actions

    onToggle_repeat = autorun(() => {
        if (this.repeat) {
            console.log("repeat");
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
    playing: observable,
    crackle: observable,
    video: observable,
    repeat: observable,
    shuffle: observable,
    playlists: observable
});

const yt1210State = {
    yt1210Store: new yt1210Store()
};

export default yt1210State;