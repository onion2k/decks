import React, { Component } from 'react'

const NeonContext = React.createContext('light');

const Neon = (WrappedComponent) => {
    
    return class extends Component {
        render() {
            return (
                <NeonContext.Provider value="cyan">
                    <WrappedComponent />
                </NeonContext.Provider>
            )
        }
    }

}

export const NeonColor = NeonContext.Consumer;

export default Neon;
