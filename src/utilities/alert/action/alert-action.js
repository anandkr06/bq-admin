import {
  
    ALERT_SHOW,
    ALERT_HIDE
} from '../constant/alert-constant';

export const alertShow = (data) => {
    return dispatch => dispatch({ type: ALERT_SHOW , payload: { dataConfig : data } });
}

export const alertHide = () => {
    return dispatch => dispatch({ type: ALERT_HIDE });
}