import React, { Component } from 'react';

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
            profilePicture = this.props.imgurl;
        } else {
            profilePicture = '/images/default-user.jpg';
        }

        return (
            <div className="profile-picture-wrapper" onClick={this.props.showUploader}>
                <img className="profile-picture" src={profilePicture} />
            </div>
        );
    }
}

export default ProfilePic;
