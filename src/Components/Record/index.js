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

class Record extends Component {

  constructor(props) {
    super(props);

    // this.armMove = this.armMove.bind(this);
    // this.armUp = this.armUp.bind(this);
    // this.tick = this.tick.bind(this);
    this.lastX = 0;

    this.requestAnimationFrameId = null;

    // this.state = {
    //   requestAnimationFrameId: null,
    //   title: "Unknown",
    //   label: "",
    //   dragtone: false,
    //   tonestart: -54,
    //   toneangle: -54,
    //   tonestyle: "rotate(-54deg)",
    //   millis: Date.now()
    // };
  }

  track = autorun(() => {
    const { track } = this.props.playlistManager;

    if (track) {
      this.setState({
        toneanimto: tracks[track-1].s
      });
      // if (this.props.playlistControls.playing === true) {
      //   if (!this.requestAnimationFrameId) {
      //     this.requestAnimationFrameId = requestAnimationFrame(this.tick);
      //   }
      // } else if (this.requestAnimationFrameId) {
      //   cancelAnimationFrame(this.requestAnimationFrameId);
      // }
    }

  });

  // tick() {
  //   var toneangle, toneanimto;

  //   toneanimto = this.state.toneanimto;

  //   if (this.state.toneanimto === null) {
  //     toneanimto = null;
  //     toneangle = this.state.toneangle + 0.001; // This will die on it's arse on a long track
  //   } else {
  //     if (this.state.toneanimto > this.state.toneangle) {
  //       toneangle = this.state.toneangle + 0.15;
  //     } else {
  //       toneangle = this.state.toneangle - 0.15;
  //     }

  //     if (Math.abs(toneangle - this.state.toneanimto) < 0.2) {
  //       toneanimto = null;
  //     }
  //   }

    // this.setState({
    //     millis: Date.now(),
    //     requestAnimationFrameId: requestAnimationFrame(this.tick),
    //     tonestart: toneangle,
    //     toneangle: toneangle,
    //     tonestyle: 'rotate('+toneangle+'deg)',
    //     toneanimto: toneanimto
    // });
  //  }

  // armMove(e) {
  //   if (this.state.dragtone) {
  //     if (this.state.requestAnimationFrameId) {
  //       cancelAnimationFrame(this.state.requestAnimationFrameId);
  //     }
  //     let toneangle = this.state.tonestart + (e.pageX - this.lastX) / 10;
  //     if (toneangle < -54) {
  //       toneangle = -54;
  //     }
  //     if (toneangle > -19) {
  //       toneangle = -19;
  //     }
  //     this.setState({
  //       requestAnimationFrameId: false,
  //       toneangle: toneangle,
  //       tonestyle: "rotate(" + toneangle + "deg)"
  //     });
  //   }
  // }

  // armUp(e) {
  //   var toneangle, per;

  //   let perCal = function(s, e, p) {
  //     let tl = Math.abs(s) - Math.abs(e);
  //     let per = p + Math.abs(s);
  //     return (per / tl) * 100;
  //   };

  //   this.setState({ dragtone: false, tonestart: this.state.toneangle });

  //   toneangle = this.state.toneangle;

  //   if (toneangle > -20) {
  //     //off
  //   } else if (toneangle > -25.6) {
  //     per = perCal(-25.6, -20, toneangle);
  //     this.props.onTrack(5, per);
  //   } else if (toneangle > -28.5) {
  //     per = perCal(-28.5, -25.6, toneangle);
  //     this.props.onTrack(4, per);
  //   } else if (toneangle > -34.2) {
  //     per = perCal(-34.2, -28.5, toneangle);
  //     this.props.onTrack(3, per);
  //   } else if (toneangle > -39.7) {
  //     per = perCal(-39.7, -34.2, toneangle);
  //     this.props.onTrack(2, per);
  //   } else if (toneangle > -43.4) {
  //     per = perCal(-43.4, -39.7, toneangle);
  //     this.props.onTrack(1, per);
  //   } else if (toneangle > -47.6) {
  //     per = perCal(-47.6, -43.4, toneangle);
  //     this.props.onTrack(0, per);
  //   } else {
  //     //off
  //   }
  // }

  render() {

    return (
      <div
        className="Deck"
        // onMouseDown={e => {
        //   this.lastX = e.pageX;
        //   this.setState({ dragtone: true });
        // }}
        // onMouseUp={e => {
        //   this.armUp(e);
        // }}
        // onMouseMove={e => {
        //   this.armMove(e);
        // }}
      >
        <div
          className={
            "Record" + (this.props.playlistControls.playing === true ? " playing" : "")
          }
          style={{ backgroundImage: "url(" + record + ")" }}
        >
          <div className="label">
            <img src={"https://img.youtube.com/vi/" + this.props.playlistManager.currentTrack.videoId + "/0.jpg"} alt="Record" />
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
            style={{ transform: "" }}
          />
        </div>
      </div>
    );
  }
}

export default inject("playlistControls", "playlistManager")(observer(Record));
