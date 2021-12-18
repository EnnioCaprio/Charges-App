const locationChargeReducer = (state = [], action) => {
    switch (action.type) {
        case 'CREATE_LOCATION_PAYLOAD':
            return [
                ...state,
                {
                    id: action.id,
                    location_period: action.location_period,
                    days_location: [],
                    id_location: action.id_location,
                    id_employee: action.id_employee
                }
            ]
        case 'CREATE_LOCATION_CALL':
            return [
                ...state,
                {
                    id: action.id,
                    location_period: action.location_period,
                    days_location: action.days_location,
                    id_location: action.id_location,
                    id_employee: action.id_employee
                }
            ]
        case 'UPDATE_LOCATION_PAYLOAD':
            return state.map(s => s.id === action.id ? { ...s, days_location: action.days } : s);
        case 'RESET_LOCATION':
            return [];
        default:
            return state;
    }
}

export { locationChargeReducer as default }