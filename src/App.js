import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import TemplateNav from './components/UI/TemplateNav/TemplateNav';

class App extends Component {

    state = {
    }

    componentDidMount () {
        this.props.onTryAutoSignUp();
    }

    render() {

        return (
            <div className="App container-fluid">
                <TemplateNav />
            </div>
        );
}
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    };
};

export default connect(null, mapDispatchToProps)(App);
