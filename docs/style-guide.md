# LOTA Canada Style Guide

This style guide provides comprehensive guidelines for maintaining consistency, accessibility, and quality across the LOTA Canada website.

## Table of Contents

1. [Design Principles](#design-principles)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Components](#components)
5. [Accessibility Standards](#accessibility-standards)
6. [Responsive Design](#responsive-design)
7. [Code Conventions](#code-conventions)
8. [Performance Guidelines](#performance-guidelines)

## Design Principles

The LOTA Canada website adheres to the following design principles:

- **Clarity**: Information is presented clearly and concisely
- **Accessibility**: All content is accessible to users with disabilities
- **Consistency**: UI elements maintain consistent behavior and appearance
- **Responsiveness**: The website functions well on all device sizes
- **Professionalism**: The design reflects LOTA Canada's professional identity

## Color Palette

The LOTA Canada website uses the following color palette:

| Color Name     | Hex Code  | Usage                                 |
| -------------- | --------- | ------------------------------------- |
| Primary        | `#0F52BA` | Primary buttons, links, and accents   |
| Secondary      | `#F5A623` | Secondary buttons, highlights         |
| Neutral Dark   | `#333333` | Text, headings                        |
| Neutral Medium | `#666666` | Secondary text                        |
| Neutral Light  | `#EEEEEE` | Backgrounds, dividers                 |
| White          | `#FFFFFF` | Backgrounds, text on dark backgrounds |
| Success        | `#28A745` | Success messages, indicators          |
| Error          | `#DC3545` | Error messages, validation            |
| Warning        | `#FFC107` | Warning messages, alerts              |
| Info           | `#17A2B8` | Information messages                  |

### Accessibility Considerations

- Ensure text has sufficient contrast against its background (minimum 4.5:1 for normal text, 3:1 for large text)
- Don't rely solely on color to convey information
- Provide additional visual cues (icons, patterns) alongside color

## Typography

The LOTA Canada website uses the following typography:

- **Headings**: Inter, sans-serif
- **Body Text**: Inter, sans-serif
- **Font Sizes**:
  - Heading 1: 2.5rem (40px)
  - Heading 2: 2rem (32px)
  - Heading 3: 1.75rem (28px)
  - Heading 4: 1.5rem (24px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

### Accessibility Considerations

- Maintain a minimum font size of 16px for body text
- Use relative units (rem) for font sizes to respect user preferences
- Ensure sufficient line height (1.5 for body text)
- Limit line length to 80 characters for readability

## Components

### Button

Buttons should be used for actions that trigger a change or navigation.

```jsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Tertiary Action</Button>
```

#### Accessibility Considerations

- Use the `button` element for buttons, not divs or spans
- Provide descriptive text that indicates the action
- Include `aria-label` for icon-only buttons
- Ensure focus states are visible

### Form Elements

Form elements should provide clear feedback and validation.

```jsx
<Input
  label="Email Address"
  type="email"
  required
  aria-describedby="email-error"
/>
<Select
  label="Department"
  options={departmentOptions}
  required
/>
<Checkbox
  label="I agree to the terms"
  required
/>
```

#### Accessibility Considerations

- Always use labels for form elements
- Provide clear error messages
- Use `aria-required` for required fields
- Use `aria-invalid` for fields with errors
- Use `aria-describedby` to associate error messages with fields

### Navigation

Navigation should be consistent and accessible.

```jsx
<Header />
<Footer />
```

#### Accessibility Considerations

- Provide a skip link to bypass navigation
- Ensure keyboard navigation works properly
- Use `aria-current` to indicate the current page
- Ensure dropdown menus are accessible via keyboard

## Accessibility Standards

The LOTA Canada website adheres to WCAG 2.1 AA standards. Key requirements include:

- **Perceivable**: Information must be presentable to users in ways they can perceive

  - Provide text alternatives for non-text content
  - Provide captions and alternatives for multimedia
  - Create content that can be presented in different ways
  - Make it easier for users to see and hear content

- **Operable**: User interface components must be operable

  - Make all functionality available from a keyboard
  - Give users enough time to read and use content
  - Do not use content that causes seizures
  - Provide ways to help users navigate and find content

- **Understandable**: Information and operation must be understandable

  - Make text readable and understandable
  - Make content appear and operate in predictable ways
  - Help users avoid and correct mistakes

- **Robust**: Content must be robust enough to be interpreted by a variety of user agents
  - Maximize compatibility with current and future user tools

## Responsive Design

The LOTA Canada website uses a mobile-first approach with the following breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Guidelines

- Design for mobile first, then enhance for larger screens
- Use relative units for sizing (%, rem, em)
- Test on a variety of devices and screen sizes
- Ensure touch targets are at least 44px × 44px
- Avoid horizontal scrolling

## Code Conventions

### TypeScript

- Use TypeScript for all components
- Define interfaces for props and state
- Use proper type annotations for functions and variables
- Avoid using `any` type

```typescript
interface ButtonProps {
  variant: "primary" | "secondary" | "outline";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ variant, children, onClick, disabled }: ButtonProps) {
  // Component implementation
}
```

### React

- Use functional components with hooks
- Use named exports for components
- Keep components small and focused
- Use proper prop naming conventions

```typescript
export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    // Initial state
  });

  // Component implementation
}
```

### CSS/Tailwind

- Use Tailwind CSS for styling
- Use consistent class naming conventions
- Extract common patterns to components
- Use CSS variables for theming

```jsx
<div className="bg-primary text-white p-4 rounded-md shadow-md">
  {/* Content */}
</div>
```

## Performance Guidelines

- Keep bundle size under 200KB (compressed)
- Aim for a First Contentful Paint under 1.2 seconds
- Optimize images using next/image
- Use code splitting for large components
- Implement proper caching strategies
- Minimize third-party scripts

### Testing Performance

- Use Lighthouse for performance audits
- Test on low-end devices and slow connections
- Monitor Core Web Vitals
- Implement performance regression testing

---

This style guide is a living document and will be updated as the LOTA Canada website evolves. For questions or suggestions, please contact the development team.
