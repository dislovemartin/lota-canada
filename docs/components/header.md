# Header Component

## Purpose

The Header component serves as the primary navigation element for the LOTA Canada website.
It provides access to all main sections of the site and maintains consistent branding across pages.
The component is designed to be responsive, accessible, and support both light and dark modes.

## Requirements

- Display the LOTA Canada logo with proper alt text
- Provide navigation links to primary site sections with dropdown support
- Support responsive behavior across all device sizes (mobile, tablet, desktop)
- Include a call-to-action button for contact
- Support both light and dark modes
- Maintain accessibility for all users including keyboard navigation
- Provide a skip-to-content link for accessibility
- Implement proper ARIA attributes for screen readers
- Handle scroll behavior to change appearance when scrolling

## Technical Implementation

### Component Structure

The Header is composed of several sub-components:

- Logo (Image component with text alternative)
- Navigation Links (responsive, with dropdown menus)
- Contact CTA Button
- Mobile Menu Toggle (Sheet component for mobile navigation)
- Skip to Content Link (for accessibility)

### State Management

- `mobileMenuOpen`: Controls mobile menu visibility
- `scrolled`: Tracks scroll position to modify header styling
- `activeSubmenu`: Manages which dropdown menu is currently open

### Rendering Logic

The component uses responsive breakpoints to determine the appropriate layout:

- Mobile (<768px): Collapsed menu with hamburger icon in a slide-out sheet
- Tablet (768px-1023px): Simplified navigation with dropdown for secondary items
- Desktop (≥1024px): Full navigation with all primary links visible

### Accessibility Implementation

- Skip to content link for keyboard users
- ARIA roles and attributes for navigation elements
- Keyboard navigation support for dropdown menus
- Proper focus management for interactive elements
- Semantic HTML structure with appropriate landmarks

### Performance Considerations

- Throttled scroll listener to prevent performance issues
- Conditional rendering of dropdown menus
- Framer Motion for smooth animations
- Image optimization for the logo

## Props API

| Prop          | Type               | Default          | Description                                        |
| ------------- | ------------------ | ---------------- | -------------------------------------------------- |
| `transparent` | `boolean`          | `false`          | Whether the header should be transparent initially |
| `darkMode`    | `boolean`          | `false`          | Whether to use dark mode styling                   |
| `navigation`  | `NavigationItem[]` | `[]`             | Array of navigation items                          |
| `logo`        | `string`           | `'/logo.png'`    | Path to the logo image                             |
| `logoAlt`     | `string`           | `'LOTA Canada'`  | Alt text for the logo                              |
| `ctaText`     | `string`           | `'Get in Touch'` | Text for the call-to-action button                 |
| `ctaUrl`      | `string`           | `'/contact'`     | URL for the call-to-action button                  |

### Types

```typescript
interface NavigationItem {
  name: string;
  href: string;
  submenu?: {
    name: string;
    href: string;
  }[];
}
```

## Usage Examples

### Basic Usage

```tsx
import Header from "@/components/header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
    </>
  );
}
```

### With Custom Navigation

```tsx
import Header from "@/components/header";

const customNavigation = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    submenu: [
      { name: "Our Mission", href: "/about/mission" },
      { name: "Team", href: "/about/team" },
    ],
  },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Layout({ children }) {
  return (
    <>
      <Header navigation={customNavigation} />
      <main id="main-content">{children}</main>
    </>
  );
}
```

### Transparent Header for Hero Pages

```tsx
import Header from "@/components/header";
import Hero from "@/components/hero";

export default function HomePage() {
  return (
    <>
      <Header transparent darkMode />
      <Hero />
      <main id="main-content">{/* Rest of page content */}</main>
    </>
  );
}
```

## Styling and Customization

### CSS Variables

The Header component uses the following CSS variables that can be customized:

| Variable                  | Default                          | Description                       |
| ------------------------- | -------------------------------- | --------------------------------- |
| `--header-height`         | `64px`                           | Height of the header              |
| `--header-bg`             | `hsl(var(--background))`         | Background color in light mode    |
| `--header-bg-transparent` | `transparent`                    | Background color when transparent |
| `--header-text`           | `hsl(var(--foreground))`         | Text color in light mode          |
| `--header-text-dark`      | `hsl(var(--primary-foreground))` | Text color in dark mode           |
| `--header-border`         | `hsl(var(--border))`             | Border color in light mode        |
| `--header-shadow`         | `0 2px 4px rgba(0,0,0,0.1)`      | Shadow when scrolled              |

### Tailwind Classes

Key Tailwind classes used for styling:

