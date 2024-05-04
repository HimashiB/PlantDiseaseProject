import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginPage from './LoginPage';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

jest.mock('firebase/auth', () => {
  const actualAuth = jest.requireActual('firebase/auth');
  return {
    ...actualAuth,
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signInWithPopup: jest.fn(),
    GoogleAuthProvider: jest.fn(),
  };
});

// Mock the navigate function
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginPage', () => {
  let originalConsoleError;

  beforeEach(() => {
    originalConsoleError = console.error;
    console.error = jest.fn();  // Mock console.error
    getAuth.mockImplementation(() => ({}));
    mockNavigate.mockReset();
  });

  afterEach(() => {
    console.error = originalConsoleError;  // Restore console.error
  });

  it('allows the user to log in with email and password', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({ user: 'user' });

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: 'SIGN IN' }));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/ai-engine'));
  });

  it('handles sign-in with Google', async () => {
    signInWithPopup.mockResolvedValueOnce({ user: 'user' });

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.click(screen.getByText('Sign in With Google'));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/ai-engine'));
  });

  it('displays error when login fails', async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/wrong-password',
      message: 'Incorrect email or password.'
    });

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'SIGN IN' }));

    await waitFor(() => {
      expect(screen.getByText('Incorrect email or password. Please try again.')).toBeInTheDocument();
    });
  });
});
