const knex = require('../../data/db');
const { errorName } = require('../errorHandling/errorsResponse');

module.exports = {
    Query: {
        getTemporaryLocations: async (_, {period}, {req, res}) => {

            const employeeId = req.session.employeeId || req.session.passport.user;

            if(!employeeId){
                throw new Error(errorName.UNAUTHORIZED);
            }

            try{
                const data = await knex
                .select('*')
                .from('location_operation')
                .where('location_period', period)
                .andWhere('id_employee', employeeId);

                return data;
            }catch(e){
                throw e;
            }
        }
    },
    Mutation: {
        createLocation: async (_, {locationInput}, {req, res}) => {

            const employeeId = req.session.employeeId || req.session.passport.user;

            if(!employeeId){
                throw new Error(errorName.UNAUTHORIZED);
            }

            const modifiedPayload = {...locationInput[0], id_employee: employeeId};

            try{
                await knex('location_operation')
                .insert(modifiedPayload)
                .onConflict(['location_period', 'id_employee', 'id_location'])
                .merge()
                .returning('*');

                return true;
            }catch(e){
                throw e;
            }
        }
    }
}