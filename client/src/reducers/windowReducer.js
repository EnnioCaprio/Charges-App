const windowReducer = (state = { id: undefined, mode: false }, action) => {
    switch(action.type){
        case 'ACTIVE_WINDOW':
            return {
                id: action.id,
                mode: action.mode
            };
        default:
            return state;
    }
}

export { windowReducer as default }