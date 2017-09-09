import React, { Component } from 'react';
import record from './img/record.png';
import tonearm from './img/tonearm.png';
import './Record.css';

class Record extends Component {

    constructor(props) {

        super(props);
        this.armMove = this.armMove.bind(this);
        this.armUp = this.armUp.bind(this);
        this.tick = this.tick.bind(this);
        this.lastX = 0;

        this.state = { 
            title: 'Unknown', 
            label: '', 
            dragtone: false,
            tonestart: -54,
            toneangle: -54,
            tonestyle: 'rotate(-54deg)',
            millis: Date.now(),
        }

    }

    tick() {
        var toneangle = this.state.toneangle+0.001;
        this.setState({
           millis: Date.now(),
           request: requestAnimationFrame(this.tick),
           toneangle: toneangle,
           tonestyle: 'rotate('+toneangle+'deg)'
        });
     }

     componentWillReceiveProps(nextProps) {
        let request = false;
        if (nextProps.playing===true) {
            if (!this.state.request) {
                request = requestAnimationFrame(this.tick);
            }
        } else {
            cancelAnimationFrame(this.state.request);
        }
        if (nextProps.vData.videoId === null) { return; }
        this.setState({
            request: request,
            label: 'https://img.youtube.com/vi/'+nextProps.vData.videoId+'/0.jpg',
            title: nextProps.vData.title
        })
    }

    armMove(e){
        
        if (this.state.dragtone) {
            if (this.state.request) { cancelAnimationFrame(this.state.request); }
            let toneangle = this.state.tonestart + ((e.pageX - this.lastX) / 10);
            if (toneangle < -54) { toneangle = -54; }
            if (toneangle > -19) { toneangle = -19; }
            this.setState({
                request: false,
                toneangle: toneangle,
                tonestyle: 'rotate('+toneangle+'deg)'
            });
        }
    }

    armUp(e) {

        var toneangle, per;

        let perCal = function(s,e,p){
            let tl = Math.abs(s) - Math.abs(e);
            let per = p + Math.abs(s);
            return (per / tl) * 100;
        }

        this.setState({ dragtone: false, tonestart: this.state.toneangle });

        toneangle = this.state.toneangle;

        if (toneangle > -20) {
            //off
        } else if (toneangle > -25.6) {
            per = perCal(-25.6,-20,toneangle);
            this.props.onTrack(5, per);
        } else if (toneangle > -28.5) {
            per = perCal(-28.5,-25.6,toneangle);
            this.props.onTrack(4, per);
        } else if (toneangle > -34.2) {
            per = perCal(-34.2,-28.5,toneangle);
            this.props.onTrack(3, per);
        } else if (toneangle > -39.7) {
            per = perCal(-39.7,-34.2,toneangle);
            this.props.onTrack(2, per);
        } else if (toneangle > -43.4) {
            per = perCal(-43.4,-39.7,toneangle);
            this.props.onTrack(1, per);
        } else if (toneangle > -47.6) {
            per = perCal(-47.6,-43.4,toneangle);
            this.props.onTrack(0, per);
        } else {
            //off
        }

    }

    render() {
        return (
            <div className="Deck" onMouseDown={ (e)=>{ this.lastX = e.pageX; this.setState({ dragtone: true })} } onMouseUp={ (e)=>{ this.armUp(e); } } onMouseMove={ (e)=>{ this.armMove(e); } }>
                <div className={'Record'+(this.props.playing===true?' playing':'')} style={{ backgroundImage: 'url('+record+')' }} >
                    <div className="label">
                        <img src={ this.state.label } alt='Record' />
                        <span className="title">{ this.state.title }</span>
                    </div>
                </div>
                <div className={'Tonearm'+(this.props.playing===true?' playing':'')}>
                    <img draggable="false" src={ tonearm } alt='Tonearm' style={{ transform: this.state.tonestyle }} />
                </div>
            </div>
        );
    }
}

export default Record;
