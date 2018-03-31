import { SET_HEADER_LABEL,GET_HEADER_LABEL } from '../constant/header-action-constant';

const initialState = {
    headerTitle: null 
  }

export const headerReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_HEADER_LABEL:
        return {
          ...state,
          headerTitle : action.payload.label
        }
  
      case GET_HEADER_LABEL:
        return {
          ...state
        }
  
      default:
        return state
    }
  }