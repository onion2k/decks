import React, { Component } from 'react'

const NeonContext = React.createContext('light');

const withNeon = (WrappedComponent) => {
    
    return class extends Component {
        state = {
            color: "cyan"
        }
        render() {
            return (
                <NeonContext.Provider value={this.state.color}>
                    <WrappedComponent />
                </NeonContext.Provider>
            )
        }
    }

}

export const Neon = NeonContext.Consumer;

export default withNeon;
