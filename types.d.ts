// Type declarations for modules without TypeScript definitions

declare module 'framer-motion' {
  export const motion: any;
  export const AnimatePresence: any;
  export const useAnimation: any;
  export const useScroll: any;
  export const useTransform: any;
}

declare module 'lucide-react' {
  export const ChevronDown: any;
  export const Menu: any;
  export const X: any;
  export const AlertCircle: any;
  export const CheckCircle2: any;
  // Add other icons as needed
}

declare module 'next/image' {
  const Image: any;
  export default Image;
}

declare module 'next/link' {
  const Link: any;
  export default Link;
}

declare module 'clsx' {
  export type ClassValue = string | number | boolean | undefined | null | Record<string, any> | ClassValue[];
  const clsx: (...args: ClassValue[]) => string;
  export default clsx;
  export { clsx };
}

declare module 'tailwind-merge' {
  export const twMerge: (...args: any[]) => string;
}

// Add JSX namespace to fix JSX element type issues
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Add declarations for @testing-library/jest-dom matchers
interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
  toHaveAttribute(attr: string, value?: string): R;
  toHaveClass(className: string): R;
  toHaveStyle(css: Record<string, any>): R;
  toBeVisible(): R;
  toBeChecked(): R;
  toBeDisabled(): R;
  toBeEnabled(): R;
  toBeEmpty(): R;
  toBeEmptyDOMElement(): R;
  toBeInvalid(): R;
  toBeRequired(): R;
  toBeValid(): R;
  toContainElement(element: HTMLElement | null): R;
  toContainHTML(htmlText: string): R;
  toHaveAccessibleDescription(description?: string | RegExp): R;
  toHaveAccessibleName(name?: string | RegExp): R;
  toHaveFocus(): R;
  toHaveFormValues(values: Record<string, any>): R;
  toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): R;
  toHaveValue(value?: string | string[] | number): R;
  toHaveDisplayValue(value: string | RegExp | Array<string | RegExp>): R;
  toBePartiallyChecked(): R;
}

declare global {
  namespace jest {
    interface Matchers<R> extends CustomMatchers<R> {}
    interface Expect extends CustomMatchers {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}

// Add declaration for jest-axe
declare module 'jest-axe' {
  import { AxeResults } from 'axe-core';

  export interface JestAxeConfigureOptions {
    globalOptions?: Object;
    rules?: Object[];
    checks?: Object[];
  }

  export interface RunOptions {
    runOnly?: {
      type: 'tag' | 'rule';
      values: string[];
    };
    rules?: Object[];
    context?: any;
  }

  export function configureAxe(options: JestAxeConfigureOptions): void;
  export function axe(html: Element | string, options?: RunOptions): Promise<AxeResults>;
  export const toHaveNoViolations: jest.CustomMatcher;
} 