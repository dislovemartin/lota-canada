import { validateEmail, validateForm, validateMinLength, validatePhone, validateRequired, } from '@/lib/utils';
describe('Form Validation Utilities', () => {
    describe('validateEmail', () => {
        test('returns valid for correct email addresses', () => {
            expect(validateEmail('user@example.com')).toEqual({ valid: true });
            expect(validateEmail('name.surname@domain.co.uk')).toEqual({ valid: true });
            expect(validateEmail('user+tag@example.org')).toEqual({ valid: true });
        });
        test('returns invalid for empty email', () => {
            expect(validateEmail('')).toEqual({
                valid: false,
                error: 'Email is required'
            });
            expect(validateEmail('   ')).toEqual({
                valid: false,
                error: 'Email is required'
            });
        });
        test('returns invalid for malformed email addresses', () => {
            expect(validateEmail('user@')).toEqual({
                valid: false,
                error: 'Please enter a valid email address'
            });
            expect(validateEmail('user@domain')).toEqual({
                valid: false,
                error: 'Please enter a valid email address'
            });
            expect(validateEmail('user.domain.com')).toEqual({
                valid: false,
                error: 'Please enter a valid email address'
            });
        });
    });
    describe('validateRequired', () => {
        test('returns valid for non-empty values', () => {
            expect(validateRequired('Some text', 'Field')).toEqual({ valid: true });
            expect(validateRequired('123', 'Field')).toEqual({ valid: true });
        });
        test('returns invalid for empty values', () => {
            expect(validateRequired('', 'Name')).toEqual({
                valid: false,
                error: 'Name is required'
            });
            expect(validateRequired('   ', 'Subject')).toEqual({
                valid: false,
                error: 'Subject is required'
            });
        });
    });
    describe('validateMinLength', () => {
        test('returns valid for values meeting minimum length', () => {
            expect(validateMinLength('12345', 5, 'Password')).toEqual({ valid: true });
            expect(validateMinLength('This is a message', 10, 'Message')).toEqual({ valid: true });
        });
        test('returns invalid for empty values', () => {
            expect(validateMinLength('', 5, 'Password')).toEqual({
                valid: false,
                error: 'Password is required'
            });
        });
        test('returns invalid for values below minimum length', () => {
            expect(validateMinLength('1234', 5, 'Password')).toEqual({
                valid: false,
                error: 'Password must be at least 5 characters'
            });
            expect(validateMinLength('Short', 10, 'Message')).toEqual({
                valid: false,
                error: 'Message must be at least 10 characters'
            });
        });
    });
    describe('validatePhone', () => {
        test('returns valid for correct phone numbers', () => {
            expect(validatePhone('123-456-7890')).toEqual({ valid: true });
            expect(validatePhone('(123) 456-7890')).toEqual({ valid: true });
            expect(validatePhone('1234567890')).toEqual({ valid: true });
            expect(validatePhone('+1 123 456 7890')).toEqual({ valid: true });
        });
        test('returns valid for empty phone (optional field)', () => {
            expect(validatePhone('')).toEqual({ valid: true });
            expect(validatePhone('   ')).toEqual({ valid: true });
        });
        test('returns invalid for malformed phone numbers', () => {
            expect(validatePhone('123-456')).toEqual({
                valid: false,
                error: 'Please enter a valid phone number'
            });
            expect(validatePhone('abcdefghij')).toEqual({
                valid: false,
                error: 'Please enter a valid phone number'
            });
        });
    });
    describe('validateForm', () => {
        test('returns empty errors object for valid form data', () => {
            const formData = {
                name: 'John Doe',
                email: 'john@example.com',
                message: 'This is a test message',
            };
            const validations = {
                name: (value) => validateRequired(value, 'Name'),
                email: validateEmail,
                message: (value) => validateMinLength(value, 10, 'Message'),
            };
            expect(validateForm(formData, validations)).toEqual({});
        });
        test('returns errors for invalid form data', () => {
            const formData = {
                name: '',
                email: 'invalid-email',
                message: 'Short',
            };
            const validations = {
                name: (value) => validateRequired(value, 'Name'),
                email: validateEmail,
                message: (value) => validateMinLength(value, 10, 'Message'),
            };
            expect(validateForm(formData, validations)).toEqual({
                name: 'Name is required',
                email: 'Please enter a valid email address',
                message: 'Message must be at least 10 characters',
            });
        });
        test('handles missing fields gracefully', () => {
            const formData = {
                name: 'John Doe',
                // email is missing
            };
            const validations = {
                name: (value) => validateRequired(value, 'Name'),
                email: validateEmail,
            };
            expect(validateForm(formData, validations)).toEqual({
                email: 'Email is required',
            });
        });
    });
});
