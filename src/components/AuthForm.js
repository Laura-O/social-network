import React, { Component } from 'react';

class AuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInput(e) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(e) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    render() {
        const Component = this.props.component;
        return (
            <div>hi!</div>
            // <Component
            //     error={this.state.error}
            //     handleInput={e => this.handleInput(e)}
            //     handleSubmit={e => this.handleSubmit(e)}
            // />
        );
    }
}

function LoginForm({ handleInput, handleSubmit, error }) {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Email:
                    <input type="text" />
                </label>
                <label>
                    Password:
                    <input type="password" />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <div>
                Not a member? <a href="#">Register</a>
            </div>
        </div>
    );
}

function RegistrationForm({ handleInput, handleSubmit, error }) {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    First Name:
                    <input type="text" value={this.state.value} onChange={this.handleInput} />
                </label>
                <label>
                    Last Name:
                    <input type="text" />
                </label>
                <label>
                    Email:
                    <input type="text" />
                </label>
                <label>
                    Password:
                    <input type="password" />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <div>
                Already a member? <Link to="/login">Log in!</Link>
            </div>
        </div>
    );
}

export default AuthForm;
