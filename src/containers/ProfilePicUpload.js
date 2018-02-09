import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeProfilePic } from '../actions/index';
import axios from '../config/axios';

class ProfilePicUpload extends Component {
    constructor(props) {
        super(props);

        this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFile(e) {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        axios
            .post('/files', formData)
            .then(serverResponse => {
                console.log('server response ', serverResponse.data.profilepic);
                this.props.changeProfilePic(serverResponse.data.profilepic);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="picture-upload">
                <div>Want to change your image?</div>
                <label>
                    Upload
                    <input type="file" name="file" onChange={this.uploadFile} />
                </label>
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
            changeProfilePic,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePicUpload);
