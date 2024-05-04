import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import RegPage from './RegPage';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Mock the Firebase Auth module
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn()
}));

// Helper function to render the component within the Router context
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

// The test suite
describe('RegPage', () => {
  beforeEach(() => {
    // Clear all previous settings before each test
    getAuth.mockClear();
    createUserWithEmailAndPassword.mockClear();

    // Setup the mock for getAuth
    getAuth.mockReturnValue({});

    // Setup the mock for createUserWithEmailAndPassword
    createUserWithEmailAndPassword.mockResolvedValue({
      user: { uid: '123' } // Mock a Firebase user
    });
  });

  it('renders without crashing and allows input entry', () => {
    renderWithRouter(<RegPage />);

    // Check if input fields are rendered and editable
    const usernameInput = screen.getByLabelText('Username');
    const fullNameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    expect(usernameInput).toBeInTheDocument();
    expect(fullNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

  });

  it('calls createUserWithEmailAndPassword on form submit with valid data', async () => {
    renderWithRouter(<RegPage />);

    // Inputs interaction
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Test User' } });

    // Simulate form submission
    fireEvent.click(screen.getByTestId('register-button'));

    // Wait for the createUserWithEmailAndPassword function to be called
    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        {}, // The mock uses the auth object received from getAuth()
        'test@example.com',
        'Password123!'
      );
    });
  });
});
