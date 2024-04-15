/* eslint-disable no-undef */

/**
 * skenario testing
 *
 * - RegisterForm component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RegisterForm from '../../src/components/Fragments/RegisterForm';

// Mocking react-router-dom
vi.mock('react-router-dom', () => ({
  Link: vi.fn().mockImplementation(({ to, children }) => <a href={to}>{children}</a>),
}));

describe('RegisterForm', () => {
    it('should handle name typing correctly', async () => {
        // Arrange
        await act(async () => render(<RegisterForm onRegister={() => {}} />));
        const nameInput = await screen.getByPlaceholderText('Name');
    
        // Action
        await act(async () => userEvent.type(nameInput, 'john doe'));
    
        // Assert
        expect(nameInput).toHaveValue('john doe');
    });

    it('should handle email typing correctly', async () => {
        // Arrange
        await act(async () => render(<RegisterForm onRegister={() => {}} />));
        const emailInput = await screen.getByPlaceholderText('Email');
    
        // Action
        await act(async () => userEvent.type(emailInput, 'johndoe@gmail.com'));
    
        // Assert
        expect(emailInput).toHaveValue('johndoe@gmail.com');
    });

    it('should handle password typing correctly', async () => {
        // Arrange
        await act(async () => render(<RegisterForm onRegister={() => {}} />));
        const passwordInput = await screen.getByPlaceholderText('Password');
    
        // Action
        await act(async () => userEvent.type(passwordInput, 'password'));
    
        // Assert
        expect(passwordInput).toHaveValue('password');
    });

    it('should call register function when register button is clicked', async () => {
        // Arrange
        const mockRegister = vi.fn();
        await act(async () => render(<RegisterForm onRegister={mockRegister} />));
        const nameInput = await screen.getByPlaceholderText('Name');
        await act(async () => userEvent.type(nameInput, 'john doe'));
        const emailInput = await screen.getByPlaceholderText('Email');
        await act(async () => userEvent.type(emailInput, 'johndoe@gmail.com'));
        const passwordInput = await screen.getByPlaceholderText('Password');
        await act(async () => userEvent.type(passwordInput, 'password'));
        const registerButton = await screen.getByRole('button', {
          name: 'Register',
        });
    
        // Action
        await act(async () => userEvent.click(registerButton));
    
        // Assert
        expect(mockRegister).toBeCalledWith({
          name: 'john doe',
          email: 'johndoe@gmail.com',
          password: 'password',
        });
    });
});
