import React, { Component } from 'react';

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
        if (c===true) { this.ogg_crackle.stop(); } else if (this.state.playing===true) { this.ogg_crackle.play(); }
        this.setState({ crackle: !c });
    }

    updateRepeat() {
        let r = this.state.repeat;
        this.setState({ repeat: !r });
    }

    render() {
        return (
            <div className="Settings">
                <label>Crackle <input type="checkbox" checked={ this.state.crackle } onChange={ this.updateCrackle } /></label>
                <label>Repeat <input type="checkbox" checked={ this.state.repeat } onChange={ this.updateRepeat } /></label>
            </div>
        );
    }
}

export default Settings;