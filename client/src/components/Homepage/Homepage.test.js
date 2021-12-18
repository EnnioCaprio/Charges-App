import React from 'react';
import { waitFor, fireEvent, within } from '@testing-library/react';
import { renderWithRedux } from '../../test-utils/testingUtil';
import Homepage from './Homepage';

describe('check homepage', () => {
    it('check already confirmed charge', async () => {

        const { getByTestId, getByRole } = renderWithRedux(<Homepage />, { initialState: { period: '31/08/2022' } });

        expect(getByTestId("loading")).toBeInTheDocument();

        await waitFor(() => {
            expect(getByTestId("resolved")).toBeInTheDocument();
        })

        const calculateHoursButton = getByRole('button', { name: /Delete hours/i });

        expect(calculateHoursButton).toHaveProperty('disabled', false);

        fireEvent.click(calculateHoursButton);

    })

    it('check if receive charges', async () => {

        const { getByTestId, findAllByRole } = renderWithRedux(<Homepage />, { initialState: { period: '31/08/2022' } });

        expect(getByTestId("loading")).toBeInTheDocument();

        await waitFor(() => {
            expect(getByTestId("resolved")).toBeInTheDocument();
        })

        const button = await findAllByRole('button', { name: /Choose Charge/i });

        expect(button).toHaveLength(3);

        fireEvent.click(button[0]);

        const { getByText } = within(getByTestId('table-charges'));

        expect(getByText('home')).toBeInTheDocument();

        expect(getByText('office')).toBeInTheDocument();

        expect(getByText('holidays')).toBeInTheDocument();
    })
})