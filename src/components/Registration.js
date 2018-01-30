import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        const { first, last, email, pass } = this.state;

        if (!(first && last && email && pass)) {
            console.log('fill form');
        } else {
            axios.post('/register', this.state).then(({ data }) => {
                if (data.success) {
                    location.replace('/');
                }
            });
        }

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        First Name:
                        <input
                            type="text"
                            value={this.state.name}
                            name="first"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            value={this.state.last}
                            name="last"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="text"
                            value={this.state.email}
                            name="email"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={this.state.pass}
                            name="pass"
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <div>
                    Already a member? <Link to="/login">Log in!</Link>
                </div>
            </div>
        );
    }
}

export default RegistrationForm;
