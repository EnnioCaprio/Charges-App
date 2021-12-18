import gql from 'graphql-tag';

export const CREATE_LOCATION = gql`
    mutation create_location($location_period: String!, $days_location: [Int!], $id_location: Int!){
        createLocation(locationInput: { location_period: $location_period, days_location: $days_location, id_location: $id_location })
    }
`;

export const GET_TEMPORARY_LOCATIONS = gql`
    query get_temporary_locations($period: String!){
        getTemporaryLocations(period: $period){
            id_location,
            location_period,
            days_location,
            id_confirmed_charge,
            id_employee
        }
    }
`;