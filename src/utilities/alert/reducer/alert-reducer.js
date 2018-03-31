import { 
    ALERT_HIDE,
    ALERT_SHOW
} from '../constant/alert-constant';

const initialState = {
    isAlertVisible:false,
    alertData:{}
}

export const alertReducer = (state = initialState, action) => {
    switch (action.type) {
      case ALERT_SHOW:
        return {
          ...state,
          isAlertVisible : true,
          alertData : action.payload.dataConfig
        }
  
      case ALERT_HIDE:
        return {
          ...state,
          isAlertVisible : false,
          alertData : {}
        }
  
      default:
        return state
    }
  }
  