const knex = require('../../data/db');
const { errorName } = require('../errorHandling/errorsResponse');

module.exports = {
    Query: {
        getCharges: async (_, {}, {req, res}) => {

            const employeeId = req.session.employeeId || req.session.passport.user;

            if(!employeeId){
                throw new Error(errorName.UNAUTHORIZED);
            }

            try{
                const charges = await knex
                .select('*')
                .from('charge');

                return charges;
            }catch(e){
                throw e;
            }
        }
    },
    Mutation: {

    }
}