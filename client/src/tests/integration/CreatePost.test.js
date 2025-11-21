
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('/api/users/register', (req, res, ctx) => {
    return res(
      ctx.json({
        _id: '123',
        email: 'test@example.com',
        token: 'test-token',
      })
    );
  }),
  rest.post('/api/posts', (req, res, ctx) => {
    return res(ctx.json({ title: 'Test Post', content: 'Test Content' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Create Post', () => {
  it('should create a new post', async () => {
    render(<App />);

    // Click the "Create post" button
    fireEvent.click(screen.getByTestId('create-post'));

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Test Post' },
    });
    fireEvent.change(screen.getByLabelText('Content'), {
      target: { value: 'Test Content' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Create'));

    // Wait for the post to be created
    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument();
    });
  });
});
