const totalReducer = (state = [], action) => {
    switch (action.type) {
        case 'CREATE_PAYLOAD':
            return [
                ...state,
                {
                    id: action.id,
                    code_charge: action.code_charge,
                    period: action.period,
                    days_keeper: [],
                    id_employee: action.id_employee,
                    create_charge: true
                }
            ]
        case 'UPDATE_PAYLOAD':
            return state.map(s => s.id === action.id ? { ...s, days_keeper: action.days_keeper[0].days_keeper } : s);
        case 'UPDATE_PAYLOAD_CODE':
            return state.map(s => s.id === action.id ? { ...s, code_charge: action.code_charge } : s);
        case 'CREATE_PAYLOAD_CALL':
            return [
                ...state,
                {
                    id: action.id,
                    code_charge: action.code_charge,
                    period: action.period,
                    days_keeper: action.days,
                    id_employee: action.id_employee,
                    create_charge: true
                }
            ]
        case 'RESET_CHARGE':
            return [];
        default:
            return state;
    }
}

export { totalReducer as default }