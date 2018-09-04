import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const withNeon = (NeonComponent) => {
    
    return class extends Component {
        constructor(props) {
            super(props);
            this.ref = React.createRef();
            this.canvasref = React.createRef();
        }
        componentDidMount(){

            const ro = new window.ResizeObserver((c) => {
                const bb = c[0].target.getBoundingClientRect();
                Object.assign(this.canvasref.current.style, {
                    position: 'absolute',
                    width: bb.width+'px',
                    height: bb.height+'px',
                    top: bb.top+'px',
                    left: bb.left+'px',
                    zIndex: 999,
                    pointerEvents: 'none'
                });
            });

            ro.observe(ReactDOM.findDOMNode(this.ref.current));

        }
        render() {
            return (
                <React.Fragment>
                    <NeonComponent ref={this.ref} />
                    <canvas ref={this.canvasref} />
                </React.Fragment>
            )
        }
    }

}

export default withNeon;
