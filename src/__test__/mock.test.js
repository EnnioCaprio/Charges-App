const { convertData } = require('../../helpers/convertionJSON');
const { validateInputs } = require('../../helpers/validateInputs');

describe('testing single functions', () => {
    it('check if registration inputs are correct', () => {

        const dataTest = {
            name: 'mario',
            surname: 'rossi',
            email: 'mario@company.com',
            password: 'mario123'
        };

        const result = validateInputs(dataTest);

        expect(result).toEqual({ errors: {} })

    })

    it('check if convert data goes to JSON for create charge', () => {

        const createCharge = [{
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
                }
            ],
            create_charge: true
        }];

        const result = convertData(createCharge);

        expect(typeof(result[0].days_keeper)).toBe('string');
    })

    it('check if convert data goes to JSON for create location', () => {
        
        const createLocation = [{
            location_period: "30/4/2021",
            days_location: [1,2,3],
            id_location: 3
          }];

          const result = convertData(createLocation);

          expect(typeof(result[0].days_location)).toBe('string');

    })

})