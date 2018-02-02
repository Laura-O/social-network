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
                <ProfilePic imgurl={this.state.userProfilepic} />
                <h2>
                    {this.state.userFirst} {this.state.userLast}
                </h2>
            </div>
        );
    }
}

export default ViewProfile;
