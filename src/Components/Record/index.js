import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { autorun } from "mobx";
import record from "../../img/record.png";
import tonearm from "../../img/tonearm.png";
import "./Record.css";

const tracks = [
  { s: -47.6, e: -43.4 },
  { s: -43.4, e: -39.7 },
  { s: -39.7, e: -34.2 },
  { s: -34.2, e: -28.5 },
  { s: -28.5, e: -25.6 },
  { s: -25.6, e: -20.0 }
];


// track id / position changes
// move arm to track start position
// tick arm to end

class Record extends Component {

  constructor(props) {
    super(props);

    this.drag = this.drag.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragStart = this.dragStart.bind(this);

    this.tick = this.tick.bind(this);

    this.lastX = 0;
    this.requestAnimationFrameId = null;

    this.state = {
      dragtone: false,
      tonestart: -54,
      toneangle: -54,
      tonestyle: "rotate(-54deg)",
      millis: Date.now()
    };
  }

  track = autorun(() => {
    const { track } = this.props.playlistManager;
    if (track) {

      if (track > -1 && track < tracks.length) {
        this.setState({
          toneanimto: tracks[track].s
        });
      }

      if (this.props.playlistControls.playing === true) {
        if (!this.requestAnimationFrameId) {
          this.requestAnimationFrameId = requestAnimationFrame(this.tick);
        }
      } else if (this.requestAnimationFrameId) {
        cancelAnimationFrame(this.requestAnimationFrameId);
      }
    }
  });

  tick() {
    var toneangle, toneanimto;

    toneanimto = this.state.toneanimto;

    if (this.state.toneanimto === null) {
      toneanimto = null;
      toneangle = this.state.toneangle + 0.001; // This will die on it's arse on a long track
    } else {
      if (this.state.toneanimto > this.state.toneangle) {
        toneangle = this.state.toneangle + 0.15;
      } else {
        toneangle = this.state.toneangle - 0.15;
      }

      if (Math.abs(toneangle - this.state.toneanimto) < 0.2) {
        toneanimto = null;
      }
    }

    this.setState({
        millis: Date.now(),
        tonestart: toneangle,
        toneangle: toneangle,
        tonestyle: 'rotate('+toneangle+'deg)',
        toneanimto: toneanimto
    }, ()=>{
      this.requestAnimationFrameId = requestAnimationFrame(this.tick);
    });
   }

   drag(e) {
    if (this.state.dragtone) {

      let toneangle = this.state.tonestart + (e.pageX - this.lastX) / 10;
      if (toneangle < -54) {
        toneangle = -54;
      }
      if (toneangle > -19) {
        toneangle = -19;
      }
      
      this.setState({
        requestAnimationFrameId: false,
        toneangle: toneangle,
        tonestyle: "rotate(" + toneangle + "deg)"
      });

    }
  }

  dragStart(e){
    this.lastX = e.pageX;
    if (this.state.requestAnimationFrameId) {
      cancelAnimationFrame(this.state.requestAnimationFrameId);
    }
    this.setState({ dragtone: true, requestAnimationFrameId: null });
  }

  dragEnd(e) {
    // let per;
    let toneangle;

    // let percentageTrackDistance = function(s, e, p) {
    //   let tl = Math.abs(s) - Math.abs(e);
    //   let per = p + Math.abs(s);
    //   return (per / tl) * 100;
    // };

    this.setState({ dragtone: false });

    toneangle = this.state.toneangle;

    if (toneangle > -20) {
      //off
    } else if (toneangle > -25.6) {
      // per = percentageTrackDistance(-25.6, -20, toneangle);
      // this.props.onTrack(5, per);
    } else if (toneangle > -28.5) {
      // per = percentageTrackDistance(-28.5, -25.6, toneangle);
      // this.props.onTrack(4, per);
    } else if (toneangle > -34.2) {
      // per = percentageTrackDistance(-34.2, -28.5, toneangle);
      // this.props.onTrack(3, per);
    } else if (toneangle > -39.7) {
      // per = percentageTrackDistance(-39.7, -34.2, toneangle);
      // this.props.onTrack(2, per);
    } else if (toneangle > -43.4) {
      // per = percentageTrackDistance(-43.4, -39.7, toneangle);
      // this.props.onTrack(1, per);
    } else if (toneangle > -47.6) {
      // per = percentageTrackDistance(-47.6, -43.4, toneangle);
      // this.props.onTrack(0, per);
    } else {
      //off
    }
  }

  render() {

    let labelImage = null;
    if (this.props.playlistManager.currentTrack.videoId) {
      labelImage = <img src={"https://img.youtube.com/vi/" + this.props.playlistManager.currentTrack.videoId + "/0.jpg"} alt="Record" />;
    }

    return (
      <div
        className="Deck"
        onMouseDown={e => { // button done / drag start
          this.dragStart(e);
        }}
        onMouseUp={e => { // button up / drag end
          this.dragEnd(e);
        }}
        onMouseMove={e => { // dragging
          this.drag(e);
        }}
      >
        <div
          className={
            "Record" + (this.props.playlistControls.playing === true ? " playing" : "")
          }
          style={{ backgroundImage: "url(" + record + ")" }}
        >
          <div className="label">
            { labelImage }
            <span className="title">{this.props.playlistManager.currentTrack.title}</span>
          </div>
        </div>

        <div
          className={
            "Tonearm" + (this.props.playlistControls.playing === true ? " playing" : "")
          }
        >
          <img
            draggable="false"
            src={tonearm}
            alt="Tonearm"
            style={{ transform: this.state.tonestyle }}
          />
        </div>
      </div>
    );
  }
}

export default inject("playlistControls", "playlistManager")(observer(Record));
