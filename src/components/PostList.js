import React, { Component } from 'react';
import axios from '../config/axios';

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get(`/getPosts/${this.props.user_id}`).then(({ data }) => {
            this.setState({
                posts: data
            });
        });
    }

    render() {
        const renderPosts = posts => {
            return posts.map(post => {
                return (
                    <article className="message is-dark" key={post.id}>
                        <div className="message-header">{post.title}</div>
                        <div className="message-body">{post.content}</div>
                    </article>
                );
            });
        };

        return (
            <div className="post-wrapper section">
                <h2 className="title">Posts</h2>
                {this.state.posts && renderPosts(this.state.posts)}
            </div>
        );
    }
}

export default PostList;
