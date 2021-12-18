import gql from 'graphql-tag';

export const REGISTRATION_EMPLOYEE = gql`
    mutation registration_employee($name: String!, $surname: String!, $email: String!, $password: String){
        registrationEmployee(employeeInput: { name: $name, surname: $surname, email: $email, password: $password })
    }`;

export const UPDATE_EMPLOYEE = gql`
    mutation update_employee($name: String!, $surname: String!, $email: String!, $password: String!){
        updateEmployee(employeeInput: { name: $name, surname: $surname, email: $email, password: $password }){
            id_employee,
            name,
            email
        }
    }
`;

export const DELETE_EMPLOYEE = gql`
    mutation delete_employee($email: String!){
        deleteEmployee(email: $email)
    }
`;

export const LOG_IN = gql`
    mutation login_employee($email: String!, $password: String!){
        loginEmployee(email: $email, password: $password)
    }
`;

export const LOG_OUT = gql`
    mutation logout_employee{
        logoutEmployee
    }
`;

export const GET_EMPLOYEE_PROFILE = gql`
    query get_employee_profile{
        
        getEmployeeProfile{
            id_employee,
            name,
            surname,
            email
        }
    }
`;