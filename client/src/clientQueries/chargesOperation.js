import gql from 'graphql-tag';

export const CREATE_CHARGE = gql`
    mutation create_charge($code_charge: String!, $period: String!, $days_keeper: [DaysInputs!], $create_charge: Boolean!){
        createCharge(chargesInput: [{code_charge: $code_charge, period: $period, days_keeper: $days_keeper, create_charge: $create_charge}])
    }
`;

export const GET_TEMPORARY_CHARGES = gql`
    query get_temporary_charges($period: String!){
        getTemporaryCharges(period: $period){
            code_charge,
            period, 
            days_keeper {
                day,
                hours
            }
        }
    }
`;