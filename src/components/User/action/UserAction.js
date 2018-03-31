import Service from '../Service';
import { loaderOn , loaderOff  } from '../../../utilities/loader/action/loader-action';
import {constants} from '../constant/constants';
import {USER_CREATE_SUCCESS, USER_CREATE_FAILED, FETCH_LIST_SUCCESS, FETCH_LIST_FAILED, FETCH_USER_LIST_SUCCESS, FETCH_USER_LIST_FAILED, FETCH_LOCALE_LIST_SUCCESS, FETCH_LOCALE_LIST_FAILED, RELOAD_FORM_FOR_EDIT} from '../constant/constants';
import {reset} from 'redux-form';
import { alertHide , alertShow } from '../../../utilities/alert/action/alert-action';
var md5 = require('md5');
var CryptoJS = require("crypto-js");

export function createUserAction(data) {
    //adding some mock fields 
    data["role"] = parseInt(data.role.val);
    data["createdBy"] =  124;
	data["createdAt"] =  "Monday, 16-Feb-18 10:30:44 IST";
	data["updatedBy"] =  125;
    data["updatedAt"] = "Monday, 16-Feb-18 10:30:44 IST";
    data["status"] = parseInt(data.status.id);
    data["pwd"] = md5(data.pwd);

    delete data["passwordConfirm"];
//    delete data["userPassword"];
    console.log('create user data',data);
    return (dispatch, getState) => {
        dispatch(loaderOn());
        new Service().createUser(data, getState().userLoginInfo).then(response => {
            console.log(response.data);
            dispatch(loaderOff());
            dispatch(alertShow({messageType:'Success',content:"User created successfully."}));
            dispatch(reset('userForm'));
            setTimeout(
                function(){ 
                    dispatch(alertHide());
                }, 5000
            )
        })
        .catch(e => {
            console.log("Error in creating user",e);
            dispatch(loaderOff());
            dispatch(alertShow({messageType:'Error',content:`Error in creating user due to ${e['response']['data']['status']['errors'][0].developerMessage}`}));
            setTimeout(
                function(){ 
                    dispatch(alertHide());
                }, 5000
            )
        })
    }
}

export function updateUserAction(data){
    delete data["passwordConfirm"];
//    delete data["userPassword"];
    data["role"] = (data.role.val) ? parseInt(data.role.val) : parseInt(data.role);
    data["status"] = (data.status.id) ? parseInt(data.status.id) : parseInt(data.status);
    return (dispatch, getState) => {
            dispatch(loaderOn());
        new Service().updateUser(data, getState().userLoginInfo).then(response => {
            console.log(response.data);
            dispatch(loaderOff());
            dispatch(alertShow({messageType:'Success',content:'User updated successfully'}));
            //dispatch(reset('userForm'));
            dispatch(editUserFormAction( []));
            setTimeout(
                function(){ 
                    dispatch(alertHide());
                }, 5000
            )
        })
        .catch(e => {
            dispatch(loaderOff());
            console.log("Error in updating user");
            dispatch(alertShow({messageType:'Error',content:`Error in updating user due to ${e['response']['data']['status']['errors'][0].message}`}));
            setTimeout(
                function(){ 
                    dispatch(alertHide());
                }, 5000
            )
        })
    }
}

export function fetchCelebrityListAction() {
    return (dispatch, getState) => {
        //dispatch(loaderOn());
        new Service().getCelebrityList(getState().userLoginInfo).then(response => {
            dispatch({ type: FETCH_LIST_SUCCESS, payload: { celebrityList : response.data.data} });
            console.log(response.data);
        })
        .catch(e => {
            console.log("Error in fetching list");
            dispatch(alertShow({messageType:'Error',content:`Error in fetching celebrity list due to ${e['response']['data']['status']['errors'][0].message}`}));
            setTimeout(
                function(){ 
                    dispatch(alertHide());
                }, 5000
            )

        })
    }
}

export function fetchAllLocaleListAction() {
    return (dispatch, getState) => {
        dispatch(loaderOn());
        new Service().getAllLocaleList(getState().userLoginInfo).then(response => {
            dispatch({ type: FETCH_LOCALE_LIST_SUCCESS, payload: { localeList : response.data.data} });
            dispatch(loaderOff());
            console.log(response.data);
        })
        .catch(e => {
            dispatch(loaderOff());
            console.log("Error in fetching list");
            dispatch(alertShow({messageType:'Error',content:`Error in fetching all locale list due to ${e['response']['data']['status']['errors'][0].message}`}));
            setTimeout(
                function(){ 
                    dispatch(alertHide());
                }, 5000
            )

        })
    }
}


export function viewAllUsersAction() {
    return (dispatch, getState) => {
        dispatch(loaderOn());
        new Service().getAllUserList(getState().userLoginInfo).then(response => {
            dispatch({ type: FETCH_USER_LIST_SUCCESS, payload: { allUserList : response.data.data} });
            dispatch(loaderOff());
            console.log(response);
        })
        .catch(e => {
            dispatch(loaderOff());
            console.log("Error in fetching user list");
            dispatch(alertShow({messageType:'Error',content:`Error in fetching all user list due to ${e['response']['data']['status']['errors'][0].message}`}));
            setTimeout(
                function(){ 
                    dispatch(alertHide());
                }, 5000
            )
        })
    }
}

export function editUserFormAction(data) {
    //data.languagePref = [data.languagePref];
    return (dispatch) => {
          dispatch({ type: RELOAD_FORM_FOR_EDIT, payload: { editFormData : data} });
    }
}

export function fetchAllRoleListAction() {
    return (dispatch, getState) => {
        dispatch(loaderOn());
        new Service().getAllRoleList(getState().userLoginInfo).then(response => {
            dispatch({ type: "FETCH_ROLE_LIST_SUCCESS", payload: { allRoleList : response.data.data} });
            dispatch(loaderOff());
            console.log(response.data);
        })
        .catch(e => {
            dispatch(loaderOff());
            dispatch(alertShow({messageType:'Error',content:`Error in fetching all role list due to ${e['response']['data']['status']['errors'][0].message}`}));
            setTimeout(
                function(){ 
                    dispatch(alertHide());
                }, 5000
            )
            console.log("Error in fetching list");
        })
    }
}
