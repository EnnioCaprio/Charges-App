import { print } from 'graphql';
import { GET_LOCATIONS } from '../clientQueries/location';
import axios from 'axios';

const path = process.env.REACT_APP_URL;

const requests = {
    getLocations: async () => {

        try {

            const { data } = await axios({
                url: path,
                method: 'POST',
                data: {
                    query: print(GET_LOCATIONS)
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            return data;

        } catch (e) {
            return e;
        }

    }
}

export { requests as default }