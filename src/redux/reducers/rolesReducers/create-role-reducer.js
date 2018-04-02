import { 
  ROLE_RESOURCES_REQUEST,
  ROLE_RESOURCES_SUCCESS,
  ROLE_RESOURCES_FAILURE,

  ROLE_SCOPES_SUCCESS,
  ROLE_SCOPES_FAILURE,

  ROLE_RESET_RESOURCES,
  ROLE_SELECTED_RESOURCES,

  ROLE_RESET_SCOPES,
  ROLE_SELECTED_SCOPES

} from '../../constants/roles-action-type';

const initialResourceState = {
   roleResourcesData : [],
   roleResourcesError : {}
}

const initialScopesState = {
   roleScopeData:[],
   roleScopeError:{}
}

const initialSelectedScopesState = {
  selectedScopes : []
}

const initialSelectedResourcesState = {
  selectedResources : []
}

export const roleResourcesReducer = (state = initialResourceState, action) => {
    switch (action.type) {
      case ROLE_RESOURCES_SUCCESS:
        return {
          ...state,
          roleResourcesData : action.payload.resources
        }
  
      case ROLE_RESOURCES_FAILURE:
        return {
          ...state,
          roleResourcesError : action.payload.error
        }
  
      default:
        return state
    }
  }

  export const roleScopesReducer = (state = initialScopesState, action) => {
    switch (action.type) {
      case ROLE_SCOPES_SUCCESS:
        return {
          ...state,
          roleScopeData : action.payload.scopes
        }
  
      case ROLE_SCOPES_FAILURE:
        return {
          ...state,
          roleScopeError : action.payload.error
        }
  
      default:
        return state
    }
  }

  export const selectedRoleScopesReducer = ( state = initialSelectedScopesState ,action) => {
    switch (action.type) {
      case ROLE_SELECTED_SCOPES:
        return {
          ...state,
          selectedScopes : action.payload.selectedScopes
        }
  
      case ROLE_RESET_SCOPES:
        return {
          ...state,
          selectedScopes : []
        }
  
      default:
        return state
    }
}

export const selectedRoleResourcesReducer = ( state = initialSelectedResourcesState ,action) => {
  switch (action.type) {
    case ROLE_SELECTED_RESOURCES:
      return {
        ...state,
        selectedResources : action.payload.selectedResources
      }

    case ROLE_RESET_RESOURCES:
      return {
        ...state,
        selectedResources : []
      }

    default:
      return state
  }
}