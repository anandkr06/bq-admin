import { LOADER_ON,LOADER_OFF } from '../constant/loader-action-constant';

export const loaderOn = () => {
    return dispatch => dispatch({ type: LOADER_ON });
}

export const loaderOff = () => {
    return dispatch => dispatch({ type: LOADER_OFF });
}