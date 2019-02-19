import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Forms/Input/Input';
import Loading from '../../components/UI/Loading/Loading';

import * as actions from '../../store/actions/index';
class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignup: true
    }

    checkValidity( value, rules ) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if(rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedAuthForm = {
            ...this.state.controls
        };
        const updatedAuthElement = {
            ...updatedAuthForm[controlName]
        };
        updatedAuthElement.value = event.target.value;
        updatedAuthElement.valid = this.checkValidity(updatedAuthElement.value, updatedAuthElement.validation);
        updatedAuthElement.touched = true;
        updatedAuthForm[controlName] = updatedAuthElement;

        let formIsValid = true;
        for( let controlName in updatedAuthForm) {
            formIsValid = updatedAuthForm[controlName].valid && formIsValid;
        }

        this.setState({controls: updatedAuthForm, formIsValid: formIsValid});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })
    }

    render() {

        const formElementsArray = [];
        for( let key in this.state.controls ) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = (formElementsArray.map(formElement => (
            <div>
                <p>{formElement.config.placeholder}</p>
                <Input
                    className="form-control"
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            </div>
        )))

        if(this.props.loading) {
            form = <Loading />
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        {errorMessage}
                        <form onSubmit={this.submitHandler}>
                            {form}
                            <button className="btn btn-primary" disabled={!this.state.formIsValid}>{this.state.isSignup ? 'Create New User' : 'Log In'}</button>
                        </form>
                        <button className="btn btn-secondary" onClick={this.switchAuthModeHandler} >Switch to {this.state.isSignup ? 'Sign in' : 'Sign up'}</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);