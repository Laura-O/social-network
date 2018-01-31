import React, { Component } from 'react';
import axios from 'axios';
import Logo from './Logo.js';
import Registration from './Registration.js';
import Welcome from './Welcome.js';
import ProfilePic from './ProfilePic.js';
import ProfilePicUpload from './ProfilePicUpload.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get('/user').then(({ data }) => {
            console.log(data);
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
        console.log('clicked');
    }

    render() {
        let uploader = null;
        if (this.state.showUploader) {
            uploader = <ProfilePicUpload />;
        }
        return (
            <div className="container">
                <div className="top">
                    <Logo />
                    <ProfilePic
                        imgurl={this.state.profilepicurl}
                        uploaderVisible={this.uploaderVisible}
                        showUploader={e => this.showUploader(e)}
                    />
                </div>
                <div>{uploader}</div>

                {/* <Welcome /> */}
                {/* <Registration /> */}
            </div>
        );
    }
}

export default App;
