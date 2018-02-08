import React, { Component } from 'react';
import axios from '../config/axios';

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        axios
            .post('/savePost', this.state)
            .then(({ data }) => {
                location.replace('/');
            })
            .catch(err => {
                console.log(err);
                return this.setState({
                    error: 'error',
                });
            });
    }

    render() {
        return (
            <div className="post-form">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Title
                            <input type="text" name="title" onChange={this.handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Text
                            <textarea type="text" name="content" onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        );
    }
}

export default PostForm;
