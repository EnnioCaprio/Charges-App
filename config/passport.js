const GoogleStrategy = require('passport-google-oauth20').Strategy;
const knex = require('../data/db');
const bcrypt = require('bcrypt');
require('dotenv');

module.exports = (passport) => {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: `${process.env.API_ACCESS}/auth/google/callback`
        },
            async (accessToken, refreshToken, profile, done) => {

                const generatedPassword = Math.random().toString(36).substr(2, 8);

                const createEmployee = {
                    name: profile.name.givenName,
                    surname: profile.name.familyName,
                    email: profile.emails[0].value,
                    password: await bcrypt.hash(generatedPassword, 10),
                    is_oauth: true,
                    deleted_employee: false
                }

                try {
                    let employee = await knex.select('*').from('employee').where('email', profile.emails[0].value);

                    if (employee.length > 0) {
                        done(null, employee[0].id_employee);
                    } else {
                        employee = await knex('employee').insert(createEmployee).returning('*');

                        done(null, employee[0].id_employee);
                    }
                } catch (e) {
                    return e;
                }
            }
        ))

        passport.serializeUser((user, done) => {
            done(null, user);
        })

        passport.deserializeUser((id, done) => {
            knex.select('*').from('employee').where('id_employee', id)
            .then((user) => done(null, user))
            .catch((err) => done(err, null));
        })
}