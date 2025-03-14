import { render, RenderOptions } from '@testing-library/react'
import { axe, JestAxeConfigureOptions } from 'jest-axe'
import { ReactElement } from 'react'

// Add custom render method
const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options })

// Default axe options that follow WCAG 2.1 AA standards
export const axeDefaultOptions: JestAxeConfigureOptions = {
    rules: {
        // WCAG 2.1 AA rules
        'color-contrast': { enabled: true },
        'aria-allowed-attr': { enabled: true },
        'aria-required-attr': { enabled: true },
        'aria-roles': { enabled: true },
        'aria-hidden-focus': { enabled: true },
        'button-name': { enabled: true },
        'document-title': { enabled: true },
        'duplicate-id-active': { enabled: true },
        'duplicate-id': { enabled: true },
        'form-field-multiple-labels': { enabled: true },
        'heading-order': { enabled: true },
        'image-alt': { enabled: true },
        'input-button-name': { enabled: true },
        'label': { enabled: true },
        'link-name': { enabled: true },
        'list': { enabled: true },
        'listitem': { enabled: true },
        'meta-viewport': { enabled: true }
    }
}

/**
 * A11y test that checks if a component has any accessibility violations
 * @param ui The React component to test
 * @param options Optional axe configuration options
 * @returns A promise that resolves when the test is complete
 */
export const testA11y = async (
    ui: ReactElement,
    options?: JestAxeConfigureOptions
) => {
    const container = customRender(ui).container
    const results = await axe(container, {
        ...axeDefaultOptions,
        ...options
    })

    expect(results).toHaveNoViolations()
    return results
}

/**
 * Helper function to check if a component is keyboard navigable
 * @param tabSequence An array of CSS selectors or test IDs that should be focused in order
 * @param renderFn A function that renders the component and returns the container
 */
export const checkKeyboardNavigation = (
    tabSequence: string[],
    renderFn: () => { container: HTMLElement }
) => {
    const { container } = renderFn()

    // Focus on the first element
    const firstElement = container.querySelector(tabSequence[0]) as HTMLElement
    if (firstElement) {
        firstElement.focus()
    }

    // Check that tabbing through elements follows the expected sequence
    for (let i = 0; i < tabSequence.length - 1; i++) {
        const currentElement = container.querySelector(tabSequence[i]) as HTMLElement
        const nextElement = container.querySelector(tabSequence[i + 1]) as HTMLElement

        if (currentElement && nextElement) {
            currentElement.focus()
            currentElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }))

            // Simulate browser behavior
            document.activeElement?.blur()
            nextElement.focus()

            expect(document.activeElement).toBe(nextElement)
        }
    }
}

export * from '@testing-library/react'
export { customRender as render }

