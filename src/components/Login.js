import React, { Component } from 'react';

class Login extends Component {
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
        const { email, pass } = this.state;

        if (!(email && pass)) {
            console.log('fill form');
        } else {
            axios.post('/login', this.state).then(({ data }) => {
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
                    Already registered? <a href="#">Register</a>
                </div>
            </div>
        );
    }
}

export default Login;
