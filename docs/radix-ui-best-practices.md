# Radix UI Best Practices: Child Components

## Overview

This document outlines best practices for working with Radix UI components, particularly focusing on proper child component handling to avoid React errors related to `React.Children.only()`.

## Key Guidelines

### 1. Always Provide a Single Child Element to Trigger Components

Many Radix UI components (like `Trigger` components) use `React.Children.only()` internally, which expects exactly one child element. Providing multiple children or empty fragments will cause React errors.

```jsx
// ❌ INCORRECT - Empty fragment
<PopoverTrigger>
  <>
  </>
</PopoverTrigger>

// ❌ INCORRECT - Multiple children
<PopoverTrigger>
  <span>Click me</span>
  <Icon />
</PopoverTrigger>

// ✅ CORRECT - Single child element
<PopoverTrigger>
  <button>Click me</button>
</PopoverTrigger>
```

### 2. Avoid Using Empty Fragments in Trigger Components

Empty fragments (`<></>`) are particularly problematic with Radix UI components that expect a single child.

```jsx
// ❌ INCORRECT
<TooltipTrigger>
  <>
  </>
</TooltipTrigger>

// ✅ CORRECT
<TooltipTrigger>
  <div>Hover me</div>
</TooltipTrigger>
```

### 3. Use Wrapper Elements When Needed

If you need a container for multiple elements, wrap them in a single element like `<div>` or `<span>`.

```jsx
// ❌ INCORRECT
<DialogTrigger>
  <Icon />
  <span>Open Dialog</span>
</DialogTrigger>

// ✅ CORRECT
<DialogTrigger>
  <div className="flex items-center gap-2">
    <Icon />
    <span>Open Dialog</span>
  </div>
</DialogTrigger>
```

### 4. Leverage the `asChild` Prop for Composition

Radix UI provides an `asChild` prop that allows you to use your own component as the trigger while maintaining accessibility and behavior.

```jsx
// ✅ RECOMMENDED
<DialogTrigger asChild>
  <Button variant="outline">Open Dialog</Button>
</DialogTrigger>
```

### 5. Components That Commonly Use `React.Children.only()`

The following Radix UI components in our codebase use `React.Children.only()` and require special attention:

- `PopoverTrigger`
- `TooltipTrigger`
- `DialogTrigger`
- `HoverCardTrigger`
- `ContextMenuTrigger`
- `DropdownMenuTrigger`

## Implementation Examples

### Example 1: Button with Icon in a Trigger

```jsx
<PopoverTrigger>
  <Button className="flex items-center gap-2">
    <Icon />
    <span>Click me</span>
  </Button>
</PopoverTrigger>
```

### Example 2: Using `asChild` with Custom Components

```jsx
<TooltipTrigger asChild>
  <CustomButton onClick={handleClick}>
    Hover for tooltip
  </CustomButton>
</TooltipTrigger>
```

### Example 3: Conditional Rendering

```jsx
<DialogTrigger>
  {isLoading ? (
    <Button disabled>
      <Spinner className="mr-2" />
      Loading...
    </Button>
  ) : (
    <Button>Open Dialog</Button>
  )}
</DialogTrigger>
```

## Troubleshooting

If you encounter the error "React.Children.only expected to receive a single React element child", check:

1. That your trigger component has exactly one child element
2. That you're not using empty fragments (`<></>`)
3. That conditional rendering doesn't result in multiple children
4. That you're properly using the `asChild` prop when composing with other components

## References

- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [React Children API](https://reactjs.org/docs/react-api.html#reactchildren) 