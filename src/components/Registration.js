import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Registration({ error, handleChange, handleSubmit }) {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="first" onChange={handleChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="last" onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="pass" onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <div>
                Already a member? <Link to="/login">Log in!</Link>
            </div>
        </div>
    );
}

export default AuthForm(Registration, '/register');
