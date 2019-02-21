import axios from 'axios';

import * as actionsTypes from './actionTypes';


import { AUTHENTICATION_API_KEY, FIREBASE_AUTH_BASE_URL } from '../../APIKeys';

export const authStart = () => {
    return {
        type: actionsTypes.AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionsTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

export const authFail = (error) => {
    return {
        type: actionsTypes.AUTH_FAIL,
        error: error
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const logout = () => {
    return {
        type: actionsTypes.AUTH_LOGOUT
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

        let url =  FIREBASE_AUTH_BASE_URL + "signupNewUser?key=" + AUTHENTICATION_API_KEY;
        if(!isSignup) {
            url = FIREBASE_AUTH_BASE_URL + "verifyPassword?key="  + AUTHENTICATION_API_KEY;
        }
        axios.post(url, authData)
            .then(response => {
                console.log()
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    }
};