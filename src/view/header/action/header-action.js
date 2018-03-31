import { SET_HEADER_LABEL,GET_HEADER_LABEL } from '../constant/header-action-constant'; 

export const setHeader = (label) => {
    return dispatch => dispatch({ type :  SET_HEADER_LABEL , payload:{label} });
}

