import { Component } from "react";
import { inject, observer } from "mobx-react";

class ReativeCSSVar extends Component {

    constructor(props){
        super(props);
        this.root = document.querySelector(":root");
    }

    render() {
        this.root.style.setProperty('--track-duration', `${this.props.playlistControls.duration}s`);
        return null;
    }
}

export default inject("playlistControls")(observer(ReativeCSSVar));
