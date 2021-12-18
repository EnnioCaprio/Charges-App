const loginReducer = (state = false, action) => {
    switch(action.type){
        case 'LOGIN':
            return action.data;
        case 'LOGOUT':
            return action.data;
        default:
            return state;
    }
}

export {loginReducer as default}