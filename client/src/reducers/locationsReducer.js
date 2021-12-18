const object = [{ id: 1, days: [] }, { id: 2, days: [] }];

const locationReducer = (state = object, action) => {
    switch (action.type) {
        case 'ADD_TEMPORARY_LOCATIONS':
            return state.map(s => s.id === action.id ? { ...s, days: action.days } : s);
        case 'ADD_LOCATION_DAY':
            return state.map(s => s.id === action.id ? { ...s, days: [...s.days].concat(action.day) } : s);
        case 'REMOVE_LOCATION_DAY':
            const modifiedLocation = state[action.id - 1].days.filter(d => d !== action.day);
            return state.map(s => s.id === action.id ? { ...s, days: modifiedLocation } : s);
        case 'RESET_LOCATION':
            return state = object;
        default:
            return state;
    }
}

export { locationReducer as default }