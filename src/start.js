import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo.js';
import RegistrationForm from './components/Registration.js';
import Welcome from './components/Welcome.js';
import './css/index.css';

let component;

location.pathname === '/welcome' ? (component = <Welcome />) : (component = <Logo />);

ReactDOM.render(component, document.querySelector('main'));
