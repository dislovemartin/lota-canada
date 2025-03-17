# Components Directory

This directory contains reusable UI components for the LOTA Canada website.

## Component Structure

Components are organized into the following categories:

- `ui/`: Core UI components based on Radix UI primitives
- `ui-temp/`: Temporary UI components that will be migrated to the `ui/` directory
- `contact/`: Components related to contact forms and communication
- Other top-level components are more specialized and used across multiple pages

## Radix UI Best Practices

When working with Radix UI components, follow these guidelines:

### 1. Single Child Elements

Many Radix UI components (especially triggers) use `React.Children.only()` internally, which requires exactly one child element. Always provide a single child to these components:

```jsx
// ✅ CORRECT
<TooltipTrigger>
  <Button>Hover me</Button>
</TooltipTrigger>

// ❌ INCORRECT
<TooltipTrigger>
  <>
    <Icon />
    <span>Hover me</span>
  </>
</TooltipTrigger>
```

### 2. Use Wrapper Elements

If you need to include multiple elements inside a trigger component, wrap them in a single element:

```jsx
// ✅ CORRECT
<DialogTrigger>
  <div className="flex items-center gap-2">
    <Icon />
    <span>Open Dialog</span>
  </div>
</DialogTrigger>
```

### 3. Leverage `asChild` Prop

Use the `asChild` prop to compose Radix UI components with your own components:

```jsx
// ✅ RECOMMENDED
<DialogTrigger asChild>
  <Button variant="outline">Open Dialog</Button>
</DialogTrigger>
```

### 4. Use the SafeChildren Utility

For complex cases, use the `SafeChildren` utility component:

```jsx
import { SafeChildren } from "@/components/ui/safe-children";

<TooltipTrigger>
  <SafeChildren className="flex items-center gap-2">
    <Icon />
    <span>Hover me</span>
  </SafeChildren>
</TooltipTrigger>
```

For more detailed guidelines, see the [Radix UI Best Practices](../docs/radix-ui-best-practices.md) documentation.

## Component Development Guidelines

1. Use TypeScript for all new components
2. Follow the naming convention of existing components
3. Include JSDoc comments for component props
4. Use the `cn` utility for combining Tailwind classes
5. Ensure components are accessible (proper ARIA attributes, keyboard navigation)
6. Test components in both light and dark mode

## Adding New Components

When adding a new component:

1. Create the component in the appropriate directory
2. Export the component from the directory's index file (if applicable)
3. Add appropriate TypeScript types and JSDoc comments
4. Consider creating a storybook story for the component
5. Update this README if the component introduces new patterns or guidelines 