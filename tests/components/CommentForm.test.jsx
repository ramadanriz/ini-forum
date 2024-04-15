/* eslint-disable no-undef */

/**
 * skenario testing
 *
 * - CommentForm component
 *   - should handle comment typing correctly
 *   - should call onCreateComment function when Post Comment button is clicked
 */

import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CommentForm from '../../src/components/Fragments/CommentForm';
import '@testing-library/jest-dom';
import renderWithProviders from '../../src/utils/renderWithProviders';

const fakeAuthUser = {
    id: 'user-123',
    name: 'john doe',
    email: 'johndoe@gmail.com',
    avatar: 'https://myprofile.jpg',
}

describe('CommentForm component', () => {
    it('should handle comment typing correctly', async () => {
      // Arrange
      renderWithProviders(
        <MemoryRouter>
          <CommentForm onCreateComment={() => {}} />
        </MemoryRouter>,
        {
          preloadedState: {
            authUser: fakeAuthUser,
          },
        },
      )
      const commentInput = await screen.getByPlaceholderText('Comment')
  
      // Action
      await act(async () => userEvent.type(commentInput, 'Hello World!'))
  
      // Assert
      expect(commentInput).toHaveValue('Hello World!')
    })
  
    it('should call onCreateComment function when Post Comment button is clicked', async () => {
      // Arrange
      const mockOnCreateComment = vi.fn()
      renderWithProviders(
        <MemoryRouter>
          <CommentForm onCreateComment={mockOnCreateComment} />
        </MemoryRouter>,
        {
          preloadedState: {
            authUser: fakeAuthUser,
          },
        },
      )
      const commentInput = await screen.getByPlaceholderText('Comment')
      await act(async () => userEvent.type(commentInput, 'Hello World!'))
      const commentButton = await screen.getByRole('button', {
        name: 'Post Comment',
      })
  
      // Action
      await userEvent.click(commentButton)
  
      // Assert
      expect(mockOnCreateComment).toBeCalledWith({ content: 'Hello World!' })
    })
})