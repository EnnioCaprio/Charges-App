const confirmReducer = (state = false, action) => {
    switch(action.type){
        case 'ADD_CONFIRM':
            return action.data;
        case 'REMOVE_CONFIRM':
            return action.data;
        default:
            return state;
    }
}

export {confirmReducer as default}