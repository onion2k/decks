import React, { Component } from 'react';
import record from './img/record.png';
import tonearm from './img/tonearm.png';
import './Record.css';

class Record extends Component {

    constructor(props) {
        super(props);
        this.state = { title: 'Unknown', label: '' }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            label: 'https://img.youtube.com/vi/'+nextProps.vData.videoId+'/0.jpg',
            title: nextProps.vData.title
        })
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
                    <img src={ tonearm } alt='Tonearm' />
                </div>
            </div>
        );
    }
}

export default Record;
