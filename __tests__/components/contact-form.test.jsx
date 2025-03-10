var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ContactForm } from '@/components/contact/contact-form';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// Mock the API call
const mockFetch = jest.fn();
global.fetch = mockFetch;
describe('ContactForm Integration', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => __awaiter(void 0, void 0, void 0, function* () { return ({ success: true }); })
        });
    });
    test('renders the form with all required fields', () => {
        render(<ContactForm />);
        // Check for form elements
        expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/department/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/i consent to lota canada/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });
    test('displays validation errors for empty form submission', () => __awaiter(void 0, void 0, void 0, function* () {
        render(<ContactForm />);
        // Submit without filling the form
        fireEvent.click(screen.getByRole('button', { name: /send message/i }));
        // Check for error messages
        yield waitFor(() => {
            expect(screen.getByText(/name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/email is required/i)).toBeInTheDocument();
            expect(screen.getByText(/please select a department/i)).toBeInTheDocument();
            expect(screen.getByText(/subject is required/i)).toBeInTheDocument();
            expect(screen.getByText(/message is required/i)).toBeInTheDocument();
            expect(screen.getByText(/you must agree to the privacy policy/i)).toBeInTheDocument();
        });
        // API should not be called
        expect(mockFetch).not.toHaveBeenCalled();
    }));
    test('submits the form with valid data', () => __awaiter(void 0, void 0, void 0, function* () {
        render(<ContactForm />);
        // Fill out the form
        fireEvent.change(screen.getByLabelText(/your name/i), {
            target: { value: 'John Doe' }
        });
        fireEvent.change(screen.getByLabelText(/email address/i), {
            target: { value: 'john@example.com' }
        });
        // Select department (this is a bit tricky with the custom Select component)
        const departmentTrigger = screen.getByLabelText(/department/i);
        fireEvent.click(departmentTrigger);
        fireEvent.click(screen.getByText(/general inquiries/i));
        fireEvent.change(screen.getByLabelText(/subject/i), {
            target: { value: 'Test Subject' }
        });
        fireEvent.change(screen.getByLabelText(/message/i), {
            target: { value: 'This is a test message that is long enough to pass validation.' }
        });
        // Check privacy policy
        fireEvent.click(screen.getByLabelText(/i consent to lota canada/i));
        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /send message/i }));
        // Verify loading state
        expect(screen.getByRole('button', { name: /sending/i })).toBeInTheDocument();
        // Verify success message appears
        yield waitFor(() => {
            expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
        });
    }));
    test('handles API errors gracefully', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock API error
        mockFetch.mockRejectedValueOnce(new Error('Network error'));
        render(<ContactForm />);
        // Fill out the form with valid data
        fireEvent.change(screen.getByLabelText(/your name/i), {
            target: { value: 'John Doe' }
        });
        fireEvent.change(screen.getByLabelText(/email address/i), {
            target: { value: 'john@example.com' }
        });
        // Select department
        const departmentTrigger = screen.getByLabelText(/department/i);
        fireEvent.click(departmentTrigger);
        fireEvent.click(screen.getByText(/general inquiries/i));
        fireEvent.change(screen.getByLabelText(/subject/i), {
            target: { value: 'Test Subject' }
        });
        fireEvent.change(screen.getByLabelText(/message/i), {
            target: { value: 'This is a test message that is long enough to pass validation.' }
        });
        // Check privacy policy
        fireEvent.click(screen.getByLabelText(/i consent to lota canada/i));
        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /send message/i }));
        // Verify error message appears
        yield waitFor(() => {
            expect(screen.getByText(/there was an error submitting your message/i)).toBeInTheDocument();
        });
    }));
    test('clears errors when fields are corrected', () => __awaiter(void 0, void 0, void 0, function* () {
        render(<ContactForm />);
        // Submit empty form to trigger errors
        fireEvent.click(screen.getByRole('button', { name: /send message/i }));
        // Verify errors appear
        yield waitFor(() => {
            expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        });
        // Fix one field
        fireEvent.change(screen.getByLabelText(/your name/i), {
            target: { value: 'John Doe' }
        });
        // Verify that specific error is cleared
        yield waitFor(() => {
            expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
        });
        // Other errors should still be present
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    }));
    test('validates email format', () => __awaiter(void 0, void 0, void 0, function* () {
        render(<ContactForm />);
        // Enter invalid email
        fireEvent.change(screen.getByLabelText(/email address/i), {
            target: { value: 'invalid-email' }
        });
        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /send message/i }));
        // Verify email format error appears
        yield waitFor(() => {
            expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
        });
        // Fix email
        fireEvent.change(screen.getByLabelText(/email address/i), {
            target: { value: 'valid@example.com' }
        });
        // Verify error is cleared
        yield waitFor(() => {
            expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument();
        });
    }));
    test('validates message length', () => __awaiter(void 0, void 0, void 0, function* () {
        render(<ContactForm />);
        // Enter short message
        fireEvent.change(screen.getByLabelText(/message/i), {
            target: { value: 'Too short' }
        });
        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /send message/i }));
        // Verify message length error appears
        yield waitFor(() => {
            expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
        });
        // Fix message
        fireEvent.change(screen.getByLabelText(/message/i), {
            target: { value: 'This message is now long enough to pass validation.' }
        });
        // Verify error is cleared
        yield waitFor(() => {
            expect(screen.queryByText(/message must be at least 10 characters/i)).not.toBeInTheDocument();
        });
    }));
});
