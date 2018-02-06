import React, { Component } from 'react';
import axios from '../config/axios';

class FriendshipButton extends Component {
    constructor(props) {
        super(props);
        this.state = { friendshipState: null };
    }

    componentDidMount() {
        axios.get(`/getFriendshipStatus/${this.props.friendId}`).then(({ data }) => {
            this.setState({
                friendshipState: data,
            });
        });
    }

    makeFriendAction(event, friendId) {
        event.preventDefault();

        if (this.state.friendshipState == 'friends') {
            console.log('friends');
            axios
                .post('/cancelFriendship', { friend_id: this.props.friendId })
                .then(
                    this.setState({
                        friendshipState: 'none',
                    }),
                )
                .catch(err => console.log(err));
        } else if (this.state.friendshipState == 'none') {
            axios
                .post('/sendFriendrequest', { friend_id: this.props.friendId })
                .then(
                    this.setState({
                        friendshipState: 'pending',
                    }),
                )
                .catch(err => console.log(err));
        } else if (this.state.friendshipState == 'pending') {
            console.log('pending request');
            axios
                .post('/cancelRequest', { friend_id: this.props.friendId })
                .then(
                    this.setState({
                        friendshipState: 'none',
                    }),
                )
                .catch(err => console.log(err));
        } else if (this.state.friendshipState == 'request') {
            axios
                .post('/approveRequest', { friend_id: this.props.friendId })
                .then(
                    this.setState({
                        friendshipState: 'friends',
                    }),
                )
                .catch(err => console.log(err));
        }
    }

    getButtonText() {
        if (this.state.friendshipState == 'friends') {
            return 'Cancel friendship';
        } else if (this.state.friendshipState == 'none') {
            return 'Make a friend request';
        } else if (this.state.friendshipState == 'pending') {
            return 'Request sent';
        } else if (this.state.friendshipState == 'request') {
            return 'Approve request';
        }
    }

    render() {
        return (
            <div>
                <button name="button" onClick={e => this.makeFriendAction(e, this.props.friendId)}>
                    {this.getButtonText()}
                </button>
            </div>
        );
    }
}

export default FriendshipButton;
