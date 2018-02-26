import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    getFriendRequests,
    getFriends,
    cancelFriendship,
    addFriend,
    approveRequest
} from '../actions/index';
import { bindActionCreators } from 'redux';
import ProfilePic from '../components/ProfilePic';
import FriendshipButton from '../components/FriendshipButton';

class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getFriendRequests();
        this.props.getFriends();
    }

    render() {
        const { friends } = this.props;
        const { friendRequests } = this.props;

        const renderProfiles = (friendData, friends) => {
            return friendData.map(friend => {
                const dispatchFunction = friends ? (
                    <button
                        onClick={() => this.props.cancelFriendship(friend.id)}
                    >
                        Cancel
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            this.props.approveRequest(friend.id);
                            this.props.addFriend(friend);
                        }}
                    >
                        Approve
                    </button>
                );

                return (
                    <div key={friend.id} className="friend-container">
                        <ProfilePic imgurl={friend.profilepicurl} />
                        <div>
                            <Link to={`/user/${friend.id}`}>
                                {friend.first} {friend.last}
                            </Link>
                        </div>
                        {/* <FriendshipButton friendId={friend.id} /> */}
                        {dispatchFunction}
                    </div>
                );
            });
        };

        return (
            <div className="section">
                <h2 className="title">
                    People waiting to be friendzoned by you
                </h2>
                <div className="friends-wrapper">
                    {this.props.friendRequests &&
                        renderProfiles(this.props.friendRequests)}
                </div>
                <h2 className="title">People in your friendzone</h2>
                <div className="friends-wrapper">
                    {this.props.friends &&
                        renderProfiles(this.props.friends, true)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        friends: state.friends,
        friendRequests: state.friendRequests
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getFriendRequests: getFriendRequests,
            getFriends: getFriends,
            cancelFriendship: cancelFriendship,
            addFriend: addFriend,
            approveRequest: approveRequest
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