- Container: `fixed left-0 right-0 z-[9999] transition-all duration-300`
- Logo: `h-8 w-auto`
- Navigation: `hidden lg:flex lg:items-center lg:justify-center lg:flex-1`
- Mobile Menu: `lg:hidden`
- CTA Button: `bg-primary hover:bg-primary/90 text-primary-foreground font-medium`

### Customization Examples

#### Custom Header Height

```css
:root {
  --header-height: 80px;
}
```

#### Custom Color Scheme

```css
:root {
  --header-bg: #f0f4f8;
  --header-text: #2d3748;
  --header-border: #cbd5e0;
}
```

## Known Limitations and Edge Cases

### Limitations

- The mobile menu animation may appear jerky on older devices
- Very long navigation labels may cause layout issues on tablet viewports
- Maximum recommended number of top-level navigation items is 6
- Dropdown menus support only one level of nesting

### Edge Cases

- **Many Navigation Items**: With more than 6 top-level items, consider using a "More" dropdown
- **No JavaScript**: The mobile menu requires JavaScript; ensure proper fallback for users with JS disabled
- **Nested Routes**: Active state highlighting works best with simple routes; nested routes may require custom logic
- **Very Long Dropdown Items**: Extremely long dropdown item text may cause layout issues

### Browser Support

- Full support: Chrome, Firefox, Safari, Edge (latest 2 versions)
- Partial support: IE11 (basic functionality works, but animations and some styling may differ)

## Accessibility Considerations

### ARIA Implementation

- `role="banner"` applied to the header element
- `aria-label="Main navigation"` applied to the nav element
- `aria-expanded` used on dropdown buttons to indicate state
- `aria-haspopup="menu"` on dropdown buttons
- `aria-controls` links dropdown buttons to their menus
- `role="menu"` and `role="menuitem"` for dropdown navigation
- `aria-hidden="true"` applied to decorative elements

### Keyboard Navigation

- Skip to content link for keyboard users
- Tab key navigates through all interactive elements
- Enter/Space activates dropdown menus
- Escape key closes open dropdown menus
- Arrow keys could be implemented for dropdown navigation

### Screen Reader Considerations

- Skip link provided to bypass navigation
- Proper heading structure within the component
- Image logo includes proper alt text
- Dropdown menus are properly announced
- Mobile menu button has descriptive text for screen readers

### Color and Contrast

- All text meets WCAG AA contrast requirements (4.5:1 for normal text)
- Focus indicators are visible in both light and dark modes
- Interactive elements have distinct hover and focus states
- Color is not the only means of conveying information

## Testing Approach

### Unit Tests

- Verify rendering of all subcomponents
- Test responsive behavior at different viewport sizes
- Test state changes (menu open/close, scroll behavior)
- Test prop variations and defaults
- Verify correct rendering of conditional elements

### Integration Tests

- Test navigation functionality within the application
- Verify correct interaction with other components
- Test keyboard navigation
- Verify correct theme application (light/dark mode)

### Accessibility Tests

- Automated testing with axe-core or similar tools
- Keyboard navigation testing
- Screen reader testing with NVDA and VoiceOver
- Color contrast verification

### Browser Testing

- Cross-browser testing on Chrome, Firefox, Safari, and Edge
- Mobile testing on iOS and Android devices
- Responsive behavior testing at standard breakpoints

## Decision History

### Architectural Decisions

| Decision                          | Alternatives Considered          | Rationale                                                                                                                                                                              |
| --------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fixed position header             | Sticky header, Static header     | Fixed position provides consistent navigation access while maximizing content space. Sticky would require additional scroll logic, while static would reduce navigation accessibility. |
| Sheet component for mobile menu   | Inline dropdown, Off-canvas menu | The Sheet component provides a clean, accessible way to handle mobile navigation with built-in accessibility features and animations.                                                  |
| Framer Motion for animations      | CSS transitions, React Spring    | Framer Motion provides a good balance of performance and developer experience, with built-in accessibility features for animations.                                                    |
| Dropdown menus on hover and click | Click-only dropdowns             | Supporting both hover and click provides better usability for both mouse and touch users, while maintaining keyboard accessibility.                                                    |

### Evolution History

#### Version 1.0 (Initial)

- Basic responsive header with logo and navigation
- Mobile hamburger menu
- Light mode only

#### Version 2.0 (Current)

- Added dark mode support
- Improved mobile menu with Sheet component
- Added dropdown menu support
- Improved accessibility with ARIA attributes
- Added skip to content link
- Added keyboard navigation support
- Optimized performance with throttled scroll listener

### Future Considerations

- Mega menu support for complex navigation structures
- Internationalization support for navigation items
- Search integration in the header
- User account/profile section integration
- Active state highlighting for current page
