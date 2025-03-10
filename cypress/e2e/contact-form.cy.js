/// <reference types="cypress" />

describe('Contact Form Testing', () => {
  beforeEach(() => {
    cy.visit('/contact')
    cy.injectAxe()
  })
  
  it('Has no detectable accessibility violations', () => {
    cy.checkA11y('form[aria-label="Contact form"]', {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      },
    })
  })
  
  it('displays all required form fields', () => {
    cy.get('label[for="name"]').should('be.visible')
    cy.get('input#name').should('be.visible')
    
    cy.get('label[for="email"]').should('be.visible')
    cy.get('input#email').should('be.visible')
    
    cy.get('label[for="department"]').should('be.visible')
    cy.get('#department').should('be.visible')
    
    cy.get('label[for="subject"]').should('be.visible')
    cy.get('input#subject').should('be.visible')
    
    cy.get('label[for="message"]').should('be.visible')
    cy.get('textarea#message').should('be.visible')
    
    cy.get('label[for="privacyPolicy"]').should('be.visible')
    cy.get('#privacyPolicy').should('exist')
    
    cy.contains('button', 'Send Message').should('be.visible')
  })
  
  it('displays validation errors for empty form submission', () => {
    // Submit empty form
    cy.contains('button', 'Send Message').click()
    
    // Check for error messages
    cy.contains('Name is required').should('be.visible')
    cy.contains('Email is required').should('be.visible')
    cy.contains('Please select a department').should('be.visible')
    cy.contains('Subject is required').should('be.visible')
    cy.contains('Message is required').should('be.visible')
    cy.contains('You must agree to the privacy policy').should('be.visible')
  })
  
  it('clears errors when fields are corrected', () => {
    // Submit empty form
    cy.contains('button', 'Send Message').click()
    
    // Check for name error
    cy.contains('Name is required').should('be.visible')
    
    // Fill in name field
    cy.get('input#name').type('John Doe')
    
    // Error should be cleared
    cy.contains('Name is required').should('not.exist')
  })
  
  it('validates email format', () => {
    // Enter invalid email
    cy.get('input#email').type('invalid-email')
    
    // Submit form
    cy.contains('button', 'Send Message').click()
    
    // Check for email format error
    cy.contains('Please enter a valid email address').should('be.visible')
    
    // Fix email
    cy.get('input#email').clear().type('valid@example.com')
    
    // Error should be cleared
    cy.contains('Please enter a valid email address').should('not.exist')
  })
  
  it('validates message length', () => {
    // Enter short message
    cy.get('textarea#message').type('Too short')
    
    // Submit form
    cy.contains('button', 'Send Message').click()
    
    // Check for message length error
    cy.contains('Message must be at least 10 characters').should('be.visible')
    
    // Fix message
    cy.get('textarea#message').clear().type('This message is now long enough to pass validation.')
    
    // Error should be cleared
    cy.contains('Message must be at least 10 characters').should('not.exist')
  })
  
  it('submits the form with valid data', () => {
    // Intercept form submission
    cy.intercept('POST', '/api/contact', {
      statusCode: 200,
      body: { success: true }
    }).as('formSubmit')
    
    // Fill out the form
    cy.get('input#name').type('John Doe')
    cy.get('input#email').type('john@example.com')
    
    // Select department
    cy.get('#department').click()
    cy.contains('General Inquiries').click()
    
    cy.get('input#subject').type('Test Subject')
    cy.get('textarea#message').type('This is a test message that is long enough to pass validation.')
    
    // Check privacy policy
    cy.get('#privacyPolicy').check({ force: true })
    
    // Submit the form
    cy.contains('button', 'Send Message').click()
    
    // Verify loading state
    cy.contains('button', 'Sending...').should('be.visible')
    
    // Wait for submission
    cy.wait('@formSubmit')
    
    // Verify success message
    cy.contains('Thank you for your message').should('be.visible')
  })
})

