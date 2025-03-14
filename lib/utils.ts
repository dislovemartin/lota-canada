import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Form validation utilities
export type ValidationResult = {
  valid: boolean
  error?: string
}

/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns ValidationResult with valid status and optional error message
 */
export function validateEmail(email: string): ValidationResult {
  if (!email.trim()) {
    return { valid: false, error: "Email is required" }
  }

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Please enter a valid email address" }
  }

  return { valid: true }
}

/**
 * Validates a required field
 * @param value - The field value to validate
 * @param fieldName - The name of the field for the error message
 * @returns ValidationResult with valid status and optional error message
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value.trim()) {
    return { valid: false, error: `${fieldName} is required` }
  }

  return { valid: true }
}

/**
 * Validates a field with minimum length
 * @param value - The field value to validate
 * @param minLength - The minimum length required
 * @param fieldName - The name of the field for the error message
 * @returns ValidationResult with valid status and optional error message
 */
export function validateMinLength(value: string, minLength: number, fieldName: string): ValidationResult {
  if (!value.trim()) {
    return { valid: false, error: `${fieldName} is required` }
  }

  if (value.trim().length < minLength) {
    return { valid: false, error: `${fieldName} must be at least ${minLength} characters` }
  }

  return { valid: true }
}

/**
 * Validates a phone number
 * @param phone - The phone number to validate
 * @returns ValidationResult with valid status and optional error message
 */
export function validatePhone(phone: string): ValidationResult {
  if (!phone.trim()) {
    return { valid: true } // Phone might be optional
  }

  // Basic phone validation - allows various formats
  const phoneRegex = /^[+]?[(]?\d{3}[)]?[-\s.]?\d{3}[-\s.]?\d{4,6}$/
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return { valid: false, error: "Please enter a valid phone number" }
  }

  return { valid: true }
}

/**
 * Validates a form object with multiple fields
 * @param formData - Object containing form field values
 * @param validations - Object mapping field names to validation functions
 * @returns Object with field names mapped to error messages, empty if all valid
 */
export function validateForm(
  formData: Record<string, unknown>,
  validations: Record<string, (value: unknown) => ValidationResult>
): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const [field, validateFn] of Object.entries(validations)) {
    const result = validateFn(formData[field])
    if (!result.valid && result.error) {
      errors[field] = result.error
    }
  }

  return errors
}

// Date formatting utility
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

