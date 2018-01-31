import React, { Component } from 'react';
import ProfilePicUpload from './ProfilePicUpload';

class ProfilePic extends Component {
    constructor(props) {
        super(props);
        console.log('props', this.props.imgurl);
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
                <img src={profilePicture} />
            </div>
        );
    }
}

export default ProfilePic;
