import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Login({ error, handleChange, handleSubmit }) {
    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                Not registered? <Link to="/register">Register!</Link>
            </div>
        </div>
    );
}

export default AuthForm(Login, '/login');
