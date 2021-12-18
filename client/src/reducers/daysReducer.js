const daysReducer = (state = null, action) => {
    switch(action.type){
        case 'ADD_DAYS_INFO':
            return {
                periodLength: action.periodLength,
                period: action.period,
                weekDaysNames: action.weekDaysNames
            }
        case 'RESET_DAYS_INFO':
            return null;
        default:
            return state;
    }
}

export {daysReducer as default}