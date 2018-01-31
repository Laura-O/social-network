import React, { Component } from 'react';
import axios from 'axios';
import Logo from './Logo.js';
import Registration from './Registration.js';
import Welcome from './Welcome.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get('/user').then(({ data }) => {
            console.log(data);
            this.setState({ first: data.first, last: data.last, id: data.id });
            console.log(this.state);
        });
    }

    render() {
        return (
            <div className="container">
                <div>I'm the app component</div>
                <Logo />
                {/* <Welcome /> */}
                {/* <Registration /> */}
            </div>
        );
    }
}

export default App;
