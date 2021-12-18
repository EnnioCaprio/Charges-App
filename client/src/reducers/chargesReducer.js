const chargesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CHARGE':
            return [
                ...state,
                {
                    id: action.id,
                    fullname: action.fullName
                }
            ]
        case 'UPDATE_CHARGE':
            return state.map(s => s.id === action.id ? {...s, fullname: action.fullname} : s);
        case 'RESET_CHARGE':
            return [];
        default:
            return state;
    }
}

export { chargesReducer as default }