import { ACTIVE_VIEW } from '../constant/action-type';

export const setActiveView = function(key){
       return (dispatch) => dispatch({ type : ACTIVE_VIEW , payload : { activeView : key } });
}