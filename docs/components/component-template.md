# Component Name

## Overview

Brief description of the component and its purpose.

## Usage

```jsx
import { ComponentName } from "@/components/component-name";

export default function Example() {
  return <ComponentName prop1="value" prop2={true} />;
}
```

## Props

| Name       | Type        | Default | Description                                 |
| ---------- | ----------- | ------- | ------------------------------------------- |
| `prop1`    | `string`    | `""`    | Description of prop1                        |
| `prop2`    | `boolean`   | `false` | Description of prop2                        |
| `children` | `ReactNode` | -       | Content to be rendered inside the component |

## Variants

### Variant 1

Description of variant 1.

```jsx
<ComponentName variant="primary" />
```

### Variant 2

Description of variant 2.

```jsx
<ComponentName variant="secondary" />
```

## Accessibility

### ARIA Attributes

- `aria-label`: Used for...
- `aria-expanded`: Used for...

### Keyboard Navigation

- `Tab`: Moves focus to the component
- `Enter`/`Space`: Activates the component
- `Escape`: Closes or cancels the component

### Screen Reader Considerations

- Component announces its state changes
- Uses proper semantic HTML elements
- Provides appropriate text alternatives

## Best Practices

- Use this component when...
- Avoid using this component when...
- Combine with these components for best results...

## Examples

### Basic Example

```jsx
<ComponentName prop1="value" />
```

### Complex Example

```jsx
<ComponentName
  prop1="value"
  prop2={true}
  onEvent={() => console.log("Event triggered")}
>
  <ChildComponent />
</ComponentName>
```

## Implementation Details

### State Management

Description of how state is managed within the component.

### Event Handling

Description of how events are handled.

### Styling

Description of styling approach and customization options.

## Testing

### Unit Tests

```jsx
// Example test
test("renders correctly", () => {
  render(<ComponentName />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});
```

### Accessibility Tests

```jsx
// Example accessibility test
test("has no accessibility violations", async () => {
  const { container } = render(<ComponentName />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Related Components

- [RelatedComponent1](/docs/components/related-component-1)
- [RelatedComponent2](/docs/components/related-component-2)

## Changelog

| Version | Changes                                |
| ------- | -------------------------------------- |
| 1.0.0   | Initial implementation                 |
| 1.1.0   | Added prop3 for enhanced functionality |

## Workflow Components

### Creating a Workflow

```jsx
import { CreateWorkflow } from "@/components/workflows/create";

export default function Example() {
  return <CreateWorkflow />;
}
```

### Executing a Workflow

```jsx
import { ExecuteWorkflow } from "@/components/workflows/execute";

export default function Example() {
  return <ExecuteWorkflow />;
}
```

## Props for Workflow Components

### CreateWorkflow Props

| Name       | Type        | Default | Description                                 |
| ---------- | ----------- | ------- | ------------------------------------------- |
| `onSuccess`| `function`  | `null`  | Callback function to handle success         |
| `onError`  | `function`  | `null`  | Callback function to handle error           |

### ExecuteWorkflow Props

| Name       | Type        | Default | Description                                 |
| ---------- | ----------- | ------- | ------------------------------------------- |
| `onSuccess`| `function`  | `null`  | Callback function to handle success         |
| `onError`  | `function`  | `null`  | Callback function to handle error           |

## State Management for Workflow Components

### CreateWorkflow State

- `workflow`: Object representing the workflow being created
- `loading`: Boolean indicating if the creation process is ongoing
- `error`: String containing any error message

### ExecuteWorkflow State

- `workflows`: Array of available workflows
- `selectedWorkflowId`: ID of the selected workflow
- `payloadId`: ID of the payload to be processed
- `bucketId`: ID of the bucket where data is stored
- `loading`: Boolean indicating if the execution process is ongoing
- `error`: String containing any error message
