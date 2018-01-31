import React from 'react';
import axios from 'axios';

export default function(Component, url) {
    return class AuthForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        handleChange(event) {
            console.log(event);
            this.setState({
                [event.target.name]: event.target.value,
            });
        }

        handleSubmit(event) {
            event.preventDefault();
            axios
                .post(url, this.state)
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
                <Component
                    error={this.state.error}
                    handleChange={event => this.handleChange(event)}
                    handleSubmit={event => this.handleSubmit(event)}
                />
            );
        }
    };
}
