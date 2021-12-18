import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import { renderWithRedux } from '../../test-utils/testingUtil';
import ChargesHeader from './ChargesHeader';
import { getDateResult } from '../../custom/date';
import moment from 'moment';

describe('check charges header', () => {
    it('check current date', () => {

        const result = getDateResult(null, true, null, undefined);

        const checkFormat = moment(result.fullDate, 'DD/MM/YYYY', true).isValid();

        expect(result.fullDate.length).toBe(10);

        expect(checkFormat).toBe(true);

    })

    it('check previous date result', () => {

        const { getByTestId } = renderWithRedux(<ChargesHeader />);

        const arrowRight = getByTestId("back-arrow");

        const period = getByTestId("period").textContent;

        act(() => {
            fireEvent.click(arrowRight);
        })

        const checkFormat = moment(period, 'DD/MM/YYYY', true).isValid();

        expect(period.length).toBe(10);

        expect(checkFormat).toBe(true);

    })

    it('check next data result', () => {

        const { getByTestId } = renderWithRedux(<ChargesHeader />);

        const arrowRight = getByTestId("next-arrow");

        const period = getByTestId("period").textContent;

        act(() => {
            fireEvent.click(arrowRight);
        })

        const checkFormat = moment(period, 'DD/MM/YYYY', true).isValid();

        expect(period.length).toBe(10);

        expect(checkFormat).toBe(true);

    })

    it('check if delete hours exists', () => {

        const { getByText, getByRole } = renderWithRedux(<ChargesHeader />, { initialState: { confirm: true } });

        expect(getByText(/status: confirmed/i)).toBeTruthy();

        expect(getByRole('button', { name: /delete hours/i })).toBeInTheDocument();

    })

    it('check if calculate button exists', () => {

        const { getByText, getByRole } = renderWithRedux(<ChargesHeader />, { initialState: { confirm: false } });

        expect(getByText(/status: not confirmed/i)).toBeTruthy();

        const button = getByRole('button', { name: /calculate hours/i });

        expect(button).toBeInTheDocument();

        expect(button).toHaveProperty('disabled', false);

    })
})