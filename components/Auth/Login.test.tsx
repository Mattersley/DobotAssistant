import React from 'react'
import { build, fake } from '@jackfranklin/test-data-bot'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'

jest.mock('firebase/auth', () => ({
  auth: jest.fn().mockReturnThis(),
  signInWithEmailAndPassword: jest.fn(),
}))

const createLoginInput = build({
  fields: {
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password()),
  },
})

test('Submitting the form calls handleSubmit with username and password', async () => {
  render(<LoginForm />)
  const { email, password } = createLoginInput()

  const handleSubmit = jest.fn()

  userEvent.type(screen.getByLabelText(/email address/i), email)
  userEvent.type(screen.getByLabelText(/password/i), password)
  screen.getByRole('button', { name: /submit/i }).click()

  expect(handleSubmit).toHaveBeenCalledWith({ email, password })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
