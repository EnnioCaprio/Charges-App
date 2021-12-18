import gql from 'graphql-tag';

export const GET_CHARGES = gql`
    query get_charges{
        getCharges{
            id_charge,
            name_charge,
            code_charge,
            created_at
        }
    }
`;