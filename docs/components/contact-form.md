# Contact Form Component

## Purpose

The Contact Form component provides a user-friendly interface for visitors to send messages to LOTA Canada.
It includes comprehensive form validation, accessibility features, and clear privacy notices to ensure users understand how their data will be handled.
The component is designed to be responsive, accessible, and provide clear feedback to users throughout the submission process.

## Requirements

- Collect essential contact information (name, email, subject, message)
- Include department selection for routing inquiries
- Implement comprehensive client-side validation
- Provide clear error messages for invalid inputs
- Display loading states during form submission
- Show success/error feedback after submission
- Include privacy notice and consent checkbox
- Ensure full accessibility for all users
- Support responsive layout across all device sizes

## Technical Implementation

### Component Structure

The Contact Form is composed of several sub-components:

- Form fields (Input, Textarea, Select components)
- Validation error messages
- Privacy notice section
- Consent checkbox
- Submit button with loading state
- Success/error notification
- Screen reader status announcements

### State Management

- `formState`: Tracks values of all form fields
- `errors`: Stores validation error messages
- `isSubmitting`: Tracks form submission status
- `submitResult`: Stores API response for success/error feedback

### Validation Logic

The form implements comprehensive validation:

- Required field validation for all fields
- Email format validation
- Minimum length validation for message
- Privacy policy consent validation
- Real-time error clearing when fields are corrected
- Focus management for invalid fields

### Accessibility Implementation

- Proper labeling of all form fields
- ARIA attributes for validation states
- Error messages linked to form fields
- Status announcements for screen readers
- Keyboard navigation support
- Focus management during submission

## Props API

| Prop              | Type                       | Default     | Description                                                |
| ----------------- | -------------------------- | ----------- | ---------------------------------------------------------- |
| `onSubmitSuccess` | `(data: FormData) => void` | `undefined` | Optional callback function called on successful submission |
| `onSubmitError`   | `(error: Error) => void`   | `undefined` | Optional callback function called on submission error      |
| `initialValues`   | `Partial<FormData>`        | `{}`        | Optional initial values for form fields                    |
| `departments`     | `Department[]`             | `[]`        | Array of department options                                |

### Types

```typescript
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  department: string;
  privacyPolicy: boolean;
}

interface Department {
  value: string;
  label: string;
}
```

## Usage Examples

### Basic Usage

```tsx
import { ContactForm } from "@/components/contact/contact-form";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <ContactForm />
    </div>
  );
}
```

### With Custom Departments

```tsx
import { ContactForm } from "@/components/contact/contact-form";

const departments = [
  { value: "general", label: "General Inquiries" },
  { value: "membership", label: "Membership" },
  { value: "programs", label: "Programs & Events" },
  { value: "partnerships", label: "Partnership Opportunities" },
  { value: "media", label: "Media Relations" },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <ContactForm departments={departments} />
    </div>
  );
}
```

### With Success Callback

```tsx
import { ContactForm } from "@/components/contact/contact-form";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();

  const handleSubmitSuccess = () => {
    // Redirect to thank you page after successful submission
    router.push("/contact/thank-you");
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <ContactForm onSubmitSuccess={handleSubmitSuccess} />
    </div>
  );
}
```

## Styling and Customization

### CSS Variables

The Contact Form component uses the following CSS variables that can be customized:

| Variable               | Default                   | Description                      |
| ---------------------- | ------------------------- | -------------------------------- |
| `--form-input-border`  | `hsl(var(--border))`      | Border color for form inputs     |
| `--form-input-bg`      | `hsl(var(--background))`  | Background color for form inputs |
| `--form-error-color`   | `hsl(var(--destructive))` | Color for error messages         |
| `--form-success-color` | `hsl(142.1 76.2% 36.3%)`  | Color for success messages       |
| `--form-text`          | `hsl(var(--foreground))`  | Text color for form elements     |
| `--form-label`         | `hsl(var(--foreground))`  | Text color for form labels       |

### Tailwind Classes

Key Tailwind classes used for styling:

