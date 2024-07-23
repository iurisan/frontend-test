import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ThemeProvider } from 'styled-components';

import PatientItem from '../PatientItem';

const mockTheme = {
  text: {
    secondary: 'grey'
  }
};

describe('PatientItem', () => {
  const patient = {
    name: 'Alice Johnson',
    joined: '2023-07-20T07:58:35.582Z',
    last_visit_date: '2024-07-14T03:44:31.631Z',
    is_completed: false
  };

  beforeEach(() => {
    render(
      <ThemeProvider theme={mockTheme}>
        <PatientItem patient={patient} />
      </ThemeProvider>
    );
  });

  it('should render PatientItem', () => {
    expect(screen.getByText(/Name: Alice Johnson/i)).toBeInTheDocument();
    expect(screen.getByText(/Joined: 20 July 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/Last visit: 14 July 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed: No/i)).toBeInTheDocument();
  });
});
