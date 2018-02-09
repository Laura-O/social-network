import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../config/axios';
import Logo from '../components/Logo.js';
import Registration from '../components/Registration.js';
import Welcome from '../components/Welcome.js';
import Profile from '../components/Profile.js';
import ProfilePic from '../components/ProfilePic.js';
import ProfilePicUpload from '../components/ProfilePicUpload.js';
import Navbar from '../components/Navbar';
import ViewProfile from '../components/ViewProfile.js';
import FriendList from '../containers/FriendList';
import OnlineUsers from '../containers/OnlineUsers';
import getSocket from '../socket';

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            first: '',
            last: '',
            profilepic: '',
            bio: '',
        };
        this.setBio = this.setBio.bind(this);
    }

    componentDidMount() {
        getSocket();
        axios.get('/getUser').then(({ data }) => {
            this.setState({
                first: data.first,
                last: data.last,
                id: data.id,
                profilepic: data.profilepicurl,
                bio: data.bio,
            });
        });
    }

    showUploader() {
        this.setState({ showUploader: !this.state.showUploader });
    }

    uploadFile(e) {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        axios
            .post('/files', formData)
            .then(serverResponse => {
                this.setState(serverResponse.data);
                this.showUploader();
            })
            .catch(err => {
                this.setState({
                    error: 'Something went wrong. Please try again!',
                });
            });
    }

    setBio(newBio, userId) {
        axios
            .post('/updateBio', { bio: newBio, id: userId })
            .then(serverResponse => {
                console.log(serverResponse);
                this.setState({ bio: newBio });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        let uploader = null;
        if (this.state.showUploader) {
            uploader = <ProfilePicUpload uploadFile={e => this.uploadFile(e)} />;
        }

        return (
            <div className="container">
                <Navbar imgurl={this.state.profilepic} />
                <div className="main-wrapper">
                    <hr />

                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                id={this.state.id}
                                first={this.state.first}
                                last={this.state.last}
                                imgurl={this.state.profilepic}
                                bio={this.state.bio}
                                setBio={this.setBio}
                                uploadFile={e => this.uploadFile(e)}
                            />
                        )}
                    />
                    <Route path="/friends" component={FriendList} />
                    <Route path="/user/:id" component={ViewProfile} />
                    <Route path="/online" component={OnlineUsers} />
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

export default withRouter(connect(mapStateToProps)(App));
