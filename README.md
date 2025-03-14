# Lota Project

This is the Lota project, a Next.js application deployed on Vercel.

## Deployment

This project is automatically deployed to Vercel using GitHub Actions.

[![Deploy to Vercel](https://github.com/dislovemartin/lota-canada/actions/workflows/deploy.yml/badge.svg)](https://github.com/dislovemartin/lota-canada/actions/workflows/deploy.yml)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows a structured approach to organize the codebase efficiently. Below is an overview of the project structure:

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

## Scripts

### Cleanup Duplicates Script

This script identifies and removes duplicate `.jsx` files where `.tsx` versions exist.

```bash
# Make the script executable
chmod +x cleanup-duplicates.sh

# Run the script
./cleanup-duplicates.sh
```

The script will:
- Find all `.jsx` files in the app, components, lib, and hooks directories
- Check if a corresponding `.tsx` file exists
- Ask for confirmation before removing each duplicate file

### Fix Imports Script

This script identifies and fixes component import inconsistencies.

```bash
# Make the script executable
chmod +x fix-imports.sh

# Run the script
./fix-imports.sh
```

The script will:
- Find all TypeScript and JavaScript files in the project
- Check for UI component imports
- Replace any temporary component imports with the standard ones

### TypeScript Check Script

This script checks for TypeScript errors in the project.

```bash
# Make the script executable
chmod +x check-typescript.sh

# Run the script
./check-typescript.sh
```

The script will:
- Run the TypeScript compiler in noEmit mode
- Report any type errors found in the project

## Additional Resources

For more detailed information about the project structure and TypeScript standards, refer to the `PROJECT_STRUCTURE.md` and `README-TYPESCRIPT.md` files.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
