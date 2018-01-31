import React, { Component } from 'react';

class ProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePicUrl: this.props.imgurl || './images/default-user.jpg',
        };
        console.log(this.state);
    }
    render() {
        return (
            <div className="profile-picture">
                <img src={this.state.profilePicUrl} />
            </div>
        );
    }
}

export default ProfilePic;
