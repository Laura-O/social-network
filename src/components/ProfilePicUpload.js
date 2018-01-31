import React, { Component } from 'react';

class ProfilePicUpload extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="picture-upload">
                <div>Want to change your image?</div>
                <label>
                    Upload
                    <input type="file" name="file" onChange={this.props.uploadFile} />
                </label>
            </div>
        );
    }
}

export default ProfilePicUpload;
