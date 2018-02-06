import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { BrowserRouter, HashRouter, Link, Route } from 'react-router-dom';

import Logo from './components/Logo.js';
import Registration from './components/Registration.js';
import Login from './components/Login.js';
import Profile from './components/Profile.js';
import Welcome from './components/Welcome.js';
import App from './components/App.js';
import rootReducer from './reducers/index';

import './css/index.css';

const store = createStore(rootReducer, applyMiddleware(reduxPromise));

let guestRouter = (
    <HashRouter>
        <Welcome />
    </HashRouter>
);

let userRouter = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

let router = location.pathname === '/welcome' ? guestRouter : userRouter;

ReactDOM.render(router, document.querySelector('main'));
