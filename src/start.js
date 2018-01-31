import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter, Link, Route } from 'react-router-dom';
import Logo from './components/Logo.js';
import Registration from './components/Registration.js';
import Login from './components/Login.js';
import Profile from './components/Profile.js';
import Welcome from './components/Welcome.js';
import App from './components/App.js';
import './css/index.css';

let guestRouter = (
    <HashRouter>
        <Welcome />
    </HashRouter>
);

let userRouter = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

let router = location.pathname === '/welcome' ? guestRouter : userRouter;

ReactDOM.render(router, document.querySelector('main'));
