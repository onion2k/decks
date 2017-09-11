import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {

    render() {
        return (
            <ul className="yt1210Controls">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/settings'>Settings</Link></li>
            </ul>
        );
    }
}

export default Nav;