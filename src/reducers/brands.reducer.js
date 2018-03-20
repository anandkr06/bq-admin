import { brandConstants } from '../constants';

export function brands(state = {}, action) {
  switch (action.type) {
    case brandConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case brandConstants.GETALL_SUCCESS:
      return {
        items: action.brands
      };
    case brandConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}