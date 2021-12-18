import React from 'react';
import { waitFor, within } from '@testing-library/react';
import { renderWithRedux } from '../../test-utils/testingUtil';
import LocationSave from './LocationSave';
import LocationPage from './LocationsPage';
import location from '../../requestsCalls/locations';

describe('check location part', () => {
    it('check location list', async () => {
        const { getByTestId } = renderWithRedux(<LocationPage />);

        expect(getByTestId("loading")).toBeInTheDocument()

        await waitFor(() => expect(getByTestId("resolved")).toBeInTheDocument());

        const locations = await location.getLocations();

        const office = getByTestId('office');

        const home = getByTestId('home');

        expect(office).toHaveTextContent(locations.data.getLocations[0].location_name);

        expect(home).toHaveTextContent(locations.data.getLocations[1].location_name);
    })

    it('check disabled location button', async () => {
        const { getByRole } = renderWithRedux(<LocationSave
            error={false}
            payloadLocation={[]}    
        />);

        const button = getByRole('button', { name: /Save Locations/i });

        expect(button).toHaveProperty('disabled', true);
    })

    it('check if location button becomes disabled', () => {
        const payload = [{ days_location: [1], id: 1, id_employee: 1, id_location: 1, location_period: '31/10/2021' }]

        const { getByTestId, getByRole } = renderWithRedux(<LocationSave
            error={true}
            payloadLocation={payload}
        />);

        const { getByText } = within(getByTestId('error-message'));

        const button = getByRole('button', { name: /Save Location/i });

        expect(getByText(/You have selected multiple locations for one or more days. Remove it or them for saving location/i)).toBeInTheDocument();

        expect(button).toHaveProperty('disabled', true);
    })
})