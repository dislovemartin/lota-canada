# Project Structure and Best Practices

This document outlines the structure of the LOTA Canada project and provides best practices for development.

## Project Structure

```
lota-canada/
├── app/                  # Next.js App Router pages
├── components/           # Reusable React components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   └── [feature]/        # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and shared code
├── public/               # Static assets
└── styles/               # Global styles
```

## TypeScript Standards

This project uses TypeScript for type safety and better developer experience. Follow these guidelines:

1. **Use TypeScript for all new files**: Create `.tsx` for React components and `.ts` for utility functions.
2. **Avoid JavaScript files**: Do not create new `.jsx` or `.js` files.
3. **Type definitions**: Define interfaces and types for component props and function parameters.
4. **Strict mode**: TypeScript is configured in strict mode. Avoid using `any` type when possible.

## Component Guidelines

1. **Component Organization**:
   - UI components go in `components/ui/`
   - Feature-specific components go in `components/[feature]/`

2. **Component Structure**:
   - Use functional components with hooks
   - Define prop types with interfaces
   - Export components as named exports when appropriate

3. **Component Example**:
   ```tsx
   import { FC } from 'react';
   
   interface ButtonProps {
     variant?: 'primary' | 'secondary';
     size?: 'sm' | 'md' | 'lg';
     children: React.ReactNode;
     onClick?: () => void;
   }
   
   export const Button: FC<ButtonProps> = ({
     variant = 'primary',
     size = 'md',
     children,
     onClick,
   }) => {
     // Component implementation
   };
   ```

## Import Standards

1. **Import Order**:
   - React and Next.js imports first
   - Third-party libraries next
   - Project imports last
   - Separate each group with a blank line

2. **Import Paths**:
   - Use absolute imports with `@/` prefix for project files
   - Example: `import { Button } from "@/components/ui/button";`

## Avoiding Duplicate Files

To prevent issues with duplicate files (`.jsx` and `.tsx`), follow these practices:

1. **Use the cleanup script**: Run `./cleanup-duplicates.sh` to identify and remove duplicate files.
2. **Standardize on TypeScript**: Always create new files with TypeScript extensions (`.tsx` or `.ts`).
3. **Fix import inconsistencies**: Run `./fix-imports.sh` to standardize component imports.

## Build Process

When building the project:

1. **Check for warnings**: Address TypeScript and ESLint warnings before deployment.
2. **Run type checking**: Use `npm run build:with-types` to ensure type safety.
3. **Test the build**: Verify the build works locally before deploying.

## Common Issues and Solutions

### Duplicate Page Errors

If you see warnings like `Duplicate page detected. app/page.jsx and app/page.tsx resolve to /`:

1. Use the cleanup script to remove duplicate files
2. Ensure you're only using TypeScript files

### Component Import Errors

If you encounter errors like `Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined`:

1. Check that the component is properly exported
2. Verify the import path is correct
3. Run the fix-imports script to standardize imports

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) 