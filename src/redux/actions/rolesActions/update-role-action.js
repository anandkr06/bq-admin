import {
    SET_ROLE_EDIT_FORM_DATA,
    UPDATE_ROLE_FAILURE,
    UPDATE_ROLE_SUCCESS,
    HIDE_SCOPE_TREE_COMPONENT,
    HIDE_RESOURCES_TREE_COMPONENT
} from '../../constants/roles-action-type';

import { loaderOn, loaderOff } from '../../../utilities/loader/action/loader-action';
import { alertHide, alertShow } from '../../../utilities/alert/action/alert-action';
import XHR from '../../../utilities/services/xhr';

/**
 * @author:shivangi upadhyay
 * @description:set data for popoulating the edit form.
 * @argument:data of the table row sent to store.
 */

export function editRoleForm(data) {
    return (dispatch, getState) => {
        dispatch({ type: SET_ROLE_EDIT_FORM_DATA, payload: { editRoleFormData: prepareRoleObject(data, getState) } });
    }
}

const prepareRoleObject = (data, getState) => {
    let obj = data.roleId ? {
        'roleId': data.roleId,
        'roleName': (data.roleId) ? data.roleNme : '',
        'store': data.store,
        'roleScopes': (data.roleId) ?
            (data.store[0].children[0] && data.store[0].children[0].storeId === -1) ? 'All' : 'Custom' : 'ALL',
        'privileges': data.privilege,
        'resourceAccess': (data.roleId) ?
            (data.privilege[0].children[0] && data.privilege[0].children[0].privilId === -1) ? 'All' : 'Custom' : 'All'
    } : {};
    return obj;
}


/**
 * @author:shivangi upadhyay
 * @description:make a call of  update and store it response.
 * @argument:data of updated object to send to backend is required.
 */
export function updateRoleAction(data) {
    return (dispatch, getState) => {
        dispatch(loaderOn());
        updateRole(prepareRoleUpdateObject(data, getState), getState().userLoginInfo)
            .then(respnse => {
                afterUpdateRoleSuccess(respnse)(dispatch);
            })
            .catch(e => {
                afterUpdateRoleFailure(e)(dispatch);
            })
    }
}

export const updateRole = (data, obj) => {
    let  header  =  {
        token: obj.loginUser.token.access_token,
        scope:  'Dashboard'
    }

    let  params  =  Object.assign({},  data);

    delete  params['roleId'];
    //*************update role*******************/
    return XHR.api(params, "bq/v1/role/update/" + data.roleId, "PUT", header).then(response => {
        return response;
    });
}

const prepareRoleUpdateObject = (data, getState) => {
    let allStore = [{ 'children': [{ 'storeId': -1 }] }];
    let allPriviledges = [{ privilId: -1 }];
    console.log('prepareRoleUpdateObject', data);
    let obj = {
        "roleId": data.roleId,
        "roleNme": data.roleName || "Super Admin 2",
        "store": data.roleScopes === 'All' ? allStore : getState().selectedRoleScopes.selectedScopes,
        "privilege": data.resourceAccess === 'All' ? allPriviledges : getState().selectedRoleResources.selectedResources,
        "createdBy": 0,
        "updatedBy": getState().userLoginInfo.loginUser.id || 15
    }
    console.log('updated_role_object', obj);
    return obj;
}

export const afterUpdateRoleSuccess = (response) => {
    return dispatch => {
        console.log('afterUpdateRoleSuccess', response);
        dispatch(loaderOff());
        dispatch(alertShow({ messageType: 'Success', content: 'Updated role successfully.' }));
        editRoleForm({})(dispatch);
        hideScopeTreeComponent(true)(dispatch);
        hideResourcesTreeComponent(true)(dispatch);
        setTimeout(
            function () {
                dispatch(alertHide());
            }, 5000
        )
    }
}

export const hideScopeTreeComponent = (val) => {
    return (dispatch, getState) => {
        dispatch({ type: HIDE_SCOPE_TREE_COMPONENT, payload: { flag: val } });
    }
}

export const hideResourcesTreeComponent = (val) => {
    return (dispatch, getState) => {
        dispatch({ type: HIDE_RESOURCES_TREE_COMPONENT, payload: { flag: val } });
    }
}

export const afterUpdateRoleFailure = (error) => {
    console.log('Error in role update action', error);
    return dispatch => {
        dispatch(loaderOff());
        dispatch(alertShow({ messageType: 'Error', content: `Error in role updatation action due to ${error['response']['data']['status']['errors'][0].message}` }));
        dispatch({ type: UPDATE_ROLE_FAILURE, payload: { error } });
        setTimeout(
            function () {
                dispatch(alertHide());
            }, 5000
        )
    }
}