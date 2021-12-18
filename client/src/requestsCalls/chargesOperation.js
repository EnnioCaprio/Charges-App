import { print } from 'graphql';
import { convertChargePayload } from '../util/sharedFunctions';
import { CREATE_CHARGE, GET_TEMPORARY_CHARGES } from '../clientQueries/chargesOperation';
import axios from 'axios';

const path = process.env.REACT_APP_URL;

const requests = {
    createCharge: async (payload, start) => {

        const result = convertChargePayload(payload);

        try {
            const { data } = await axios({
                url: path,
                method: 'POST',
                data: {
                    query: print(CREATE_CHARGE),
                    variables: {
                        ...result[start]
                    }
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            })

            if(start === payload.length - 1){
                return data;
            }else{
                requests.createCharge(payload, start + 1);
            }

        } catch (e) {
            return e;
        }
    },
    getTemporaryCharges: async (date) => {

        try{
            const { data } = await axios({
                url: path,
                method: 'POST',
                data: {
                    query: print(GET_TEMPORARY_CHARGES),
                    variables: {
                        period: date
                    }
                },
                headers: {
                    'Content-Type' : 'application/json'
                },
                withCredentials: true
            })

            return data;
        }catch(e){
            return e;
        }

    }
}

export { requests as default }