- Form Container: `space-y-6`
- Input Fields: `border rounded-md px-3 py-2`
- Error Messages: `text-red-500 text-sm mt-1 flex items-center`
- Privacy Notice: `text-sm text-gray-600 dark:text-gray-300 p-4 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700`
- Submit Button: `w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground`

### Customization Examples

#### Custom Error Color

```css
:root {
  --form-error-color: #e53e3e;
}
```

#### Custom Input Styling

```css
:root {
  --form-input-border: #cbd5e0;
  --form-input-bg: #f7fafc;
}
```

## Known Limitations and Edge Cases

### Limitations

- The form does not support file uploads
- Department options are limited to a predefined list
- Form validation is client-side only
- No CAPTCHA or spam protection implemented
- No internationalization support for error messages

### Edge Cases

- **Very Long Input Values**: Extremely long input values may cause layout issues
- **Network Failures**: The form handles network failures but cannot retry automatically
- **Slow Connections**: Loading states are provided but may be prolonged on very slow connections
- **Form Autofill**: Browser autofill may not trigger validation until user interaction

### Browser Support

- Full support: Chrome, Firefox, Safari, Edge (latest 2 versions)
- Partial support: IE11 (basic functionality works, but some styling and animations may differ)

## Accessibility Considerations

### ARIA Implementation

- `aria-required="true"` on required fields
- `aria-invalid` indicates validation state
- `aria-describedby` links error messages to form fields
- `role="alert"` on error messages for immediate announcement
- `aria-live` regions for status updates
- `aria-busy` on submit button during submission

### Keyboard Navigation

- All form fields are focusable in a logical order
- Error messages are associated with their respective fields
- Focus is moved to the first error field when validation fails
- Submit button is disabled during submission to prevent double submission

### Screen Reader Considerations

- Status region announces form submission status
- Error messages are announced when they appear
- Required fields are properly indicated
- Success/error messages are announced after submission
- Privacy notice is properly structured for screen readers

### Color and Contrast

- Error messages use both color and icons to indicate errors
- All text meets WCAG AA contrast requirements (4.5:1 for normal text)
- Focus indicators are visible in both light and dark modes
- Required field indicators use both color and text

## Testing Approach

### Unit Tests

- Test individual validation functions
- Test form state management
- Test error message generation
- Test privacy policy validation

### Integration Tests

- Test complete form submission flow
- Test validation error scenarios
- Test API error handling
- Test loading states during submission
- Test success and error messages
- Test form reset functionality

### Accessibility Tests

- Automated testing with axe-core or similar tools
- Keyboard navigation testing
- Screen reader testing with NVDA and VoiceOver
- Color contrast verification

### Performance Tests

- Test form submission under various network conditions
- Test form rendering performance with many fields
- Test validation performance with complex validation rules

## Decision History

### Architectural Decisions

| Decision                | Alternatives Considered                  | Rationale                                                                                                                                                            |
| ----------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Client-side validation  | Server-side only, Hybrid                 | Client-side validation provides immediate feedback to users without requiring a round trip to the server. Server-side validation is still implemented as a fallback. |
| Custom validation logic | Form libraries (Formik, React Hook Form) | Custom validation provides more control over the validation process and error messages, while keeping the bundle size smaller.                                       |
| Inline error messages   | Error summary, Modal errors              | Inline error messages provide context-specific feedback directly next to the field with the error, improving usability.                                              |
| Privacy notice section  | Modal, Separate page                     | An inline privacy notice ensures users see the information before submitting, improving transparency and compliance.                                                 |

### Evolution History

#### Version 1.0 (Initial)

- Basic form with name, email, subject, message fields
- Simple validation
- Submit button with loading state

#### Version 2.0 (Current)

- Added department selection
- Enhanced validation with better error messages
- Added privacy notice and consent checkbox
- Improved accessibility with ARIA attributes
- Added screen reader announcements
- Enhanced success/error feedback
- Responsive design improvements

### Future Considerations

- Add file upload capability
- Implement CAPTCHA or other spam protection
- Add internationalization support for error messages
- Implement analytics tracking for form usage
- Add form saving/resuming capability for long forms
