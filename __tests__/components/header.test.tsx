import Header from '@/components/header'
import { fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'

describe('Header Component', () => {
  test('should not have any accessibility violations', async () => {
    const { container } = render(<Header />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  test('renders logo and navigation links', () => {
    render(<Header />)
    
    // Check for logo
    expect(screen.getByAltText('LOTA')).toBeInTheDocument()
    
    // Check for navigation links
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Programs')).toBeInTheDocument()
    expect(screen.getByText('Events')).toBeInTheDocument()
    expect(screen.getByText('Resources')).toBeInTheDocument()
    expect(screen.getByText('Sponsors')).toBeInTheDocument()
  })

  test('renders CTA button', () => {
    render(<Header />)
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
  })

  test('renders mobile menu button on small screens', () => {
    // Mock window.innerWidth to simulate mobile viewport
    global.innerWidth = 500
    global.dispatchEvent(new Event('resize'))
    
    render(<Header />)
    
    // Check for mobile menu button
    expect(screen.getByLabelText('Open main menu')).toBeInTheDocument()
  })

  test('opens and closes mobile menu', () => {
    // Mock window.innerWidth to simulate mobile viewport
    global.innerWidth = 500
    global.dispatchEvent(new Event('resize'))
    
    render(<Header />)
    
    // Open mobile menu
    fireEvent.click(screen.getByLabelText('Open main menu'))
    
    // Check that mobile menu is open
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument()
    
    // Close mobile menu
    fireEvent.click(screen.getByLabelText('Close menu'))
    
    // Check that mobile menu is closed
    expect(screen.getByLabelText('Open main menu')).toBeInTheDocument()
  })

  test('opens and closes dropdown menus', () => {
    render(<Header />)
    
    // Open About dropdown
    fireEvent.click(screen.getByText('About'))
    
    // Check that dropdown is open
    expect(screen.getByText('Our Mission')).toBeInTheDocument()
    expect(screen.getByText('Board of Directors')).toBeInTheDocument()
    
    // Close dropdown by clicking elsewhere
    fireEvent.click(document.body)
    
    // Check that dropdown is closed
    expect(screen.queryByText('Our Mission')).not.toBeInTheDocument()
  })

  test('handles keyboard navigation', () => {
    render(<Header />)
    
    // Focus on About dropdown
    const aboutButton = screen.getByText('About')
    aboutButton.focus()
    
    // Open dropdown with Enter key
    fireEvent.keyDown(aboutButton, { key: 'Enter' })
    
    // Check that dropdown is open
    expect(screen.getByText('Our Mission')).toBeInTheDocument()
    
    // Close dropdown with Escape key
    fireEvent.keyDown(aboutButton, { key: 'Escape' })
    
    // Check that dropdown is closed
    expect(screen.queryByText('Our Mission')).not.toBeInTheDocument()
  })

  test('renders skip to content link for accessibility', () => {
    render(<Header />)
    
    // Check for skip link (it's visually hidden but should be in the DOM)
    const skipLink = screen.getByText('Skip to main content')
    expect(skipLink).toBeInTheDocument()
    expect(skipLink.getAttribute('href')).toBe('#main-content')
  })

  test('changes appearance on scroll', () => {
    render(<Header />)
    
    // Initially header should not have scrolled class
    const header = screen.getByRole('banner')
    expect(header).not.toHaveClass('bg-white/95')
    
    // Simulate scrolling
    global.scrollY = 20
    fireEvent.scroll(window)
    
    // Header should now have scrolled class
    expect(header).toHaveClass('bg-white/95')
  })
}) 