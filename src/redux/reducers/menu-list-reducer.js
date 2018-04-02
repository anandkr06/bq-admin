import {ACTIVE_VIEW} from '../constants/menuList-action-type';

const initialState = {
    activeViewObject : {}
  }

export const activeViewReducer = (state = initialState, action) => {
    switch (action.type) {
      case ACTIVE_VIEW:
        return {
          ...state,
          activeViewObject : action.payload.activeView
        }
  
      default:
        return state
    }
}