import React, { Component } from 'react';
import ProfilePic from './ProfilePic';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="user-profile">
                <ProfilePic />
                <div className="user-data">
                    {this.props.first} {this.props.last}
                </div>
            </div>
        );
    }
}

export default Profile;
