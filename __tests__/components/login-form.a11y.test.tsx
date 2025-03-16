import { LoginForm } from '@/components/login-form'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'

// Fix TypeScript error by properly typing the extension
expect.extend(toHaveNoViolations as any)

describe('LoginForm Accessibility', () => {
    test('should not have any accessibility violations', async () => {
        const { container } = render(<LoginForm />)
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })

    test('form elements have proper labels', () => {
        render(<LoginForm />)

        // Check that all form elements have associated labels
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    })

    test('form elements have proper ARIA attributes', () => {
        render(<LoginForm />)

        // Check for required attribute on required fields
        expect(screen.getByLabelText(/email/i)).toHaveAttribute('required')
        expect(screen.getByLabelText(/password/i)).toHaveAttribute('required')

        // Check for proper roles - use getAllByRole for the login button since there are multiple buttons with "login" in their name
        expect(screen.getAllByRole('button', { name: /login/i })[0]).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    })

    test('form is navigable using keyboard', async () => {
        const user = userEvent.setup()
        render(<LoginForm />)

        // Start with the first input field
        const emailInput = screen.getByLabelText(/email/i)
        emailInput.focus()
        expect(document.activeElement).toBe(emailInput)

        // Tab to the next field - this goes to the "Forgot your password?" link first in the actual tab order
        await user.tab()
        const forgotPasswordLink = screen.getByText(/forgot your password/i)
        expect(document.activeElement).toBe(forgotPasswordLink)

        // Tab to the password field
        await user.tab()
        expect(document.activeElement).toBe(screen.getByLabelText(/password/i))

        // Tab to the login button
        await user.tab()
        const loginButton = screen.getAllByRole('button', { name: /login$/i })[0]
        expect(document.activeElement).toBe(loginButton)

        // Tab to the social login buttons
        await user.tab()
        expect(document.activeElement).toBe(screen.getByRole('button', { name: /login with apple/i }))

        await user.tab()
        expect(document.activeElement).toBe(screen.getByRole('button', { name: /login with google/i }))

        await user.tab()
        expect(document.activeElement).toBe(screen.getByRole('button', { name: /login with meta/i }))

        // Tab to the "Sign up" link
        await user.tab()
        const signUpLink = screen.getByText(/sign up/i)
        expect(document.activeElement).toBe(signUpLink)
    })

    test('social login buttons have accessible names', () => {
        render(<LoginForm />)

        // Check that social login buttons have proper accessible names
        expect(screen.getByRole('button', { name: /login with apple/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /login with google/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /login with meta/i })).toBeInTheDocument()
    })

    test('links have descriptive text', () => {
        render(<LoginForm />)

        // Check that links have descriptive text
        expect(screen.getByText(/forgot your password/i)).toBeInTheDocument()
        expect(screen.getByText(/sign up/i)).toBeInTheDocument()
        expect(screen.getByText(/terms of service/i)).toBeInTheDocument()
        expect(screen.getByText(/privacy policy/i)).toBeInTheDocument()
    })

    test('color contrast meets WCAG standards', async () => {
        const { container } = render(<LoginForm />)
        // Use type assertion to fix the TypeScript error with the rules object
        const results = await axe(container, {
            rules: {
                'color-contrast': { enabled: true }
            } as any
        })
        expect(results).toHaveNoViolations()
    })
}) 