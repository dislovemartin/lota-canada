// Import types from our declaration files
import { validateEmail } from './lib/utils';
// Test utility functions
function testValidation() {
    const result = validateEmail('test@example.com');
    console.log(result.valid);
    if (!result.valid && result.error) {
        console.log(result.error);
    }
}
// Export the function
export { testValidation };
