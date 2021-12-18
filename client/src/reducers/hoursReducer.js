const hoursReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_HOURS_CALL':
            return [
                ...state,
                {
                    id: action.id,
                    days_keeper: action.days
                }
            ]
        case 'ADDICTIONAL_HOURS':
            return state.map(s => s.id === action.cId ? { ...s, days_keeper: [ ...s.days_keeper, { day: action.day, hours: action.hours }] } : s);
        case 'MODIFIED_HOURS':
            return state.map(s => s.id === action.cId ? { ...s, days_keeper: [ ...s.days_keeper, Object.assign(action.structure, { ...action.structure, hours: action.hours }) ].slice(0, -1) } : s);
        case 'CREATE_ANOTHER_ARRAY':
            return [
                ...state,
                {
                    id: action.id,
                    days_keeper: []
                }
            ]
        case 'RESET_CHARGE':
            return [];
        default:
            return state;
    }
}

export { hoursReducer as default }