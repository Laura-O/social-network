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
            first: '',
            last: '',
            profilepic: '',
        };
    }

    componentDidMount() {
        axios.get('/user').then(({ data }) => {
            this.setState({
                first: data.first,
                last: data.last,
                id: data.id,
                profilepic: data.profilepicurl,
            });
        });
    }

    showUploader() {
        this.setState({ showUploader: true });
    }

    uploadFile(e) {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        axios
            .post('/files', formData)
            .then(serverResponse => {
                this.setState(serverResponse.data);
                this.removeInfo();
            })
            .catch(err => {
                this.setState({
                    error: 'Something went wrong. Please try again!',
                });
            });
    }

    render() {
        let uploader = null;
        if (this.state.showUploader) {
            uploader = <ProfilePicUpload uploadFile={e => this.uploadFile(e)} />;
        }

        return (
            <div className="container">
                <div className="top">
                    <Logo />
                    <ProfilePic
                        imgurl={this.state.profilepic}
                        uploaderVisible={this.uploaderVisible}
                        showUploader={e => this.showUploader(e)}
                    />
                </div>
                <div>{uploader}</div>
                <Route
                    path="/"
                    render={() => (
                        <Profile
                            id={this.state.id}
                            first={this.state.first}
                            last={this.state.last}
                            profilePic={this.state.profilePic}
                            bio={this.state.bio}
                            setBio={this.setBio}
                        />
                    )}
                />
            </div>
        );
    }
}

export default App;
