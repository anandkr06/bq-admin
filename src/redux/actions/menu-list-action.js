import { ACTIVE_VIEW } from '../constants/menuList-action-type';

export const setActiveView = function(key){
       return (dispatch) => dispatch({ type : ACTIVE_VIEW , payload : { activeView : key } });
}