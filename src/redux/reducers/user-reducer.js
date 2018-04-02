import {USER_CREATE_SUCCESS, USER_CREATE_FAILED, FETCH_LIST_SUCCESS, FETCH_LIST_FAILED, FETCH_USER_LIST_SUCCESS, FETCH_USER_LIST_FAILED, FETCH_LOCALE_LIST_SUCCESS, FETCH_LOCALE_LIST_FAILED, FETCH_TABLE_COLUMNS_SUCCESS, FETCH_TABLE_COLUMNS_FAILED, RELOAD_FORM_FOR_EDIT} from '../constants/user-action-type';


const initialState = {
    createdUserData: {},
    error: {},
    celebrityList : [],
    allUserList : [],
    viewUserColumns : [{
      Header: 'Id',
      accessor: 'userId' // String-based value accessors!
    },{
      Header: 'First Name',
      accessor: 'fstNme' // String-based value accessors!
      ,id : 'firstname'
      // ,filterMethod: (filter, rows) =>
      //   matchSorter(rows, filter.value, { keys: ["firstname"] }),
      // filterAll: true
    },{
      Header: 'Last Name',
      accessor: 'lstNme' // String-based value accessors!
    },{
      Header: 'Email',
      accessor: 'email' // String-based value accessors!
    },{
      Header: 'Status',
      accessor: 'status' // String-based value accessors!
    }],
    allLocaleList : [],
    allRoleList : []

  }

export const createUserReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_CREATE_SUCCESS:
        return {
          ...state,
          createdUserData : action.payload.createdUserData
        }
  
      case USER_CREATE_FAILED:
        return {
          ...state,
          error:action.payload.error
        }
  
      default:
        return state
    }
  }

  export const getCelebrityListReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_LIST_SUCCESS:
        return {
          ...state,
          celebrityList : action.payload.celebrityList
        }
  
      case FETCH_LIST_FAILED:
        return {
          ...state,
          error:action.payload.error
        }
  
      default:
        return state
    }
  }

  export const getAllUserListReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_LIST_SUCCESS:
        return {
          ...state,
          allUserList : action.payload.allUserList
        }
  
      case FETCH_USER_LIST_FAILED:
        return {
          ...state,
          error:action.payload.error
        }
  
      default:
        return state
    }
  }

  export const getAllLocaleListReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_LOCALE_LIST_SUCCESS:
        return {
          ...state,
          allLocaleList : action.payload.localeList
        }
  
      case FETCH_LOCALE_LIST_FAILED:
        return {
          ...state,
          error:action.payload.error
        }
  
      default:
        return state
    }
  }


  export const getViewUserColumnsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TABLE_COLUMNS_SUCCESS:
        return {
          ...state,
          viewUserColumns : action.payload.viewUserColumns
        }
  
      case FETCH_TABLE_COLUMNS_FAILED:
        return {
          ...state,
          error:action.payload.error
        }
  
      default:
        return state
      }
    }

    export const loadEditUserDataReducer = (state = initialState, action) => {
      switch (action.type) {
        case RELOAD_FORM_FOR_EDIT:
          return {
            ...state,
            editFormData : action.payload.editFormData
          }
        default:
          return state
        }
      }

      export const fetchAllRoleListReducer = (state = initialState, action) => {
      switch (action.type) {
        case "FETCH_ROLE_LIST_SUCCESS":
          return {
            ...state,
            allRoleList : action.payload.allRoleList
          }
        default:
          return state
        }
      }