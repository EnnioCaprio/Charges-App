const knex = require('../../data/db');
const { errorName } = require('../errorHandling/errorsResponse');

module.exports = {
    Query: {
        getLocations: async (_, __, {req, res}) => {

            /*const employeeId = req.session.employeeId || req.session.passport?.user;

            if(!employeeId){
                throw new Error(errorName.UNAUTHORIZED);
            }*/

            try{
                const locations = await knex
                .select('*')
                .from('location');

                return locations;
            }catch(e){
                console.log(e);
                throw e;
            }
        }
    },
    Mutation: {

    }
}