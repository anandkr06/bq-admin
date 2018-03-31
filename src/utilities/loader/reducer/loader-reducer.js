import { LOADER_ON,LOADER_OFF } from '../constant/loader-action-constant';

const initialState = {
    isLoaderOn:null
}

export const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOADER_ON:
        return {
          ...state,
          isLoaderOn : true
        }
  
      case LOADER_OFF:
        return {
          ...state,
          isLoaderOn : false
        }
  
      default:
        return state
    }
  }
  
