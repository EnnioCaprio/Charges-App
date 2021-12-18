const totalHoursReducer = (state = [], action) => {
    switch(action.type){
        case 'ACCUMULATE_HOURS':
            return [
                ...state,
                {
                    id: action.id,
                    hours: action.hours
                }
            ]
        case 'UPDATE_ACCUMULATED_HOURS':
            return state.map(s => s.id === action.id ? {...s, hours: s.hours + action.hours} : s)
        case 'RESET_CHARGE':
            return [];
        default:
            return state;
    }
}

export {totalHoursReducer as default}