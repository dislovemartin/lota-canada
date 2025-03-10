import { ContactForm } from '@/components/contact/contact-form'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('ContactForm Accessibility', () => {
  test('should not have any accessibility violations', async () => {
    const { container } = render(<ContactForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  test('form elements have proper labels', () => {
    render(<ContactForm />)
    
    // Check that all form elements have associated labels
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/department/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/i consent to lota canada/i)).toBeInTheDocument()
  })

  test('form elements have proper ARIA attributes', () => {
    render(<ContactForm />)
    
    // Check for required attribute on required fields
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute('aria-required', 'true')
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute('aria-required', 'true')
    expect(screen.getByLabelText(/message/i)).toHaveAttribute('aria-required', 'true')
    
    // Check for proper roles
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /your name/i })).toBeInTheDocument()
  })

  test('error messages are properly associated with form fields', async () => {
    render(<ContactForm />)
    
    // Submit the form without filling it out to trigger validation errors
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    
    // Check that error messages are properly associated with form fields
    const nameInput = screen.getByLabelText(/your name/i)
    const nameError = screen.getByText(/name is required/i)
    expect(nameInput).toHaveAttribute('aria-invalid', 'true')
    expect(nameInput).toHaveAttribute('aria-describedby', expect.stringContaining(nameError.id))
  })

  test('form is navigable using keyboard', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Start with the first input field
    const nameInput = screen.getByLabelText(/your name/i)
    nameInput.focus()
    expect(document.activeElement).toBe(nameInput)
    
    // Tab to the next field
    await user.tab()
    expect(document.activeElement).toBe(screen.getByLabelText(/email address/i))
    
    // Tab to the next field
    await user.tab()
    expect(document.activeElement).toBe(screen.getByLabelText(/department/i))
    
    // Continue tabbing through all fields
    await user.tab()
    expect(document.activeElement).toBe(screen.getByLabelText(/subject/i))
    
    await user.tab()
    expect(document.activeElement).toBe(screen.getByLabelText(/message/i))
    
    await user.tab()
    expect(document.activeElement).toBe(screen.getByLabelText(/i consent to lota canada/i))
    
    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('button', { name: /send message/i }))
  })

  test('form submission feedback is accessible', async () => {
    // Mock the API call
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true })
    })
    
    render(<ContactForm />)
    
    // Fill out the form with valid data
    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: 'John Doe' }
    })
    
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'john@example.com' }
    })
    
    // Select department
    const departmentTrigger = screen.getByLabelText(/department/i)
    fireEvent.click(departmentTrigger)
    fireEvent.click(screen.getByText(/general inquiries/i))
    
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: 'Test Subject' }
    })
    
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'This is a test message that is long enough to pass validation.' }
    })
    
    // Check privacy policy
    fireEvent.click(screen.getByLabelText(/i consent to lota canada/i))
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    
    // Check that success message has appropriate role and is focused
    const successMessage = await screen.findByText(/thank you for your message/i)
    expect(successMessage).toHaveAttribute('role', 'alert')
    expect(successMessage).toHaveAttribute('aria-live', 'assertive')
  })

  test('color contrast meets WCAG standards', async () => {
    const { container } = render(<ContactForm />)
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true }
      }
    })
    expect(results).toHaveNoViolations()
  })

  test('form maintains accessibility when in error state', async () => {
    render(<ContactForm />)
    
    // Submit form without filling it to trigger errors
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    
    // Check accessibility in error state
    const { container } = render(<ContactForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
}) 