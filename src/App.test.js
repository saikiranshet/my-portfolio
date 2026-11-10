import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio profile and education', () => {
  try {
    render(<App />);
  } catch (error) {
    console.error(error.errors);
    throw error;
  }
  expect(screen.getByRole('heading', { name: 'Saikiran Shet' })).toBeInTheDocument();
  expect(screen.getByText(/Full Stack Engineer \| Quality Engineering \| Cloud & AI/)).toBeInTheDocument();
  expect(screen.getByText('NMAM Institute of Technology')).toBeInTheDocument();
});
