# TypeScript Migration Guide

This guide provides instructions for migrating the LOTA Canada project to TypeScript and resolving duplicate file issues.

## Background

The project currently has duplicate files with both `.jsx` and `.tsx` extensions, which can cause conflicts during the build process. This guide will help you standardize on TypeScript and resolve these issues.

## Scripts

We've created several scripts to help with the migration process:

### 1. Cleanup Duplicates Script

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

### 2. Fix Imports Script

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

### 3. TypeScript Check Script

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

## Migration Steps

Follow these steps to migrate the project to TypeScript:

1. **Backup your project**:
   ```bash
   cp -r lota-canada lota-canada-backup
   ```

2. **Run the cleanup script**:
   ```bash
   ./cleanup-duplicates.sh
   ```

3. **Fix import inconsistencies**:
   ```bash
   ./fix-imports.sh
   ```

4. **Check for TypeScript errors**:
   ```bash
   ./check-typescript.sh
   ```

5. **Build the project**:
   ```bash
   npm run build
   ```

6. **Fix any remaining issues**:
   - Address TypeScript errors reported by the check-typescript script
   - Fix any build errors that occur

## Best Practices

1. **Create new files as TypeScript**:
   - Use `.tsx` for React components
   - Use `.ts` for utility functions

2. **Standardize imports**:
   - Use absolute imports with `@/` prefix
   - Example: `import { Button } from "@/components/ui/button";`

3. **Type your components**:
   - Define interfaces for component props
   - Use React.FC or function components with explicit return types

4. **Run type checking regularly**:
   - Use `npm run build:with-types` or `./check-typescript.sh`
   - Fix type errors as they arise

## Documentation

For more detailed information about the project structure and TypeScript standards, refer to the `PROJECT_STRUCTURE.md` file.

## Troubleshooting

If you encounter issues during the migration:

1. **Duplicate page errors**:
   - Run the cleanup script again
   - Manually remove duplicate files if necessary

2. **Component import errors**:
   - Check that the component is properly exported
   - Verify the import path is correct
   - Run the fix-imports script

3. **Type errors**:
   - Use the check-typescript script to identify issues
   - Fix type errors one by one, starting with the most critical ones 