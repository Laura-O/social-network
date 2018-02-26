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
                this.props.changeBio(newBio);
                this.toggleBio();
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="user-profile">
                <div className="profile-picture">
                    <ProfilePic imgurl={this.props.user.profilepicurl} />
                </div>

                <h2 className="title">
                    {this.props.user.first} {this.props.user.last}
                </h2>

                <section className="section">
                    <h2>{this.props.user.bio}</h2>

                    <div>
                        <button className="button" onClick={this.toggleBio}>
                            Edit bio
                        </button>
                    </div>

                    {this.state.showBioInput && (
                        <form onSubmit={this.handleSubmit}>
                            <label className="label">Add bio:</label>
                            <input
                                className="input"
                                type="text"
                                value={this.state.bio}
                                onChange={this.handleChange}
                            />
                            <input type="submit" value="Submit" />
                        </form>
                    )}
                </section>

                <section className="section">
                    <ProfilePicUpload />
                </section>

                <section className="section">
                    <div className="profile-posts">
                        <h1 className="title">User Post</h1>
                        <PostForm />
                    </div>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            changeBio
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
