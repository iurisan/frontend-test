import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { thunk } from 'redux-thunk';

import SignIn from '../SignIn';
import { signIn } from '../../redux/reducers/appReducer';

// handle watchMedia error
// eslint-disable-next-line
global.matchMedia = global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn()
    };
  };

jest.mock('../../redux/reducers/appReducer', () => ({
  ...jest.requireActual('../../redux/reducers/appReducer'),
  signIn: jest.fn(() => () => Promise.resolve())
}));

const testEmail = 'test@example.com';
const testPassword = 'Password123';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('SignIn', () => {
  let store;
  let history;

  beforeEach(() => {
    const initialState = {
      app: {
        isAuthenticated: false,
        patients: [],
        loading: false,
        error: null
      }
    };
    store = mockStore(initialState);
    history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <SignIn />
        </Router>
      </Provider>
    );
  });

  it('should have username input field', () => {
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it('should have password input field', () => {
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should have a submit button', () => {
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('should enable button when form is valid', async () => {
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: testEmail } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: testPassword } });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /log in/i })).toBeEnabled();
    });
  });

  it('should disable button when form is invalid', async () => {
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /log in/i })).toBeDisabled();
    });
  });

  it.skip('should call signIn on form submit', async () => {
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: testEmail } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: testPassword } });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /log in/i })).toBeEnabled();
    });

    userEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({ username: testEmail, password: testPassword });
      expect(history.location.pathname).toBe('/');
    });
  });
});
