import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import reducers from '../reducers/combinedReducers';
import { createStore } from 'redux';

function renderWithRedux(
    ui,
    {
        initialState,
        store = createStore(reducers, initialState)
    } = {}
) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        store
    }
}

export { renderWithRedux }