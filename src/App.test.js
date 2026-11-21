import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio profile and education', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Saikiran Shet' })).toBeInTheDocument();
  expect(screen.getAllByText('Senior Engineer').length).toBeGreaterThan(0);
  expect(screen.getByText(/including 4 months in full-stack application development/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /view resume/i })).toBeInTheDocument();
  expect(screen.getByText('NMAM Institute of Technology')).toBeInTheDocument();
});
