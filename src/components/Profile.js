import React, { Component } from 'react';
import ProfilePic from './ProfilePic';
import ProfilePicUpload from './ProfilePicUpload';

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
        this.props.setBio(this.state.bio, this.props.id);
    }

    toggleBio() {
        this.setState({ showBioInput: !this.state.showBioInput });
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
                    <ProfilePic imgurl={this.props.imgurl} />
                </div>
                <div className="user-data">
                    <h2>
                        {this.props.first} {this.props.last}
                    </h2>
                    <div className="user-bio">
                        <div>
                            {this.props.bio} <button onClick={this.toggleBio}>Edit bio</button>
                        </div>
                        <div>
                            <ProfilePicUpload uploadFile={e => this.props.uploadFile(e)} />
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
                    {/* <button onClick={this.props.setBio} /> */}
                </div>
            </div>
        );
    }
}

export default Profile;
