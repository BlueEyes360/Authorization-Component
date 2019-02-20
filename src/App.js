import React, { Component } from 'react';
import './App.css';

import Auth from './containers/Auth/Auth';
import TemplateNav from './components/UI/TemplateNav/TemplateNav';
class App extends Component {


    render() {
        return (
            <div className="App container-fluid">
                <TemplateNav />
                <Auth />
            </div>
        );
}
}

export default App;
