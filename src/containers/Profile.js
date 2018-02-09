import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from '../config/axios';
import ProfilePic from '../components/ProfilePic';
import ProfilePicUpload from './ProfilePicUpload';
import PostForm from '../components/PostForm';
import { addCurrentUser, changeBio } from '../actions/index';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { bio: '', showBioInput: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleBio = this.toggleBio.bind(this);
    }

    handleChange(event) {
        this.setState({ bio: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setBio(this.state.bio, this.props.user.id);
    }

    toggleBio() {
        this.setState({ showBioInput: !this.state.showBioInput });
    }

    setBio(newBio, userId) {
        axios
            .post('/updateBio', { bio: newBio, id: userId })
            .then(serverResponse => {
                console.log(serverResponse);
                this.props.changeBio(newBio);
                this.toggleBio();
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        let bio;
        if (this.props.bio) {
            bio = this.props.bio;
        } else {
            bio = 'No bio provided';
        }

        return (
            <div className="user-profile">
                <div className="profile-picture">
                    <ProfilePic imgurl={this.props.user.profilepicurl} />
                </div>
                <div className="user-data">
                    <h2>
                        {this.props.user.first} {this.props.user.last}
                    </h2>
                    <div className="user-bio">
                        <div>
                            {this.props.user.bio} <button onClick={this.toggleBio}>Edit bio</button>
                        </div>

                        {this.state.showBioInput && (
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    Add bio:
                                    <input
                                        type="text"
                                        value={this.state.bio}
                                        onChange={this.handleChange}
                                    />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                        )}
                    </div>

                    <ProfilePicUpload />

                    <div className="profile-posts">
                        <h2>User Posts</h2>
                        <PostForm />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            changeBio,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
