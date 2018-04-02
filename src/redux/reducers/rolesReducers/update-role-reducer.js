import {
    SET_ROLE_EDIT_FORM_DATA,
    UPDATE_ROLE_FAILURE,
    UPDATE_ROLE_SUCCESS,
    HIDE_SCOPE_TREE_COMPONENT,
    HIDE_RESOURCES_TREE_COMPONENT
} from '../../constants/roles-action-type';


const initialState = {
    editRoleFormData : {},
    error:{},
    hideScopeTreeAfterUpdate : false,
    hideResourcesTreeAfterUpdate : false
}

export const setEditRoleFormReducer = ( state = initialState ,action) => {
    switch (action.type) {
      case   SET_ROLE_EDIT_FORM_DATA:
        return {
          ...state,
          editRoleFormData : action.payload.editRoleFormData
        }
  
      default:
        return state
    }
}

export const hideScopeTreeComponentReducer = ( state = initialState ,action) => {
  switch (action.type) {
    case   HIDE_SCOPE_TREE_COMPONENT:
      return {
        ...state,
        hideScopeTreeAfterUpdate : action.payload.flag 
      }

    default:
      return state
  }
}

export const hideResourcesTreeComponentReducer = ( state = initialState ,action) => {
  switch (action.type) {
    case    HIDE_RESOURCES_TREE_COMPONENT:
      return {
        ...state,
        hideResourcesTreeAfterUpdate : action.payload.flag 
      }

    default:
      return state
  }
}

export const updateRoleReducer = ( state = initialState ,action) => {
    switch (action.type) {
  
      case  UPDATE_ROLE_FAILURE:
        return {
          ...state,
          error : action.payload.error
        }
  
      default:
        return state
    }
  }



