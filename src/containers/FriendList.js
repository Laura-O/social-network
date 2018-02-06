import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFriends } from '../actions/index';
import { bindActionCreators } from 'redux';

class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getFriends();
    }

    render() {
        const { friends } = this.props;

        const renderFriends = () => {
            return friends.map(friend => {
                console.log(friend);
                return <li>{friend.id}</li>;
            });
        };

        return (
            <div>
                <p>Friends component</p>
                <ul>{this.props.friends && renderFriends()}</ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        friends: state.friends,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getFriends: getFriends }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
