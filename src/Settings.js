import React, { Component } from 'react';
import './Settings.css';

class Settings extends Component {

    constructor(props) {

        super(props);

        this.state = {
            crackle: true,
            repeat: false
        }

        this.updateCrackle = this.updateCrackle.bind(this);
        this.updateRepeat  = this.updateRepeat.bind(this);

    }

    updateCrackle() {
        let c = this.state.crackle;        
        //if (c===true) { this.ogg_crackle.stop(); } else if (this.state.playing===true) { this.ogg_crackle.play(); }
        this.setState({ crackle: !c });
    }

    updateRepeat() {
        let r = this.state.repeat;
        this.setState({ repeat: !r });
    }

    render() {
        return (
            <div className="Settings">
                <div className="setting">
                    <label><input type="checkbox" checked={ this.state.crackle } onChange={ this.updateCrackle } /> Play record crackle noise</label>
                </div>
                <div className="setting">
                    <label><input type="checkbox" checked={ this.state.repeat } onChange={ this.updateRepeat } /> Single track repeat</label>
                </div>
            </div>
        );
    }
}

export default Settings;