import React, { Component } from 'react';
import axios from 'axios';
import ProfilePic from './ProfilePic';

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { id: this.props.match.params.id };
    }

    componentDidMount() {
        axios.get(`/getProfile/${this.state.id}`).then(({ data }) => {
            this.setState({
                userFirst: data.first,
                userLast: data.last,
                userProfilepic: data.profilepicurl,
                userBio: data.bio,
            });
            console.log(this.state);
        });
    }

    render() {
        return (
            <div className="user-profile">
                <ProfilePic imgurl={this.state.userProfilepic} />
            </div>
        );
    }
}

export default ViewProfile;
