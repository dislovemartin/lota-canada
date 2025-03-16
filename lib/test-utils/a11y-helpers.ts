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
    rules: [
        // WCAG 2.1 AA rules
        { id: 'color-contrast', enabled: true },
        { id: 'aria-allowed-attr', enabled: true },
        { id: 'aria-required-attr', enabled: true },
        { id: 'aria-roles', enabled: true },
        { id: 'aria-hidden-focus', enabled: true },
        { id: 'button-name', enabled: true },
        { id: 'document-title', enabled: true },
        { id: 'duplicate-id-active', enabled: true },
        { id: 'duplicate-id', enabled: true },
        { id: 'form-field-multiple-labels', enabled: true },
        { id: 'heading-order', enabled: true },
        { id: 'image-alt', enabled: true },
        { id: 'input-button-name', enabled: true },
        { id: 'label', enabled: true },
        { id: 'link-name', enabled: true },
        { id: 'list', enabled: true },
        { id: 'listitem', enabled: true },
        { id: 'meta-viewport', enabled: true }
    ]
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

export * from '@testing-library/react'
export { customRender as render }

