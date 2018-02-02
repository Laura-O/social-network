import React, { Component } from 'react';
import axios from '../config/axios';
import ProfilePic from './ProfilePic';

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.componentWillReceiveProps();
    }

    componentWillReceiveProps() {
        axios.get(`/getProfile/${this.props.match.params.id}`).then(({ data }) => {
            this.setState({
                userFirst: data.first,
                userLast: data.last,
                userProfilepic: data.profilepicurl,
                userBio: data.bio,
            });
        });
    }

    render() {
        return (
            <div className="user-profile">
                <div className="profile-picture">
                    <ProfilePic imgurl={this.state.userProfilepic} />
                    <div>
                        <button name="button">Make friend request</button>
                    </div>
                </div>

                <div className="profile-info">
                    <h2>
                        {this.state.userFirst} {this.state.userLast}
                    </h2>
                    <div>{this.state.userBio}</div>
                </div>
            </div>
        );
    }
}

export default ViewProfile;
