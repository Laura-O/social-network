import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Login({ error, handleChange, handleSubmit }) {
    return (
        <div className="field is-horizontal">
            <form onSubmit={handleSubmit}>
                <div className="field is-horizontal">
                    <label>Email:</label>
                    <input
                        className="input"
                        type="text"
                        name="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="field is-horizontal">
                    <label>Password:</label>
                    <input
                        className="input"
                        type="password"
                        name="pass"
                        onChange={handleChange}
                    />
                </div>
                <input className="button" type="submit" value="Submit" />

                <div classname="is-horizontal">
                    Not registered? <Link to="/register">Register!</Link>
                </div>
            </form>
        </div>
    );
}

export default AuthForm(Login, '/login');
