import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ProfilePic from '../components/ProfilePic';
import FriendshipButton from '../components/FriendshipButton';

class OnlineUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const renderUsers = users => {
            return users.map(user => {
                return (
                    <div className="single-user" key={user.id}>
                        <ProfilePic imgurl={user.profilePicUrl} />
                        <div>
                            <Link to={`/user/${user.id}`}>
                                {user.first} {user.last}
                            </Link>
                        </div>
                    </div>
                );
            });
        };

        return (
            <div className="online-users">
                <div>
                    <h2>Onlineusers</h2>
                </div>
                {this.props.onlineUsers && renderUsers(this.props.onlineUsers)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        onlineUsers: state.onlineUsers,
    };
}

export default connect(mapStateToProps)(OnlineUsers);
