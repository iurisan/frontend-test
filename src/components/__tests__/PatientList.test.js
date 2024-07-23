import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import PatientList from '../PatientList';

const mockTheme = {
  text: {
    primary: 'black',
    secondary: 'grey'
  }
};

// eslint-disable-next-line
jest.mock('../PatientItem', () => ({ patient }) => (
  <div data-testid="patient-item">{patient.name}</div>
));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('PatientList', () => {
  let store;
  beforeEach(() => {
    const initialState = {
      app: {
        patients: [
          {
            name: 'Alice Johnson',
            joined: '2023-07-20T07:58:35.582Z',
            last_visit_date: '2024-07-14T03:44:31.631Z',
            is_completed: false,
            type: 'a-level'
          },
          {
            name: 'John Doe',
            joined: '2023-01-06T13:24:21.129Z',
            last_visit_date: '2023-10-09T01:00:50.537Z',
            is_completed: false,
            type: 'b-level'
          },
          {
            name: 'David Miller',
            joined: '2023-04-08T13:24:21.129Z',
            last_visit_date: '2023-10-09T01:00:50.537Z',
            is_completed: false,
            type: 'b-level'
          },
          {
            name: 'Michael Wilson',
            joined: '2023-07-03T04:16:09.629Z',
            last_visit_date: '2023-10-29T20:45:07.971Z',
            is_completed: true,
            type: 'a-level'
          },
          {
            name: 'Emily Davis',
            joined: '2023-07-03T04:16:09.629Z',
            last_visit_date: '2024-05-29T20:45:07.971Z',
            is_completed: false,
            type: 'a-level'
          }
        ]
      }
    };
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ThemeProvider theme={mockTheme}>
          <PatientList />
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render PatientList', () => {
    expect(screen.getByText(/Patients:/)).toBeInTheDocument();
  });

  it('should display patients grouped by type', async () => {
    await waitFor(() => {
      expect(screen.getByText(/a-level/i)).toBeInTheDocument();
      expect(screen.getByText(/b-level/i)).toBeInTheDocument();
    });
  });

  it('should display each patient item with the correct name', async () => {
    await waitFor(() => {
      expect(screen.getByText('Emily Davis')).toBeInTheDocument();
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('David Miller')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('should sort patients by last visit date and then by name', async () => {
    await waitFor(() => {
      const patientItems = screen.getAllByTestId('patient-item');
      const patientNames = patientItems.map((item) => item.textContent);

      expect(patientNames).toEqual(['Emily Davis', 'Alice Johnson', 'David Miller', 'John Doe']);
    });
  });
});
