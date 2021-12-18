const overworkReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_OVERWORK':
            return [
            ...state,
            {
                charge: action.charge,
                id: action.id,
                hours: action.hours
            }
        ]
        case 'UPDATE_OVERWORK': 
            return state.map(s => s.charge === action.charge && s.id === action.id ? { ...s, hours: action.hours } : s);
        case 'RESET_CHARGE':
            return [];
        default:
            return state;
    }
}

export { overworkReducer as default }