// Import types from our declaration files
import { ValidationResult, validateEmail } from './lib/utils';

// Test utility functions
function testValidation(): void {
  const result: ValidationResult = validateEmail('test@example.com');
  console.log(result.valid);
  
  if (!result.valid && result.error) {
    console.log(result.error);
  }
}

// Export the function
export { testValidation };
