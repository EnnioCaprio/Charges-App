const employeeReducer = (state = {}, action) => {
    switch(action.type){
        case 'SAVE_PROFILE_INFORMATION':
            return{
                id_employee: action.id_employee,
                name: action.name,
                surname: action.surname,
                email: action.email
            }
        case 'RESET_PROFILE_INFORMATION':
            return {};
        default:
            return state
    }
}

export {employeeReducer as default}