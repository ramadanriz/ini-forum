/* eslint-disable no-undef */
/**
 * skenario testing
 *
 * - ThreadForm component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call onCreateThread function when Add Thread button is clicked
 */

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadForm from '../../src/components/Fragments/ThreadForm';
import '@testing-library/jest-dom';

describe('ThreadForm component', () => {
    it('should handle title typing correctly', async () => {
      // Arrange
      await act(async () => render(<ThreadForm onCreateThread={() => {}} />));
      const titleInput = await screen.getByPlaceholderText('Judul');
  
      // Action
      await act(async () => userEvent.type(titleInput, 'judul baru'));
  
      // Assert
      expect(titleInput).toHaveValue('judul baru');
    });
  
    it('should handle category typing correctly', async () => {
      // Arrange
      await act(async () => render(<ThreadForm onCreateThread={() => {}} />));
      const categoryInput = await screen.getByPlaceholderText('Kategori');
  
      // Action
      await act(async () => userEvent.type(categoryInput, 'kategori baru'));
  
      // Assert
      expect(categoryInput).toHaveValue('kategori baru');
    });
  
    it('should handle body typing correctly', async () => {
      // Arrange
      await act(async () => render(<ThreadForm onCreateThread={() => {}} />));
      const bodyInput = await screen.getByPlaceholderText('Body');
  
      // Action
      await act(async () => userEvent.type(bodyInput, 'test body'));
  
      // Assert
      expect(bodyInput).toHaveValue('test body');
    });
  
    it('should call onCreateThread function when Submit button is clicked', async () => {
      // Arrange
      const mockOnCreateThread = vi.fn();
      await act(async () => render(<ThreadForm onCreateThread={mockOnCreateThread} />));
      const titleInput = await screen.getByPlaceholderText('Judul');
      await act(async () => userEvent.type(titleInput, 'judul baru'));
      const categoryInput = await screen.getByPlaceholderText('Kategori');
      await act(async () => userEvent.type(categoryInput, 'kategori baru'));
      const bodyInput = await screen.getByPlaceholderText('Body');
      await act(async () => userEvent.type(bodyInput, 'test body'));
      const addThreadButton = await screen.getByRole('button', {
        name: 'Submit',
      });
  
      // Action
      await userEvent.click(addThreadButton);
  
      // Assert
      expect(mockOnCreateThread).toBeCalledWith({
        title: 'judul baru',
        category: 'kategori baru',
        body: 'test body',
      });
    });
});