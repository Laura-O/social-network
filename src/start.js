import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo.js';
import RegistrationForm from './components/Registration.js';
import Welcome from './components/Welcome.js';
import './css/index.css';

ReactDOM.render(
    <div className="container">
        <Logo />
        <Welcome />
    </div>,
    document.querySelector('main'),
);

// function HelloWorld() {
//     return <div>Hello, World!</div>;
// }
