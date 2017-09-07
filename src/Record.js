import React, { Component } from 'react';
import record from './img/record.png';
import tonearm from './img/tonearm.png';
import './Record.css';

class Record extends Component {

    constructor(props) {

        super(props);
        this.mouseMove = this.mouseMove.bind(this);
        this.lastX = 0;

        this.state = { 
            title: 'Unknown', 
            label: '', 
            dragtone: false,
            tonestart: -54,
            toneangle: -54,
            tonestyle: 'rotate(-54deg)',
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            label: 'https://img.youtube.com/vi/'+nextProps.vData.videoId+'/0.jpg',
            title: nextProps.vData.title
        })
    }

    mouseMove(e){

        if (this.state.dragtone) {
            let toneangle = this.state.tonestart + ((e.pageX - this.lastX) / 10);
            if (toneangle < -54) { toneangle = -54; }
            if (toneangle > -19) { toneangle = -19; }

            if (toneangle > -25.6) {
                this.props.onTrack(5);
            } else if (toneangle > -28.5) {
                this.props.onTrack(4);
            } else if (toneangle > -34.2) {
                this.props.onTrack(3);
            } else if (toneangle > -39.7) {
                this.props.onTrack(2);
            } else if (toneangle > -43.4) {
                this.props.onTrack(1);
            } else if (toneangle > -48) {
                this.props.onTrack(0);
            }

            this.setState({
                toneangle: toneangle,
                tonestyle: 'rotate('+toneangle+'deg)'
            });

        }
    }

    render() {
        return (
            <div className="Deck" onMouseDown={ (e)=>{ this.lastX = e.pageX; this.setState({ dragtone: true })} } onMouseUp={ ()=>{ this.setState({ dragtone: false, tonestart: this.state.toneangle }); } } onMouseMove={ (e)=>{ this.mouseMove(e); } }>
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
