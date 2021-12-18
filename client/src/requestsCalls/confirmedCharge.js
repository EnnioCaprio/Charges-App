import { print } from 'graphql';
import { CONFIRMED_CHARGES, DELETE_EMPLOYEE_CHARGE, GET_CONFIRMED_CHARGES } from '../clientQueries/confirmedCharge';
import axios from 'axios';

const path = process.env.REACT_APP_URL;

const requests = {
    confirmedCharges: async (period) => {

        console.log('period', period)

        try{
            const { data } = await axios({
                url: path,
                method: 'POST',
                data: {
                    query: print(CONFIRMED_CHARGES),
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

    },
    deleteEmployeeCharge: async (period) => {

        try{
            const { data } = await axios({
                url: path,
                method: 'POST',
                data: {
                    query: print(DELETE_EMPLOYEE_CHARGE),
                    variables: {
                        period
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

    },
    getConfirmedCharges: async (period) => {

        try{
            const { data } = await axios({
                url: path,
                method: 'POST',
                data: {
                    query: print(GET_CONFIRMED_CHARGES),
                    variables: {
                        period
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

export {requests as default}