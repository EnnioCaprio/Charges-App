const { gql } = require('apollo-server-express');

module.exports = gql`

    type Employee{
        id_employee: Int!
        name: String!
        surname: String!
        email: String!
        password: String!
        is_oauth: Boolean!
        deleted_employee: Boolean!
        created_at: String!
    }

    input EmployeeInput{
        name: String
        surname: String
        email: String
        password: String
    }

    type Charge{
        id_charge: Int!
        name_charge: String!
        code_charge: String!
        created_at: String!
        updated_at: String!
    }

    type ConfirmedCharges{
        id_confirmed_charge: ID!
        period: String!
        id_employee: Int!
        created_at: String!
        updated_at: String!
        active_charge: Boolean
        chargesOperations: [ChargesOperations!]
        locationOperations: [LocationOperation!]
    }

    type Days{
        day: String!
        hours: Float!
    }

    type ChargesOperations{
        id_charge_list: ID!
        code_charge: String!
        period: String!
        days_keeper: [Days!]
        id_confirmed_charge: ID
        id_employee: Int!
        create_charge: Boolean
    }

    type OperationAll{
        charge: [ChargesOperations!]
        location: [LocationOperation!]
    }

    input DaysInputs {
        day: String!
        hours: Float!
    }

    input ChargesInput{
        code_charge: String!
        period: String!
        days_keeper: [DaysInputs!]
        create_charge: Boolean!
    }

    type Location{
        id_location: Int!
        location_name: String!
    }

    type LocationOperation{
        id_location_operation: ID!
        location_period: String!
        days_location: [Int!]
        id_location: Int!
        id_confirmed_charge: ID
        id_employee: Int!
        created_at: String!
        updated_at: String!
    }

    input LocationInput{
        location_period: String!
        days_location: [Int!]
        id_location: Int!
    }

    type Query{
        getEmployeeProfile: Employee
        getTemporaryCharges(period: String!): [ChargesOperations!]
        getCharges: [Charge!]
        getConfirmedCharges(period: String!): [ConfirmedCharges!]
        getLocations: [Location!]
        getTemporaryLocations(period: String!): [LocationOperation!]
    }

    type Mutation{
        registrationEmployee(employeeInput: EmployeeInput!): Boolean!
        updateEmployee(employeeInput: EmployeeInput): Employee!
        deleteEmployee(email: String!): String!
        loginEmployee(email: String! password: String!): Boolean!
        logoutEmployee: Boolean!
        createCharge(chargesInput: [ChargesInput!]): Boolean!
        confirmCharges(period: String!): Boolean!
        deleteEmployeeCharge(period: String!): Boolean!
        createLocation(locationInput: [LocationInput!]): Boolean!
    }
`;