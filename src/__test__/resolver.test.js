const knexConn = require('../../data/db');
const { graphqlTestCall } = require('../graphqlTestCall');
const { confirmCharge, createLocation, logOut, createCharges, loginMutation, readQuery, registrationMutation } = require('../../queries/graphqlQueries');

beforeAll(() => {
    return knexConn.migrate.latest()
        .then(() => knexConn.seed.run())
})

afterAll(() => {
    return knexConn.migrate.rollback().then(() => knexConn.destroy());
})

describe('test', () => {
    const testEmployee = {
        name: 'marco',
        surname: 'rossi',
        email: 'rossi@company.com',
        password: 'aaa123'
    };

    test('registration, login, profile, logout', async () => {

        //Registration Employee

        const registration = await graphqlTestCall(registrationMutation, {
            name: testEmployee.name,
            surname: testEmployee.surname,
            email: testEmployee.email,
            password: testEmployee.password
        });

        expect(registration).toEqual({
            data: {
                registrationEmployee: true
            }
        });

        //Check if employee is in the database

        const checkEmployee = await knexConn.select('*').from('employee').where('email', testEmployee.email);

        console.log('email', checkEmployee);

        expect(checkEmployee[0]).toBeDefined();

        //Login Employee

        const loginResult = await graphqlTestCall(loginMutation, {
            email: testEmployee.email,
            password: testEmployee.password
        })

        expect(loginResult).toEqual({ data: { loginEmployee: true } })

        //Read Profile

        const readEmployee = await graphqlTestCall(readQuery, {}, checkEmployee[0].id_employee);

        expect(readEmployee).toEqual({
            data: {
                getEmployeeProfile: {
                    id_employee: checkEmployee[0].id_employee,
                    name: checkEmployee[0].name,
                    surname: checkEmployee[0].surname,
                    email: checkEmployee[0].email,
                }
            }
        });

        //Logout Employee

        const loggingOut = await graphqlTestCall(logOut, {}, checkEmployee[0].id_employee);

        expect(loggingOut).toEqual({ data: { logoutEmployee: true } });

    })

    test('create charge and confirm it', async () => {

        //Check if user exists

        const checkEmployee = await knexConn.select('*').from('employee').where('email', testEmployee.email);

        console.log('check', checkEmployee);

        expect(checkEmployee[0]).toBeDefined();

        //Login before checking charges

        const loginEmployee = await graphqlTestCall(loginMutation, {
            email: testEmployee.email,
            password: testEmployee.password
        })

        expect(loginEmployee).toEqual({ data: { loginEmployee: true } })

        //Calculate hours for period

        const charge = await graphqlTestCall(createCharges, {
            code_charge: "1001",
            period: "30/06/2022",
            days_keeper: [
                {
                    day: "1",
                    hours: 8
                },
                {
                    day: "2",
                    hours: 8
                },
                {
                    day: "3",
                    hours: 8
                },
                {
                    day: "4",
                    hours: 8
                },
            ],
            create_charge: true
        }, checkEmployee[0].id_employee);

        expect(charge).toEqual({
            data: {
                createCharge: true
            }   
        });

        //Confirm hours

        const location = await graphqlTestCall(createLocation, {
            location_period: "30/06/2022",
            days_location: [1,2,3,4],
            id_location: 1
        }, checkEmployee[0].id_employee)

        expect(location).toEqual({
            data: {
                createLocation: true
            }
        })

        const confirmCharges = await graphqlTestCall(confirmCharge, { period: '30/06/2022' }, checkEmployee[0].id_employee);

        expect(confirmCharges).toEqual({
            data:
            {
                confirmCharges: true
            }
        })

    })
})