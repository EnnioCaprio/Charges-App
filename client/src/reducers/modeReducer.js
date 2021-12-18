const modeReducer = (state = { page: 'charge', active: false }, action) => {
    switch(action.type){
        case 'UPDATE_MODE':
            return state = {
                page: action.page,
                active: action.active
            }
        case 'RESET_MODE':
            return {
                page: 'charge',
                active: false
            }
        default:
            return state;
    }
}

export {modeReducer as default}