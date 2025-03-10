import Header from '@/components/header'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('Header Component Performance', () => {
  test('renders within acceptable time', () => {
    const startTime = performance.now()
    render(<Header />)
    const endTime = performance.now()
    
    // Rendering should take less than 100ms
    expect(endTime - startTime).toBeLessThan(100)
  })
  
  test('submenu toggle performance', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    // Find the About dropdown
    const aboutButton = screen.getByText('About')
    
    // Measure toggle performance
    const startTime = performance.now()
    await user.click(aboutButton)
    const endTime = performance.now()
    
    // Toggle should take less than 50ms
    expect(endTime - startTime).toBeLessThan(50)
    
    // Verify submenu is open
    expect(screen.getByText('Our Mission')).toBeInTheDocument()
  })
  
  test('mobile menu toggle performance', async () => {
    // Mock window.innerWidth to simulate mobile viewport
    global.innerWidth = 500
    global.dispatchEvent(new Event('resize'))
    
    const user = userEvent.setup()
    render(<Header />)
    
    // Find the mobile menu button
    const menuButton = screen.getByLabelText('Open main menu')
    
    // Measure toggle performance
    const startTime = performance.now()
    await user.click(menuButton)
    const endTime = performance.now()
    
    // Toggle should take less than 50ms
    expect(endTime - startTime).toBeLessThan(50)
    
    // Verify mobile menu is open
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument()
  })
  
  test('scroll performance', () => {
    render(<Header />)
    
    // Measure scroll handler performance
    const startTime = performance.now()
    global.scrollY = 20
    global.dispatchEvent(new Event('scroll'))
    const endTime = performance.now()
    
    // Scroll handler should execute in less than 10ms
    expect(endTime - startTime).toBeLessThan(10)
    
    // Verify header appearance changed
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-white/95')
  })
  
  test('keyboard navigation performance', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    // Find the About dropdown
    const aboutButton = screen.getByText('About')
    
    // Focus the button
    aboutButton.focus()
    
    // Measure keyboard navigation performance
    const startTime = performance.now()
    await user.keyboard('{Enter}')
    const endTime = performance.now()
    
    // Keyboard navigation should take less than 50ms
    expect(endTime - startTime).toBeLessThan(50)
    
    // Verify submenu is open
    expect(screen.getByText('Our Mission')).toBeInTheDocument()
  })
}) 