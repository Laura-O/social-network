import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';

class Welcome extends Component {
    render() {
        return (
            <div className="welcome">
                <img className="welcome-logo" src="/images/fz-logo.png" />
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}

export default Welcome;
