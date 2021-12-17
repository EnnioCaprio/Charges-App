const knex = require('../../data/db');
const { errorName } = require('../errorHandling/errorsResponse');

module.exports = {
    Query: {
        getConfirmedCharges: async (_, { period }, { req, res }) => {

            const employeeId = req.session.employeeId || req.session.passport.user;

            if(!employeeId){
                throw new Error(errorName.UNAUTHORIZED);
            }

            try {
                const charge = await knex.select('*')
                .from('confirmed_charge')
                .where('id_employee', employeeId)
                .andWhere('period', period);

                return charge;
            } catch (e) {
                throw e;
            }
        }
    },
    Mutation: {
        confirmCharges: async (_, { period }, { req, res }) => {

            const employeeId = req.session.employeeId || req.session.passport.user;

            if (!employeeId) {
                throw new Error(errorName.UNAUTHORIZED)
            }
            try {
                await knex('confirmed_charge')
                    .insert({
                        period,
                        id_employee: employeeId,
                        active_charge: true
                    })
                    .returning('*');

                return true;
            } catch (e) {
                throw e;
            }
        },
        deleteEmployeeCharge: async (_, { period }, { req, res }) => {

            const employeeId = req.session.employeeId || req.session.passport.user;

            if (!employeeId) {
                throw new Error(errorName.UNAUTHORIZED);
            }

            try {
                await knex('confirmed_charge')
                    .delete()
                    .where('id_employee', employeeId)
                    .andWhere('period', period);

                return true;
            } catch (e) {
                throw e;
            }
        }
    }
}