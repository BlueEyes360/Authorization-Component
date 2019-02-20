import React, { Component } from 'react';
import './App.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
