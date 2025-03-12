import 'jest-axe';

declare module 'jest-axe' {
    interface AxeRules {
        'color-contrast'?: {
            enabled: boolean;
        };
    }
}

export { };
