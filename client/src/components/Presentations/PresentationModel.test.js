import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PresentationModel from './PresentationModel';
import '@testing-library/jest-dom/extend-expect'

describe('validate forms', () => {
    test('check if button registration form is disabled', () => {
        const form = { active: true, type: 'registration' };

        render(<PresentationModel form={form} />);

        expect(screen.getByRole('button', { name: /Registrate/i })).toHaveProperty('disabled', true);
    })

    test('check if button registration form becomes enabled', () => {
        const form = { active: true, type: 'registration' };

        render(<PresentationModel form={form} />);

        const name = screen.getByPlaceholderText('firstName');
        const surname = screen.getByPlaceholderText('secondName');
        const email = screen.getByPlaceholderText('email');
        const password = screen.getByPlaceholderText('password');

        fireEvent.change(name, { target: { value: 'Mario' } })
        fireEvent.change(surname, { target: { value: 'gialli' } })
        fireEvent.change(email, { target: { value: 'mario@company.com' } })
        fireEvent.change(password, { target: { value: 'mario12345' } })

        expect(screen.getByRole('button', { name: /Registrate/i })).toHaveProperty('disabled', false);

    });

    test('check if button login form is disabled', () => {
        const form = { active: true, type: 'login' };

        render(<PresentationModel form={form} />);

        expect(screen.getByRole('button', { name: /Log-in/i })).toHaveProperty('disabled', true);
    })

    test('check if button login form becomes enabled', () => {
        const form = {active: true, type: 'login'};

        render(<PresentationModel form={form} />);

        const email = screen.getByPlaceholderText('email');
        const password = screen.getByPlaceholderText('password');

        fireEvent.change(email, {target: {value: 'andrea@company.com'} });
        fireEvent.change(password, {target: {value: 'andrea123456'}});

        expect(screen.getByRole('button', { name: /log-in/i })).toHaveProperty('disabled', false);
    })
})