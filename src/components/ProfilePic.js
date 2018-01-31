import React, { Component } from 'react';
import ProfilePicUpload from './ProfilePicUpload';

class ProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePicUrl: this.props.imgurl || './images/default-user.jpg',
        };
    }
    render() {
        return (
            <div className="profile-picture" onClick={this.props.showUploader}>
                <img src={this.state.profilePicUrl} />
            </div>
        );
    }
}

export default ProfilePic;
