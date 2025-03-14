#!/bin/bash

# Script to check for TypeScript errors in the project
# This helps identify type issues before they cause runtime errors

echo "Starting TypeScript type checking..."

# Run TypeScript compiler in noEmit mode to check for errors
npx tsc --noEmit

# Check the exit code
if [ $? -eq 0 ]; then
  echo "✅ TypeScript check passed! No type errors found."
else
  echo "❌ TypeScript check failed. Please fix the type errors above."
  echo "   You can run 'npx tsc --noEmit --pretty' for more detailed error messages."
fi

echo "TypeScript check completed!" 