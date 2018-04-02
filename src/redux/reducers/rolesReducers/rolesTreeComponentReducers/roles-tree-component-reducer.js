const initialState = {
    createdUserData: {}
}

export const checkedOptionsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_CHECKED_VALUES":
        return {
          ...state,
          checkedOptions : action.payload.checkedOptions
        }
  
      case "SET_CHECKED_VALUES_FAILED":
        return {
          ...state,
          error:action.payload.error
        }
  
      default:
        return state
    }
  }