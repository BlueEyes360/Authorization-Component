import React, { Component } from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
                touched: false,
                label: 'E-mail Address'
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
                touched: false,
                label: 'Password'
            }
        },
        formIsValid: false,
        isSignup: false,
        modalShow: false
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

    modalClose = () => this.setState({modalShow: false});

    render() {


        const formElementsArray = [];
        for( let key in this.state.controls ) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
                label: this.state.controls[key].label
            })
        }


        let form = (formElementsArray.map(formElement => (
            <Input
                label={formElement.label}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
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

        let button = <Button onClick={() => this.setState({ modalShow: true })} variant="primary" disabled={this.props.token !== null} >Sign in</Button>;

        if(this.props.token !== null) {
            button = <Button onClick={this.props.onLogout} variant="danger" >Log Out</Button>
            if(this.state.modalShow === true) {
                this.modalClose();
            }
        }



        return (
            <>
                {button}
                <Modal
                    show={this.state.modalShow}
                    onHide={this.modalClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.state.isSignup ? 'Sign Up' : 'Sign In'}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col xs={2}/>
                            <Col xs={8}>
                                {errorMessage}
                                <form>
                                    {form}
                                </form>
                            </Col>
                            <Col xs={2}/>
                        </Row>
                        <Row className="pt-sm-2">
                            <Col xs={3}/>
                            <Col xs={3}>
                                <Button className='h-100 w-100'
                                    variant="primary"
                                    // type="submit"
                                    disabled={!this.state.formIsValid}
                                    onClick={this.submitHandler}>
                                        {this.state.isSignup ? 'Create New User' : 'Log In'}
                                </Button>
                            </Col>
                            <Col xs={3}>
                                <Button
                                    variant="secondary"
                                    onClick={this.switchAuthModeHandler}>
                                        Switch to {this.state.isSignup ? 'Sign in' : 'Sign up'}
                                </Button>
                            </Col>
                            <Col xs={3}/>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);