// Test form submission under various network conditions
describe('Form Performance Testing', () => {
  const networkConditions = [
    { name: 'Fast 3G', downloadSpeed: 1.5 * 1024 * 1024 / 8, uploadSpeed: 750 * 1024 / 8, latency: 40 },
    { name: 'Slow 3G', downloadSpeed: 500 * 1024 / 8, uploadSpeed: 250 * 1024 / 8, latency: 300 }
  ]
  
  // Helper functions to reduce nesting
  function setupNetworkStub(condition) {
    cy.visit('/contact', {
      onBeforeLoad: (win) => {
        cy.stub(win.navigator.connection, 'effectiveType').value(condition.name)
      }
    })
    
    // Set up network throttling
    cy.intercept('POST', '/api/contact', (req) => {
      req.on('response', (res) => {
        // Delay the response based on network condition
        res.setDelay(condition.latency)
        res.send({ success: true })
      })
    }).as('formSubmit')
  }

  function setupTimeoutStub() {
    cy.intercept('POST', '/api/contact', (req) => {
      req.on('response', (res) => {
        res.setDelay(10000) // 10 second delay to force timeout
        res.send({ success: false })
      })
    }).as('timeoutSubmit')
  }

  function fillAndSubmitForm() {
    cy.get('input#name').type('Test User')
    cy.get('input#email').type('test@example.com')
    cy.get('input#subject').type('Test Subject')
    cy.get('textarea#message').type('This is a test message')
    cy.get('button[type="submit"]').click()
  }

  networkConditions.forEach((condition) => {
    context(`${condition.name} connection`, () => {
      beforeEach(() => {
        setupNetworkStub(condition)
      })
      
      it('submits the form successfully', () => {
        fillAndSubmitForm()
        
        // Verify loading state appears
        cy.contains('button', 'Sending...').should('be.visible')
        
        // Verify success message eventually appears
        cy.wait('@formSubmit')
        cy.contains('Thank you for your message', { timeout: condition.latency + 1000 }).should('be.visible')
      })
      
      it('handles timeout gracefully', () => {
        // Configure a timeout for this specific test
        setupTimeoutStub()
        
        // Fill and submit form
        fillAndSubmitForm()
        
        // Verify timeout error appears (assuming client-side timeout is set to 5s)
        cy.contains('There was an error submitting your message', { timeout: 7000 }).should('be.visible')
      })
    })
  })
})

// Test keyboard navigation and screen reader accessibility
describe('Contact Form Accessibility', () => {
  beforeEach(() => {
    cy.visit('/contact')
  })
  
  it('supports keyboard navigation through all form fields', () => {
    // Start with focus on first field
    cy.get('input#name').focus()
    
    // Tab through all fields
    cy.focused().should('have.id', 'name').tab()
    cy.focused().should('have.id', 'email').tab()
    cy.focused().should('have.id', 'department').tab()
    cy.focused().should('have.id', 'subject').tab()
    cy.focused().should('have.id', 'message').tab()
    cy.focused().should('have.id', 'privacyPolicy').tab()
    cy.focused().should('contain.text', 'Send Message')
  })
  
  it('has proper focus management for validation errors', () => {
    // Submit empty form
    cy.contains('button', 'Send Message').click()
    
    // Focus should move to first field with error
    cy.focused().should('have.id', 'name')
  })
  
  it('has accessible privacy notice', () => {
    // Privacy notice should be visible
    cy.contains('h3', 'Privacy Notice').should('be.visible')
    
    // Privacy policy link should be keyboard accessible
    cy.contains('a', 'Privacy Policy').should('have.attr', 'href', '/privacy-policy')
    cy.contains('a', 'Privacy Policy').focus()
    cy.focused().should('have.attr', 'href', '/privacy-policy')
  })
  
  it('has proper ARIA attributes', () => {
    // Required fields should have aria-required
    cy.get('input#name').should('have.attr', 'aria-required', 'true')
    cy.get('input#email').should('have.attr', 'aria-required', 'true')
    cy.get('#department').should('have.attr', 'aria-required', 'true')
    cy.get('input#subject').should('have.attr', 'aria-required', 'true')
    cy.get('textarea#message').should('have.attr', 'aria-required', 'true')
    cy.get('#privacyPolicy').should('have.attr', 'aria-required', 'true')
    
    // Submit button should have proper role
    cy.contains('button', 'Send Message').should('have.attr', 'type', 'submit')
    
    // Form should have accessible name
    cy.get('form').should('have.attr', 'aria-label', 'Contact form')
    
    // Status region for screen readers should exist
    cy.get('#form-status').should('exist')
    cy.get('#form-status').should('have.attr', 'aria-live', 'polite')
  })
}) 