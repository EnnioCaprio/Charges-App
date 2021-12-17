const knex = require('../../data/db');
const { convertData } = require('../../helpers/convertionJSON');
const { errorName } = require('../errorHandling/errorsResponse');

module.exports = {
    Query: {
        getTemporaryCharges: async (_, {period}, {req, res}) => {

            const employeeId = req.session.employeeId || req.session.passport.user;

            if(!employeeId){
                throw new Error(errorName.UNAUTHORIZED);
            }

            try{
                const charges = await knex
                .select('*')
                .from('charges_operation')
                .where('period', period)
                .andWhere('id_employee', employeeId);

                return charges;
            }catch(e){
                return e;
            }
        }
    },
    Mutation: {
        createCharge: async (_, {chargesInput}, {req, res}) => {

            const employeeId = req.session.employeeId || req.session.passport.user;

            if(!employeeId){
                throw new Error(errorName.UNAUTHORIZED);
            }

            const modifiedPayload = {...chargesInput[0], id_employee: employeeId};

            const data = convertData([modifiedPayload]);

            try{

                await knex('charges_operation')
                .insert(data)
                .onConflict(['code_charge', 'period', 'id_employee'])
                .merge()
                .returning('*');

                return true;

            }catch(e){
                return e;
            }
        }
    }
}