import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo.js';
import RegistrationForm from './components/Registration.js';
import Welcome from './components/Welcome.js';
import App from './components/App.js';
import './css/index.css';

let component;

location.pathname === '/welcome' ? (component = <Welcome />) : (component = <App />);

ReactDOM.render(component, document.querySelector('main'));
