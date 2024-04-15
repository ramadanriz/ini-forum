/* eslint-disable no-undef */

/**
 * skenario testing
 *
 * - LoginForm component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginForm from '../../src/components/Fragments/LoginForm';

// Mocking react-router-dom
vi.mock('react-router-dom', () => ({
  Link: vi.fn().mockImplementation(({ to, children }) => <a href={to}>{children}</a>),
}));

describe('LoginForm', () => {
    it('should handle email typing correctly', async () => {
        // Arrange
        await act(async () => render(<LoginForm onLogin={() => {}} />));
        const emailInput = await screen.getByPlaceholderText('Email');
    
        // Action
        await act(async () => userEvent.type(emailInput, 'johndoe@gmail.com'));
    
        // Assert
        expect(emailInput).toHaveValue('johndoe@gmail.com');
    });

    it('should handle password typing correctly', async () => {
        // Arrange
        await act(async () => render(<LoginForm onLogin={() => {}} />));
        const passwordInput = await screen.getByPlaceholderText('Password');
    
        // Action
        await act(async () => userEvent.type(passwordInput, 'password'));
    
        // Assert
        expect(passwordInput).toHaveValue('password');
    });

    it('should call Login function when Login button is clicked', async () => {
        // Arrange
        const mockLogin = vi.fn();
        await act(async () => render(<LoginForm onLogin={mockLogin} />));
        const emailInput = await screen.getByPlaceholderText('Email');
        await act(async () => userEvent.type(emailInput, 'johndoe@gmail.com'));
        const passwordInput = await screen.getByPlaceholderText('Password');
        await act(async () => userEvent.type(passwordInput, 'password'));
        const LoginButton = await screen.getByRole('button', {
          name: 'Login',
        });
    
        // Action
        await act(async () => userEvent.click(LoginButton));
    
        // Assert
        expect(mockLogin).toBeCalledWith({
          email: 'johndoe@gmail.com',
          password: 'password',
        });
    });
});
