var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import Header from '@/components/header';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
    motion: {
        div: (_a) => {
            var { children } = _a, props = __rest(_a, ["children"]);
            return <div {...props}>{children}</div>;
        },
        nav: (_a) => {
            var { children } = _a, props = __rest(_a, ["children"]);
            return <nav {...props}>{children}</nav>;
        },
    },
    AnimatePresence: ({ children }) => <>{children}</>,
}));
describe('Header Component Performance', () => {
    test('renders within acceptable time', () => {
        const startTime = performance.now();
        render(<Header />);
        const endTime = performance.now();
        // Rendering should take less than 100ms
        expect(endTime - startTime).toBeLessThan(100);
    });
    test('submenu toggle performance', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userEvent.setup();
        render(<Header />);
        // Find the About dropdown
        const aboutButton = screen.getByText('About');
        // Measure toggle performance
        const startTime = performance.now();
        yield user.click(aboutButton);
        const endTime = performance.now();
        // Toggle should take less than 50ms
        expect(endTime - startTime).toBeLessThan(50);
        // Verify submenu is open
        expect(screen.getByText('Our Mission')).toBeInTheDocument();
    }));
    test('mobile menu toggle performance', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock window.innerWidth to simulate mobile viewport
        global.innerWidth = 500;
        global.dispatchEvent(new Event('resize'));
        const user = userEvent.setup();
        render(<Header />);
        // Find the mobile menu button
        const menuButton = screen.getByLabelText('Open main menu');
        // Measure toggle performance
        const startTime = performance.now();
        yield user.click(menuButton);
        const endTime = performance.now();
        // Toggle should take less than 50ms
        expect(endTime - startTime).toBeLessThan(50);
        // Verify mobile menu is open
        expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    }));
    test('scroll performance', () => {
        render(<Header />);
        // Measure scroll handler performance
        const startTime = performance.now();
        global.scrollY = 20;
        global.dispatchEvent(new Event('scroll'));
        const endTime = performance.now();
        // Scroll handler should execute in less than 10ms
        expect(endTime - startTime).toBeLessThan(10);
        // Verify header appearance changed
        const header = screen.getByRole('banner');
        expect(header).toHaveClass('bg-white/95');
    });
    test('keyboard navigation performance', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userEvent.setup();
        render(<Header />);
        // Find the About dropdown
        const aboutButton = screen.getByText('About');
        // Focus the button
        aboutButton.focus();
        // Measure keyboard navigation performance
        const startTime = performance.now();
        yield user.keyboard('{Enter}');
        const endTime = performance.now();
        // Keyboard navigation should take less than 50ms
        expect(endTime - startTime).toBeLessThan(50);
        // Verify submenu is open
        expect(screen.getByText('Our Mission')).toBeInTheDocument();
    }));
});
