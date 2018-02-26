import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from './Logo.js';
import ProfilePic from './ProfilePic.js';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            first: '',
            last: '',
            profilepic: '',
            bio: ''
        };
    }

    render() {
        return (
            <header className="level">
                <Link to={`/`}>
                    <Logo />
                </Link>
                <Link to={`/online`}>Online Users</Link>
                <Link to={`/friends`}>Friends</Link>
                <Link to={`/`}>
                    <ProfilePic imgurl={this.props.imgurl} />
                </Link>
            </header>
        );
    }
}

export default Navbar;
