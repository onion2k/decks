import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const withNeon = (NeonComponent) => {
    
    return class extends Component {

        ref = React.createRef();
        canvasref = React.createRef();
        ctx = null;
        mouse = [];
        particles = [];
        raf = null;
        bb = {};
        draw = this.draw.bind(this);

        draw() {

            if (this.ctx!==null) {

                this.ctx.clearRect(0,0,this.bb.width,this.bb.height);

                this.ctx.strokeStyle = 'hsla(64,100%,100%,1)';
                this.ctx.beginPath();
                this.ctx.moveTo(0, 1114.796875 / 2);
                this.ctx.lineTo(20, 1114.796875 / 2);

                this.ctx.moveTo(this.bb.width - 20, 1114.796875 / 2);
                this.ctx.lineTo(this.bb.width, 1114.796875 / 2);

                this.ctx.stroke();

                // if (this.mouse.length) {
                //     this.mouse.forEach((m, i)=>{
                //         if (i===0) { return; }
                //         this.ctx.strokeStyle = 'hsla(64, 100%, 100%, '+(i/100)+')';
                //         this.ctx.beginPath();
                //         this.ctx.moveTo(this.mouse[i-1][0], this.mouse[i-1][1]);
                //         this.ctx.lineTo(m[0], m[1]);
                //         this.ctx.stroke();
                //     });    
                // }

                if (this.particles.length) {
                    this.particles.forEach((m, i)=>{
                        if (--m[4]<0){
                            this.particles.splice(i, 1);
                        }
                        this.ctx.fillStyle = 'hsla('+(64+m[4])+',100%,50%,'+(m[4] / 100)+')';
                        this.ctx.beginPath();
                        this.ctx.arc(m[0], m[1], 2, 0, 2 * Math.PI);
                        this.ctx.fill();
                        m[0] +=  Math.sin( (Math.PI * 2) * m[2] );
                        m[1] +=  Math.cos( (Math.PI * 2) * m[3] );
                    });    
                }

            }

            this.raf = requestAnimationFrame(this.draw);

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

                this.ctx = this.canvasref.current.getContext('2d');
                this.canvasref.current.width = bb.width;
                this.canvasref.current.height = bb.height;

                this.raf = requestAnimationFrame(this.draw);
            });

            ro.observe(ReactDOM.findDOMNode(this.ref.current));

            ReactDOM.findDOMNode(this.ref.current).addEventListener('mousemove', (e) => {
                // this.mouse.push([e.x - this.bb.left, e.y - this.bb.top]);
                // if (this.mouse.length > 100) { this.mouse = this.mouse.slice(1); }

                for (let x=0; x< 4; x++) {
                    this.particles.push(
                        [e.x - this.bb.left, e.y - this.bb.top, Math.random(), Math.random(), 50 + Math.random() * 100]
                    );                    
                }

            })

            ReactDOM.findDOMNode(this.ref.current).addEventListener('click', (e) => {
                for (let x=0; x< 10; x++) {
                    this.particles.push(
                        [e.x - this.bb.left, e.y - this.bb.top, Math.random(), Math.random(), 50 + Math.random() * 100]
                    );                    
                }
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
