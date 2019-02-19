import axios from 'axios';

import * as actionsTypes from './actionTypes';

import { AUTHENTICATION_API_KEY } from '../../APIKeys';

export const authStart = () => {
    return {
        type: actionsTypes.AUTH_START
    }
};

export const authSuccess = (authData) => {
    return {
        type: actionsTypes.AUTH_SUCCESS,
        authData: authData
    }
};

export const authFail = (error) => {
    return {
        type: actionsTypes.AUTH_FAIL,
        error: error
    }
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + AUTHENTICATION_API_KEY;
        if(!isSignup) {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key="  + AUTHENTICATION_API_KEY;
        }
        axios.post(url, authData)
            .then(response => {
                console.log()
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    }
};