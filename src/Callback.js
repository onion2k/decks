import React, { Component } from 'react';

class Callback extends Component {
    render() {
        return (
            <div className="Callback">
                Token: { this.state.token }
            </div>
        );
    }
}

export default Callback;