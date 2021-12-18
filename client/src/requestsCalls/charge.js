import { print } from 'graphql';
import { GET_CHARGES } from '../clientQueries/charge';
import axios from 'axios';

const path = process.env.REACT_APP_URL;

const requests = {
    getCharges: async () => {

        try{
            const { data } = await axios({
                url: path,
                method: 'POST',
                data: {
                    query: print(GET_CHARGES)
                },
                headers: {
                    'Content-Type' : 'application/json'
                },
                withCredentials: true
            })

            console.log('data', data);

            return data;
        }catch(e){
            return e;
        }

    } 
}

export {requests as default}