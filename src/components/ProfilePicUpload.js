import React, { Component } from 'react';

class ProfilePicUpload extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     profilePicUrl: this.props.imgurl || './images/default-user.jpg',
        // };
        // console.log(this.state);
    }
    render() {
        return (
            <div className="picture-upload">
                <div>Want to change your image?</div>
                <form>
                    <label>
                        Upload
                        <input type="file" name="file" />
                    </label>
                </form>
            </div>
        );
    }
}

export default ProfilePicUpload;
