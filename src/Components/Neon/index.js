import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const withNeon = (NeonComponent) => {
    
    return class extends Component {
        constructor(props) {
            super(props);
            this.ref = React.createRef();
            this.canvasref = React.createRef();
            this.bufferEl = null;
            this.buffer = null;
            this.ctxEl = null;
            this.ctx = null;
            this.prevMouse = [0,0];
            this.mouse = [0,0];
            this.bb = {};
            this.draw = this.draw.bind(this);
        }

        draw() {

            if (this.ctx!==null) {

                this.ctx.clearRect(0,0,this.bb.width,this.bb.height);
                this.ctx.drawImage(this.bufferEl, 0, 0);

                this.ctx.strokeStyle = 'hsla(64,100%,50%,1)';
                this.ctx.beginPath();
                this.ctx.moveTo(0, 1114.796875 / 2);
                this.ctx.lineTo(20, 1114.796875 / 2);

                this.ctx.moveTo(this.bb.width - 20, 1114.796875 / 2);
                this.ctx.lineTo(this.bb.width, 1114.796875 / 2);

                this.ctx.stroke();

                this.ctx.strokeStyle = 'hsla(64,100%,100%,1)';
                this.ctx.beginPath();
                this.ctx.moveTo(this.prevMouse[0], this.prevMouse[1]);
                this.ctx.lineTo(this.mouse[0], this.mouse[1]);
                this.ctx.stroke();

                this.prevMouse = this.mouse;

                this.buffer.clearRect(0,0,this.bb.width,this.bb.height);
                this.buffer.globalAlpha = 0.925;
                this.buffer.drawImage(this.ctxEl, 0, 0);
            }

            requestAnimationFrame(this.draw);

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
                this.bb = bb;

                this.bufferEl = document.createElement('canvas');
                this.buffer = this.bufferEl.getContext('2d');
                this.bufferEl.width = bb.width;
                this.bufferEl.height = bb.height;

                this.ctxEl = this.canvasref.current;
                this.ctx = this.canvasref.current.getContext('2d');
                this.canvasref.current.width = bb.width;
                this.canvasref.current.height = bb.height;

                requestAnimationFrame(this.draw);
            });

            ro.observe(ReactDOM.findDOMNode(this.ref.current));

            ReactDOM.findDOMNode(this.ref.current).addEventListener('mousemove', (e) => {
                this.mouse = [e.x - this.bb.left, e.y - this.bb.top];
            })

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
