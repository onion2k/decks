import React, { Component } from 'react';
import record from './img/record.png';
import './Record.css';

class Record extends Component {

    constructor(props) {
        super(props);
        this.state = { title: 'Unknown', label: '' }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            label: 'https://img.youtube.com/vi/'+nextProps.vData.video_id+'/0.jpg',
            title: nextProps.vData.title
        })
    }

    render() {
        return (
            <div className={'Record'+(this.props.playing===true?' spinning':'')} style={{ backgroundImage: 'url('+record+')' }} >
                <div className="label">
                    <img src={ this.state.label } alt='title' />
                    <span className="title">{ this.state.title }</span>
                </div>
            </div>
        );
    }
}

export default Record;
