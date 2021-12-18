import { graphql, rest } from 'msw';

export const handlers = [
    rest.get(`https://api.opencagedata.com/geocode/v1/json`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    results: [
                        {
                            components: {
                                country: 'Italy',
                                county: 'Rome'
                            }
                        }
                    ]
                }
            })
        )
    }),
    graphql.query('get_locations', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.data({
                getLocations: [
                    { id_location: 1, location_name: 'office' },
                    { id_location: 2, location_name: 'home' }
                ]
            })
        )
    }),
    graphql.query('get_confirmed_charges', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.data({
                getConfirmedCharges: [
                    {
                        id_confirmed_charge: '1a2b3c4',
                        period: '31/08/2022',
                        id_employee: 1,
                        active_charge: true
                    }
                ]
            })
        )
    }),
    graphql.query('get_charges', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.data({
                getCharges: [
                    {
                        id_charge: 1,
                        name_charge: 'home',
                        code_charge: '1001'
                    },
                    {
                        id_charge: 2,
                        name_charge: 'office',
                        code_charge: '1002'
                    },
                    {
                        id_charge: 3,
                        name_charge: 'holidays',
                        code_charge: '1003'
                    }
                ]
            })
        )
    }),
    graphql.query('get_temporary_charges', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.data({
                getTemporaryCharges: [
                    {
                        code_charge: '1001',
                        days_keeper: [
                            { day: 16, hours: 8 },
                            { day: 17, hours: 8 },
                            { day: 18, hours: 8 },
                            { day: 19, hours: 8 }
                        ],
                        period: '31/08/2022'
                    }
                ]
            })
        )
    }),
    graphql.query('get_temporary_locations', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.data({
                getTemporaryLocations: [
                    {
                        id_location: 1,
                        period_location: '31/08/2022',
                        days_location: [16, 17, 18, 19],
                        id_employee: 6,
                        id_confirmed_charge: null
                    }
                ]
            })
        )
    }),
    graphql.mutation('registration_employee', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.data({
                registrationEmployee: true
            })
        )
    }),
    graphql.mutation('login_employee', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.data({
                loginEmployee: true
            })
        )
    }),
    graphql.mutation('create_charge', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.data({
                createCharge: true
            })
        )
    }),
    graphql.mutation('logout_employee', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.data({
                logoutEmployee: true
            })
        )
    }),
    graphql.mutation('delete_employee_charge', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.data({
                deleteEmployeeCharge: true
            })
        )
    })
];