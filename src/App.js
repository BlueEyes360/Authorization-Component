import React, { Component } from 'react';
import './App.css';

import Input from './components/UI/Forms/Input/Input';
import Auth from './containers/Auth/Auth';
class App extends Component {


    render() {
        return (
            <div className="App">
                <Auth />
            </div>
        );
}
}

export default App;
