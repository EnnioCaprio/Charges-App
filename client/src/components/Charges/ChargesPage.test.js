import React from 'react';
import { renderWithRedux } from '../../test-utils/testingUtil';
import ChargesPage from './ChargesPage';
import chargesOperationRequest from '../../requestsCalls/chargesOperation';

describe('check charges page', () => {
    it('check charges creation', async () => {
        const totalState = [
            {
                id: 1,
                code_charge: 1003,
                period: '31/10/2021',
                days_keeper: [ { day: "16", hours: 8 } ],
                id_employee: 1,
                create_charge: true
            }
        ]

        const hoursState = [
            {
                id: 1,
                days_keeper: [ { day: "16", hours: 8 } ]
            }
        ]

        const { getByRole } = renderWithRedux(<ChargesPage />, { initialState: { hours: hoursState } });

        const button = getByRole('button', { name: /Save Charges/i });

        expect(button).toHaveProperty('disabled', false);

        const charges = await chargesOperationRequest.createCharge(totalState, 0);

        expect(charges).toStrictEqual({
            data: {
                createCharge: true
            }
        })
    })
})