import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const withNeon = (WrappedComponent) => {
    
    return class extends Component {
        constructor(props) {
            super(props);
            this.ref = React.createRef();
            this.canvasref = React.createRef();
        }
        componentDidMount(){

            const bb = ReactDOM.findDOMNode(this.ref.current).getBoundingClientRect();

            this.canvasref.current.style.position = 'absolute';
            this.canvasref.current.style.width = bb.width+'px';
            this.canvasref.current.style.height = bb.height+'px';
            this.canvasref.current.style.top = bb.top+'px';
            this.canvasref.current.style.left = bb.left+'px';
            this.canvasref.current.style.zIndex = 999;

        }
        render() {
            return (
                <React.Fragment>
                    <WrappedComponent ref={this.ref} />
                    <canvas ref={this.canvasref} />
                </React.Fragment>
            )
        }
    }

}

export default withNeon;
