import {
    GET_ROLES_RECORDS_FAILURE,
    GET_ROLES_RECORDS_SUCCESS
} from '../../constants/roles-action-type';

import { loaderOn, loaderOff } from '../../../utilities/loader/action/loader-action';
import { alertShow, alertHide } from '../../../utilities/alert/action/alert-action';

//import RoleApi from '../api';
import XHR from '../../../utilities/services/xhr';

/**
 * @author: shivangi_upadhyay
 * @description: get all roles records in table grid.
 * @argument: no arguments.
 */

export function allRolesRecords() { 
    return (dispatch, getState) => {
        dispatch(loaderOn());
        getAllRolesRecords(getState().userLoginInfo)
            .then(respnse => {
                afterAllRolesRecordsSuccess(respnse)(dispatch);
            })
            .catch(e => {
                afterAllRolesRecordsFailure(e)(dispatch);
            })
    }
}

export const getAllRolesRecords = (obj) => {
    let  header  =  {
        token: obj.loginUser.token.access_token,
        scope:  'Fetch-Roles'
    }
    //*************get all roles records*******************/
    return XHR.api({}, "bq/v1/role/fetch/", "GET", header).then(response => {
        return response;
    });
}

export const afterAllRolesRecordsSuccess = (response) => {
    return dispatch => {
        console.log('afterAllRolesRecordsSuccess', response);
        dispatch(loaderOff());
        dispatch({ type: GET_ROLES_RECORDS_SUCCESS, payload: { roles: response.data.data } });
    }
}

export const afterAllRolesRecordsFailure = (error) => {
    console.log('Error in get all Roles Records action');
    return dispatch => {
        dispatch(loaderOff());
        dispatch(alertShow({ messageType: 'Error', content: `Error in getting all Roles Records due to ${error['response']['data']['status']['errors'][0].message}` }));
        setTimeout(
            function () {
                dispatch(alertHide());
            }, 5000
        )
        dispatch({ type: GET_ROLES_RECORDS_FAILURE, payload: { error } });
    }
}


