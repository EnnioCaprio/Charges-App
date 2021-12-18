import { print } from 'graphql';
import { convertChargePayload } from '../util/sharedFunctions';
import { CREATE_LOCATION, GET_TEMPORARY_LOCATIONS } from '../clientQueries/locationOperation';
import axios from 'axios';

const path = process.env.REACT_APP_URL;

const requests = {
    createLocations: async (payload, start) => {

        const result = convertChargePayload(payload);

        try{
            const { data } = await axios({
                url: path,
                method: 'POST',
                data: {
                    query: print(CREATE_LOCATION),
                    variables: {
                        ...result[start]
                    }
                },
                headers: {
                    'Content-Type' : 'application/json'
                },
                withCredentials: true
            })

            console.log(data);
        }catch(e){
            return e;
        }

        if(start === payload.length - 1){
            console.log(start);
            return;
        }else{
            requests.createLocations(payload, start + 1);
        }

    },
    getTemporaryLocations: async (period) => {

        try{
            const { data } = await axios({
                url: path,
                method: 'POST',
                data: {
                    query: print(GET_TEMPORARY_LOCATIONS),
                    variables: {
                        period
                    }
                },
                headers: {
                    'Content-Type' : 'application/json'
                },
                withCredentials: true
            });

            return data;
        }catch(e){
            return e;
        }

    }
}

export {requests as default}