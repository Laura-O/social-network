import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getSocket from '../socket';

class OnlineUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.newMessage.addEventListener('keydown', this.onKeyDown);
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
                    <div>
                        bla
                        {/* {message.user} {message.message} */}
                    </div>
                );
            });

        return (
            <div className="chat-wrapper">
                <div>
                    <h2>Chat</h2>
                </div>
                <div className="chat-container">
                    {this.props.chatMessages && renderChatMessages()}
                </div>
                <textarea name="newMessage" ref={newMessage => (this.newMessage = newMessage)} />
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
