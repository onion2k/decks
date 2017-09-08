import React, { Component } from 'react';
import * as auth0 from 'auth0-js';

class Callback extends Component {

    constructor(){

        super();


        let webAuth = new auth0.WebAuth({
            domain:       'ooer.eu.auth0.com',
            clientID:     'DG-lhPij_tdpYJhd2MkL8lpOa3iDn9Y5'
        });

        this.state = { 
            webAuth: webAuth
        };
        

    }

    componentWillMount(){

        this.state.webAuth.parseHash({ hash: window.location.hash }, (err, authResult) => {

            if (err) {return console.log(err); }

            this.state.webAuth.client.userInfo(authResult.accessToken, (err, user) => {

                this.setState({
                    nickname: user.nickname
                });
            });

            this.setState({
                token: authResult.accessToken
            });

            fetch('https://www.googleapis.com/youtube/v3/search', { mode: 'cors' }).then((result)=>{
                console.log(result);
            })
            
        });

    }

    render() {
        return (
            <div className="Callback">
                Auth: { this.state.nickname }<br />
                Token: { this.state.token }
            </div>
        );
    }
}

export default Callback;