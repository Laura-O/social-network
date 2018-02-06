import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFriendRequests, getFriends } from '../actions/index';
import { bindActionCreators } from 'redux';
import ProfilePic from '../components/ProfilePic';

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

        const renderProfiles = friendData => {
            return friendData.map(friend => {
                console.log(friend);
                return (
                    <div key={friend.id} className="friend-container">
                        <ProfilePic imgurl={friend.profilepicurl} />
                        <div>
                            {friend.first} {friend.last} {friend.id}
                        </div>
                    </div>
                );
            });
        };

        return (
            <div>
                <h2>People waiting to be friendzoned by you</h2>
                <div className="friends-wrapper">
                    {this.props.friendRequests && renderProfiles(this.props.friendRequests)}
                </div>
                <h2>People in your friendzone</h2>
                <div className="friends-wrapper">
                    {this.props.friends && renderProfiles(this.props.friends)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        friends: state.friends,
        friendRequests: state.friendRequests,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { getFriendRequests: getFriendRequests, getFriends: getFriends },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
