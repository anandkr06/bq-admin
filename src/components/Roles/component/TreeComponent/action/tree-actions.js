export function selectedCheckedValueAction(data) {
     return (dispatch) => {
        return (dispatch) => {
            dispatch({ type: "SET_CHECKED_VALUES", payload: { checkedOptions : data} });
      }
    }
}