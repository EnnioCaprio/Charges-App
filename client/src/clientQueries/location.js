import gql from 'graphql-tag';

export const GET_LOCATIONS = gql`
    query get_locations{
        getLocations{
            id_location,
            location_name
        }
    }
`;