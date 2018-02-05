import React, { Component } from 'react';
import axios from '../config/axios';
import ProfilePic from './ProfilePic';

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { userId: this.props.match.params.id };
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

    getFriendshipStatus(friendId) {}

    makeFriendRequest(event, friendId) {
        event.preventDefault();
        console.log(friendId);
        axios
            .post('/sendFriendrequest', {
                friend_id: friendId,
            })
            .then(({ data }) => {
                console.log(data);
            });
    }

    render() {
        return (
            <div className="user-profile">
                <div className="profile-picture">
                    <ProfilePic imgurl={this.state.userProfilepic} />
                    <div>
                        <button
                            name="button"
                            onClick={e => this.makeFriendRequest(e, this.props.match.params.id)}
                        >
                            Make friend request
                        </button>
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
