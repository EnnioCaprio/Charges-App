// Employee calls

const registrationMutation = `
    mutation registration_employee($name: String!, $surname: String!, $email: String!, $password: String!){
        registrationEmployee(employeeInput: {name: $name, surname: $surname, email: $email, password: $password})
    }`;

const loginMutation = `
    mutation login_employee($email: String!, $password: String!){
        loginEmployee(email: $email, password: $password)
    }`;

const readQuery = `
    query read_employee{
        getEmployeeProfile{
            id_employee,
            name,
            surname,
            email
        }
    }`;

const logOut = `
    mutation log_out{
        logoutEmployee
    }
`;

// Charges Calls

const createCharges = `
    mutation create_charges($code_charge: String!, $period: String!, $days_keeper: [DaysInputs!], $create_charge: Boolean!){
        createCharge(chargesInput: {code_charge: $code_charge, period: $period, days_keeper: $days_keeper, create_charge: $create_charge})
    }
`;

const createLocation = `
    mutation create_location($location_period: String!, $days_location: [Int!], $id_location: Int!){
        createLocation(locationInput: { location_period: $location_period, days_location: $days_location, id_location: $id_location })
    }
`

const confirmCharge = `
    mutation confirm_charges($period: String!){
        confirmCharges(period: $period)
    }
`;

module.exports = {
    registrationMutation,
    loginMutation,
    readQuery,
    logOut,
    createCharges,
    createLocation,
    confirmCharge
}