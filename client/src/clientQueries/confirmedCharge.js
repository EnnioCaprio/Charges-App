import gql from 'graphql-tag';

export const CONFIRMED_CHARGES = gql`
    mutation confirm_charges($period: String!){
        confirmCharges(period: $period)
    }
`;

export const DELETE_EMPLOYEE_CHARGE = gql`
    mutation delete_employee_charge($period: String!){
        deleteEmployeeCharge(period: $period)
    }
`;

export const GET_CONFIRMED_CHARGES = gql`
    query get_confirmed_charges($period: String!){
        getConfirmedCharges(period: $period){
            id_confirmed_charge,
            period,
            id_employee,
            active_charge
        }
    }
`;