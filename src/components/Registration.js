import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Registration({ error, handleChange, handleSubmit }) {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="field is-horizontal">
                    <label className="label">First Name:</label>
                    <input
                        className="input"
                        type="text"
                        name="first"
                        onChange={handleChange}
                    />
                </div>
                <div className="field is-horizontal">
                    <label className="label">Last Name:</label>
                    <input
                        className="input"
                        type="text"
                        name="last"
                        onChange={handleChange}
                    />
                </div>
                <div className="field is-horizontal">
                    <label className="label">Email:</label>
                    <input
                        className="input"
                        type="text"
                        name="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="field is-horizontal">
                    <label className="label">Password:</label>
                    <input
                        className="input"
                        type="password"
                        name="pass"
                        onChange={handleChange}
                    />
                </div>
                <input className="button" type="submit" value="Submit" />
            </form>
            <div>
                Already a member? <Link to="/login">Log in!</Link>
            </div>
        </div>
    );
}

export default AuthForm(Registration, '/register');
