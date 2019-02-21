import React, { Component } from 'react';
import './App.css';

import TemplateNav from './components/UI/TemplateNav/TemplateNav';

class App extends Component {

    state = {
    }

    render() {

        return (
            <div className="App container-fluid">
                <TemplateNav />
            </div>
        );
}
}

export default App;
