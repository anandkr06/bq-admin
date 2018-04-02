
function userNavigationData(options) {
    return {
        type: 'CREATE_USER_NAVIGATION_MENU',
        payload: options
    }
}

export var Events = {CREATE_USER_NAVIGATION_MENU : userNavigationData};
