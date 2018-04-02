import { LOGIN_REQUESTED, LOGIN_FAILED, LOGIN_SUCCESS } from '../constants/login-action-type';
import XHR from '../../utilities/services/xhr';
import { push } from 'react-router-redux';
import { loaderOn, loaderOff } from '../../utilities/loader/action/loader-action';
import { alertHide, alertShow } from '../../utilities/alert/action/alert-action';
var CryptoJS = require("crypto-js");


export function login(loginCredentialObject, route) {
    return (dispatch, getState) => {
        dispatch(loaderOn());
        makeLoginRequest(loginCredentialObject)
            .then(respnse => {
                afterLoginSuccess(respnse, route)(dispatch);
            })
            .catch(e => {
                afterLoginFailure(e)(dispatch);
            })
    }
}

export const afterLoginSuccess = (response, route) => {
    console.log('login Response..', response);
    return dispatch => {
        // var bytes = CryptoJS.AES.decrypt(response.email.toString(), '0123456789012345');
        // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        // console.log('plaintext', plaintext);
        dispatch({
            type: LOGIN_SUCCESS,
            payload:
                {
                    loginUser: {
                        email: response.email,
                        name: `${response.fstNme}  ${response.lstNme}`,
                        id: response.userId,
                        token: response.token
                    },
                    navigationMenu: response.privilege
                }
        })
        // dispatch(push('/home'));
        dispatch(loaderOff());
        route.push('/home');
        dispatch(alertShow({ messageType: 'Success', content: `Welcome back ${response.fstNme} ${response.lstNme} !` }))
        setTimeout(
            function () {
                dispatch(alertHide());
            }, 3000
        )
    }
}

export const afterLoginFailure = (error) => {
    console.log('error in log in ', error);
    return dispatch => {
        dispatch({ type: LOGIN_FAILED, payload: { error } });
        dispatch(loaderOff());
        dispatch(alertShow({ messageType: 'Error', content: error['response']['data']['status']['errors'][0].message }));
        setTimeout(
            function () {
                dispatch(alertHide());
            }, 5000
        )
    }
}

export const makeLoginRequest = (obj) => {
    let params = {
        "email": obj.useremail + "" ,
        "password": obj.password
    }
    return XHR.api(params, "bq/v1/login", "POST", {"content-type":"application/json"}).then(response => {
        return response.data.data;
    });
}