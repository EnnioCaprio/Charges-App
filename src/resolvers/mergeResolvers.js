const { mergeResolvers } = require('@graphql-tools/merge');
const Employee = require('./Employee');
const Charge = require('./Charge');
const ConfirmedCharge = require('./ConfirmedCharge');
const ChargeOperation = require('./ChargesOperation');
const Location = require('./Location');
const LocationOperation = require('./LocationOperation');

const resolvers = [
    Employee,
    Charge,
    ConfirmedCharge,
    ChargeOperation,
    Location,
    LocationOperation
];

const mergedResolvers = mergeResolvers(resolvers);

module.exports = mergedResolvers;