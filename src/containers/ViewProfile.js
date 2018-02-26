import React, { Component } from 'react';
import ProfilePic from '../components/ProfilePic';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from '../config/axios';
import FriendshipButton from '../components/FriendshipButton';
import PostList from '../components/PostList';

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.id,
            friendShipState: 'null'
        };
    }

    componentDidMount() {
        this.componentWillReceiveProps();
    }

    componentWillReceiveProps() {
        axios
            .get(`/getProfile/${this.props.match.params.id}`)
            .then(({ data }) => {
                this.setState({
                    userFirst: data.first,
                    userLast: data.last,
                    userProfilepic: data.profilepicurl,
                    userBio: data.bio
                });
            });
    }

    makeFriendRequest(event, friendId) {
        event.preventDefault();

        axios
            .post('/sendFriendrequest', {
                friend_id: friendId
            })
            .then(({ data }) => {
                this.setState({ friendshipState: 'pending' });
            });
    }

    render() {
        const userId = this.props.user.id;

        return (
            <div className="user-profile">
                <section className="section">
                    <h2 className="title is-centered">
                        {this.state.userFirst} {this.state.userLast}
                    </h2>
                    <div className="is-italic">{this.state.userBio}</div>
                </section>

                <div className="profile-picture">
                    <ProfilePic imgurl={this.state.userProfilepic} />
                    <FriendshipButton
                        friendId={this.props.match.params.id}
                        userId={userId}
                    />
                </div>

                <PostList user_id={this.props.match.params.id} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(ViewProfile);
