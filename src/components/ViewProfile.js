import React, { Component } from 'react';
import axios from '../config/axios';
import ProfilePic from './ProfilePic';
import FriendshipButton from './FriendshipButton';

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { userId: this.props.match.params.id, friendShipState: 'null' };
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
        // axios.get(`/getFriendshipStatus/${this.props.match.params.id}`).then(({ data }) => {
        //     console.log(data);
        //     this.setState({
        //         friendshipState: data,
        //     });
        // });
    }

    makeFriendRequest(event, friendId) {
        event.preventDefault();

        axios
            .post('/sendFriendrequest', {
                friend_id: friendId,
            })
            .then(({ data }) => {
                this.setState({ friendshipState: 'pending' });
            });
    }

    render() {
        return (
            <div className="user-profile">
                <div className="profile-picture">
                    <ProfilePic imgurl={this.state.userProfilepic} />
                    <div>
                        <FriendshipButton
                            friendship={this.state.friendshipState}
                            friendId={this.props.match.params.id}
                        />
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
