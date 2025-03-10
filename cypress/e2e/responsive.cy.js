/// <reference types="cypress" />

describe('Responsive Testing - Header Component', () => {
  const viewports = [
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1280, height: 800, name: 'desktop' },
    { width: 1920, height: 1080, name: 'large desktop' }
  ]
  
  viewports.forEach((viewport) => {
    context(`${viewport.name} viewport`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height)
        cy.visit('/')
        // Wait for any animations to complete
        cy.wait(500)
      })
      
      it('displays logo correctly', () => {
        cy.get('header img').should('be.visible')
      })
      
      it('handles navigation appropriately', () => {
        if (viewport.name === 'mobile' || viewport.name === 'tablet') {
          // Check mobile menu behavior
          cy.get('button[aria-label="Open main menu"]').should('be.visible')
          cy.get('nav [role="menubar"]').should('not.be.visible')
          
          // Open mobile menu
          cy.get('button[aria-label="Open main menu"]').click()
          cy.get('[role="menu"]').should('be.visible')
          
          // Check dropdown in mobile menu
          cy.contains('button', 'About').click()
          cy.contains('a', 'Our Mission').should('be.visible')
          
          // Close mobile menu
          cy.get('button[aria-label="Close menu"]').click()
        } else {
          // Check desktop navigation
          cy.get('button[aria-label="Open main menu"]').should('not.exist')
          cy.get('nav [role="menubar"]').should('be.visible')
          
          // Check dropdown behavior
          cy.contains('button', 'About').trigger('mouseover')
          cy.contains('a', 'Our Mission').should('be.visible')
        }
      })
      
      it('displays CTA button appropriately', () => {
        if (viewport.name === 'mobile' || viewport.name === 'tablet') {
          // CTA should be in mobile menu
          cy.get('button[aria-label="Open main menu"]').click()
          cy.contains('a', 'Get in Touch').should('be.visible')
        } else {
          // CTA should be visible in header
          cy.contains('a', 'Get in Touch').should('be.visible')
        }
      })
      
      it('changes appearance on scroll', () => {
        // Initially transparent/default
        cy.get('header').should('not.have.class', 'bg-white/95')
        
        // Scroll down
        cy.scrollTo(0, 100)
        
        // Should have scrolled class
        cy.get('header').should('have.class', 'bg-white/95')
      })
      
      it('has accessible keyboard navigation', () => {
        if (viewport.name === 'desktop' || viewport.name === 'large desktop') {
          // Tab to About dropdown
          cy.get('a[href="/"]').focus() // Focus on first link
          cy.tab()
          
          // Press Enter to open dropdown
          cy.focused().type('{enter}')
          
          // Dropdown should be visible
          cy.contains('a', 'Our Mission').should('be.visible')
          
          // Press Escape to close dropdown
          cy.focused().type('{esc}')
          
          // Dropdown should be closed
          cy.contains('a', 'Our Mission').should('not.be.visible')
        }
      })
    })
  })
})

// Add accessibility testing
describe('Header Accessibility Testing', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })
  
  it('Has no detectable accessibility violations', () => {
    cy.checkA11y('header', {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      },
    })
  })
  
  it('Skip link becomes visible on focus', () => {
    cy.get('a[href="#main-content"]')
      .focus()
      .should('be.visible')
      .and('have.css', 'background-color', 'rgb(255, 255, 255)')
  })
}) 