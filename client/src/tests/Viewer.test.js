/* globals jest describe beforeEach afterEach it expect */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Viewer from '../components/Viewer.js';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('Viewer', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({
      changes: [
        { _id: '1', propertyA: 'valueA1', propertyB: 'valueB1', propertyC: new Date() },
        { _id: '2', propertyA: 'valueA2', propertyB: 'valueB2', propertyC: new Date() }
      ]
    });
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<Viewer />);

    expect(screen.getByText('Viewer')).toBeInTheDocument();
    expect(screen.getByText('Delete All')).toBeInTheDocument();
    expect(screen.getAllByTestId('delete').length).toBe(2);
    expect(screen.getAllByText('Edit').length).toBe(2);
  });

  it('dispatches setEditChange action and navigates when Edit button is clicked', () => {
    render(<Viewer />);

    const editButton = screen.getAllByText('Edit')[0];
    fireEvent.click(editButton);

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_EDIT_CHANGE', payload: '1' });
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
