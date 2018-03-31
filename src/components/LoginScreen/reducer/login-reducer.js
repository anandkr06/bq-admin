import {LOGIN_FAILED,LOGIN_SUCCESS} from '../constant/action-type';

const initialState = {
    loginUser: {},
    navigationMenu: {},
    loginError: {}
  }

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          loginUser : action.payload.loginUser,
          navigationMenu : action.payload.navigationMenu
        }
  
      case LOGIN_FAILED:
        return {
          ...state,
          loginError:action.payload.error
        }
  
      default:
        return state
    }
  }
  

