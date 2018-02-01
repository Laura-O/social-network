import React, { Component } from 'react';
import ProfilePicUpload from './ProfilePicUpload';

class ProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePicUrl: this.props.imgurl,
        };
    }

    render() {
        let profilePicture = '';
        if (this.props.imgurl) {
            profilePicture = 'https://s3.amazonaws.com/peachan/' + this.props.imgurl;
        } else {
            profilePicture = './images/default-user.jpg';
        }

        return (
            <div className="profile-picture" onClick={this.props.showUploader}>
                <img className="profile-picture" src={profilePicture} />
            </div>
        );
    }
}

export default ProfilePic;
