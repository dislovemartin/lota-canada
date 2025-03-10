// Type declarations for Cypress

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    // Add custom Cypress commands here
    getBySel(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>
    getBySelLike(dataTestPrefixAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>
    injectAxe(): Chainable<Element>
    checkA11y(
      context?: string,
      options?: any,
      violationCallback?: (violations: any) => void,
      skipFailures?: boolean
    ): Chainable<Element>
    // Add other custom commands as needed
  }
} 