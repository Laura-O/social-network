import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getSocket from '../socket';

class OnlineUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.renderChatMessages = this.renderChatMessages.bind(this);
    }

    componentDidMount() {
        this.newMessage.addEventListener('keydown', this.onKeyDown);
    }

    componentDidUpdate() {
        this.elem.scrollTop = this.elem.scrollHeight;
    }

    onKeyDown(e) {
        if (e.keyCode == 13) {
            let msg = e.target.value;
            e.target.value = '';
            getSocket().emit('chatMessage', msg);
        }
    }

    render() {
        const renderChatMessages = () =>
            this.props.chatMessages.map(message => {
                return (
                    <div key={message.id}>
                        {message.user.first} {message.message}
                    </div>
                );
            });

        return (
            <div className="chat-wrapper">
                <div>
                    <h2>Chat</h2>
                </div>
                <div className="chat-history" ref={elem => (this.elem = elem)}>
                    {this.props.chatMessages && renderChatMessages()}
                </div>
                <div className="chat-input">
                    <textarea
                        cols="60"
                        rows="1"
                        name="newMessage"
                        ref={newMessage => (this.newMessage = newMessage)}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        chatMessages: state.chatmessages,
    };
}

export default connect(mapStateToProps)(OnlineUsers);
