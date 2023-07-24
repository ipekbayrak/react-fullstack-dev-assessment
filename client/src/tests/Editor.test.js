/* globals describe beforeEach expect test */
import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Editor from '../components/Editor.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Editor Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      changes: {
        isEditing: false,
        editChangeId: '',
        changes: []
      }
    });
  });

  test('renders Editor component', () => {
    render(<Provider store={store}><Editor /></Provider>);
    expect(screen.getByText('Editor')).toBeInTheDocument();
  });

  test('form fields display correct values when isEditing is true', () => {
    const testChange = {
      _id: '123',
      propertyA: 6,
      propertyB: 'value1',
      propertyC: '2023-07-20'
    };

    store = mockStore({
      changes: {
        isEditing: true,
        editChangeId: '123',
        changes: [testChange]
      }
    });

    render(<Provider store={store}><Editor /></Provider>);

    expect(screen.getByTestId('propertyA')).toHaveValue(testChange.propertyA);
    expect(screen.getByTestId('propertyB')).toHaveValue(testChange.propertyB);
    expect(screen.getByTestId('propertyC')).toHaveValue(testChange.propertyC);
  });
});
