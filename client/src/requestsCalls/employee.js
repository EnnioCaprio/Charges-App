import { print } from 'graphql';
import { REGISTRATION_EMPLOYEE, LOG_IN, GET_EMPLOYEE_PROFILE, LOG_OUT } from '../clientQueries/employee';
import axios from 'axios';

const path = process.env.REACT_APP_URL;

const requests = {
    registrationEmployee: async (name, surname, email, password) => {

        try{
            const { data } = await axios({
                url: path,
                method: 'POST',
                data: {
                    query: print(REGISTRATION_EMPLOYEE),
                    variables: {
                        name,
                        surname,
                        email,
                        password
                    }
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            console.log('data', data);

            return data;
        }catch(e){
            return e;
        }

    },
    employeeLogin: async (email, password) => {

        try{    
            const { data } = await axios({
                url: path,
                method: 'POST',
                data: {
                    query: print(LOG_IN),
                    variables: {
                        email,
                        password
                    }
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            console.log(data);

            return data;
        }catch(e){
            return e;
        }

    },
    getEmployeeProfile: async () => {

        try{
            const { data } = await axios({
                url: path,
                method: 'POST',
                data: {
                    query: print(GET_EMPLOYEE_PROFILE)
                },
                headers: {
                    'Content-Type' : 'application/json'
                },
                withCredentials: true
            })

            console.log('employee', data);

            return data;
        }catch(e){
            return e;
        }

    },
    employeeLogout: async () => {

        try{
            const { data } = await axios({
                url: path,
                method: 'POST',
                data: {
                    query: print(LOG_OUT)
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