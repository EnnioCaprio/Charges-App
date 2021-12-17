const knex = require('../../data/db');
const bcrypt = require('bcrypt');
const { validateInputs } = require('../../helpers/validateInputs');
const { errorName } = require('../errorHandling/errorsResponse');

module.exports = {
    Query: {
        getEmployeeProfile: async (_, __, {req, res}) => {
            
            const employeeId = req.session.employeeId || req.session.passport.user;

            if(!employeeId){
                throw new Error(errorName.UNAUTHORIZED);
            }

            try{
                let employee = await knex
                .select('*')
                .from('employee')
                .where('id_employee', employeeId);

                return employee[0];
            }catch(e){
                return e;
            }
        }
    },
    Mutation: {
        registrationEmployee: async (_, { employeeInput }, {req, res}) => {
            try{
                const { errors } = validateInputs(employeeInput);

                if(Object.keys(errors).length > 0){
                    throw new Error(JSON.stringify(errors));
                }

                const {name, surname, email, password} = employeeInput;

                const employeeCheck = await knex
                .select('deleted_employee')
                .from('employee')
                .where('email', email);

                if(employeeCheck.length > 0){
                    throw new Error(errorName.CONFLICT);
                }

                let employee = await knex('employee')
                .insert({
                    name,
                    surname,
                    email,
                    password: await bcrypt.hash(password, 10),
                    is_oauth: false,
                    deleted_employee: false
                })
                .returning('*');

                req.session.employeeId = employee[0].id_employee;

                return true;
            }catch(e){
                return e;
            }
        },
        updateEmployee: async (_, {employeeInput: {email, password}}, {req, res}) => {

            const employeeId = req.session.employeeId || req.session.passport.user;

            if(!employeeId){
                throw new Error(errorName.UNAUTHORIZED)
            }

            try{
                const employee = await knex('employee')
                .where('email', email)
                .update({
                    password
                })
                .returning('*');

                if(employee.length === 0){
                    throw new Error(errorName.NOT_FOUND);
                }

                return employee[0];
            }catch(e){
                return e;
            }
        },
        deleteEmployee: async (_, {email}, {req, res}) => {

            const employeeId = req.session.employeeId || req.session.passport.user;

            if(!employeeId){
                throw new Error(errorName.UNAUTHORIZED)
            }

            try{
                const employee = await knex('employee')
                .where('email', email)
                .andWhere('deleted_employee', false)
                .update({
                    deleted_employee: true
                })
                .returning('*');

                if(employee.length === 0){
                    throw new Error(errorName.NOT_FOUND);
                }

                return 'Deleted Account';
            }catch(e){
                return e;
            }
        },
        loginEmployee: async (_, {email, password}, {req}) => {
            try{
                const employee = await knex
                .select('*')
                .from('employee')
                .where('email', email)
                .andWhere('deleted_employee', false);
                
                if(employee.length === 0){
                    throw new Error(errorName.NOT_FOUND);
                }

                const checkPassword = await bcrypt.compare(password, employee[0].password);

                if(!checkPassword){
                    throw new Error(errorName.NOT_FOUND);
                }

                req.session.employeeId = employee[0].id_employee;

                return true;

            }catch(e){
                return e;
            }
        },
        logoutEmployee: async (_, __, {req, res}) => {

            const employeeId = req.session.employeeId || req.session.passport.user;

            if(!employeeId){
                throw new Error(errorName.UNAUTHORIZED);
            }

            req.session.destroy();
            res.clearCookie('sid');
            return true;
        }
    }
}