import React, { Component } from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    Link,
    withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from '../config/axios';
import { addCurrentUser, changeBio } from '../actions/index';
import Logo from '../components/Logo.js';
import Registration from '../components/Registration.js';
import Welcome from '../components/Welcome.js';
import Profile from './Profile.js';
import ProfilePic from '../components/ProfilePic.js';
import ProfilePicUpload from './ProfilePicUpload.js';
import Navbar from '../components/Navbar';
import Chat from '../containers/Chat';
import ViewProfile from './ViewProfile.js';
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

        this.state = {};
    }

    componentDidMount() {
        getSocket();
        axios.get('/getUser').then(({ data }) => {
            this.props.addCurrentUser(data);
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
                    error: 'Something went wrong. Please try again!'
                });
            });
    }

    render() {
        return (
            <div className="main-container">
                <Navbar imgurl={this.props.user.profilepicurl} />
                <div className="main-wrapper">
                    <hr />

                    <Route
                        exact
                        path="/"
                        render={() => <Profile id={this.state.id} />}
                    />
                    <Route path="/friends" component={FriendList} />
                    <Route path="/user/:id" component={ViewProfile} />
                    <Route path="/online" component={OnlineUsers} />
                    <Route path="/chat" component={Chat} />
                </div>
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
            addCurrentUser
        },
        dispatch
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
