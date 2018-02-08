import React, { Component } from 'react';
import axios from '../config/axios';

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get(`/getPosts/${this.props.user_id}`).then(({ data }) => {
            console.log(data);
            this.setState({
                posts: data,
            });
        });
    }

    render() {
        const renderPosts = posts => {
            return posts.map(post => {
                return (
                    <div className="user-post" key={post.id}>
                        <h3>{post.title}</h3>
                        <div className="post-content">{post.content}</div>
                    </div>
                );
            });
        };

        return (
            <div className="post-wrapper">
                <h2>User Posts</h2>
                {this.state.posts && renderPosts(this.state.posts)}
            </div>
        );
    }
}

export default PostList;
