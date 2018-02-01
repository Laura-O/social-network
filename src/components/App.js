import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Logo from './Logo.js';
import Registration from './Registration.js';
import Welcome from './Welcome.js';
import Profile from './Profile.js';
import ProfilePic from './ProfilePic.js';
import ProfilePicUpload from './ProfilePicUpload.js';

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
    }

    componentDidMount() {
        axios.get('/user').then(({ data }) => {
            console.log('componentdidmount', data);
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
                console.log('upload', this.state);
            })
            .catch(err => {
                this.setState({
                    error: 'Something went wrong. Please try again!',
                });
            });
    }

    setBio(e, id) {
        console.log(e, id);
        axios
            .post('/updateBio', { bio: e, id: id })
            .then(serverResponse => {
                console.log(serverResponse);
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
                <header>
                    <Logo />
                    <ProfilePic
                        imgurl={this.state.profilepic}
                        uploaderVisible={this.uploaderVisible}
                        showUploader={e => this.showUploader(e)}
                    />
                </header>
                <div className="main-wrapper">
                    <div>{uploader}</div>
                    {/* <Route
                        path="/"
                        render={() => ( */}
                    <Profile
                        id={this.state.id}
                        first={this.state.first}
                        last={this.state.last}
                        imgurl={this.state.profilepic}
                        bio={this.state.bio}
                        setBio={this.setBio}
                    />
                    {/* )}
                    /> */}
                </div>
            </div>
        );
    }
}

export default App;
