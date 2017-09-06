import React, { Component } from 'react';
import record from './img/record.png';
import tonearm from './img/tonearm.png';
import './Record.css';

class Record extends Component {

    constructor(props) {
        super(props);
        this.state = { title: 'Unknown', label: '', dragtone: false }
        this.mouseMove = this.mouseMove.bind(this);
        this.toneangle = -49;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            label: 'https://img.youtube.com/vi/'+nextProps.vData.videoId+'/0.jpg',
            title: nextProps.vData.title
        })
    }

    mouseMove(e){
        if (this.state.dragtone) {
            console.log(e.pageX, e.pageY)
            this.toneangle = 'rotate(-40deg)';
        }
    }

    render() {
        return (
            <div className="Deck">
                <div className={'Record'+(this.props.playing===true?' playing':'')} style={{ backgroundImage: 'url('+record+')' }} >
                    <div className="label">
                        <img src={ this.state.label } alt='Record' />
                        <span className="title">{ this.state.title }</span>
                    </div>
                </div>
                <div className={'Tonearm'+(this.props.playing===true?' playing':'')}>
                    <img src={ tonearm } alt='Tonearm' style={{ transform: this.toneangle }} onMouseDown={ ()=>{ console.log('d'); this.setState({ dragtone: true })} } onMouseUp={ ()=>{ console.log('u'); this.setState({ dragtone: false }); } } onMouseMove={ (e)=>{ this.mouseMove(e); } } />
                </div>
            </div>
        );
    }
}

export default Record;
