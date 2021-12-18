const periodReducer = (state = null, action) => {
    switch(action.type){
        case 'INSERT_PERIOD':
            return action.period;
        case 'RESET_PERIOD':
            return null;
        default:
            return state;
    }
}

export {periodReducer as default}