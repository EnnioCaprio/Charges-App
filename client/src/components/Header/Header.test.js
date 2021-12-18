import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithRedux } from '../../test-utils/testingUtil';
import Header from './Header';

describe('check header', () => {
    it('check logout', async () => {

        const { getByRole } = renderWithRedux(<Header />, { initialState: { login: true } });

        const button = getByRole('button', { name: /logout/i });

        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        await waitFor(() => {
            expect(button).not.toBeInTheDocument();
        })
    })
    
})