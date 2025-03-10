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
import Footer from '@/components/footer';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
    motion: {
        div: (_a) => {
            var { children } = _a, props = __rest(_a, ["children"]);
            return <div {...props}>{children}</div>;
        },
        footer: (_a) => {
            var { children } = _a, props = __rest(_a, ["children"]);
            return <footer {...props}>{children}</footer>;
        },
        a: (_a) => {
            var { children } = _a, props = __rest(_a, ["children"]);
            return <a {...props}>{children}</a>;
        },
    },
    useInView: () => true,
}));
describe('Footer Component', () => {
    test('should not have any accessibility violations', () => __awaiter(void 0, void 0, void 0, function* () {
        const { container } = render(<Footer />);
        const results = yield axe(container);
        expect(results).toHaveNoViolations();
    }));
    test('renders logo and copyright information', () => {
        render(<Footer />);
        // Check for logo
        expect(screen.getByAltText('LOTA Canada')).toBeInTheDocument();
        // Check for copyright text
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(new RegExp(`© ${currentYear} LOTA Canada`))).toBeInTheDocument();
    });
    test('renders main navigation links', () => {
        render(<Footer />);
        // Check for main navigation links
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Mission')).toBeInTheDocument();
        expect(screen.getByText('Events')).toBeInTheDocument();
        expect(screen.getByText('Knowledge')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });
    test('renders program links', () => {
        render(<Footer />);
        // Check for program section title
        expect(screen.getByText('Programs')).toBeInTheDocument();
        // Check for program links
        expect(screen.getByText('Mentorship Program')).toBeInTheDocument();
        expect(screen.getByText('Leadership Workshop Series')).toBeInTheDocument();
        expect(screen.getByText('Community Engagement')).toBeInTheDocument();
        expect(screen.getByText('Executive Mentorship')).toBeInTheDocument();
    });
    test('renders knowledge links', () => {
        render(<Footer />);
        // Check for knowledge section title
        expect(screen.getByText('Knowledge Hub')).toBeInTheDocument();
        // Check for knowledge links
        expect(screen.getByText('Articles')).toBeInTheDocument();
        expect(screen.getByText('Research')).toBeInTheDocument();
        expect(screen.getByText('Resources')).toBeInTheDocument();
        expect(screen.getByText('Case Studies')).toBeInTheDocument();
    });
    test('renders legal links', () => {
        render(<Footer />);
        // Check for legal links
        expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
        expect(screen.getByText('Terms of Service')).toBeInTheDocument();
        expect(screen.getByText('Cookie Policy')).toBeInTheDocument();
    });
    test('renders social media links', () => {
        render(<Footer />);
        // Check for social media links
        expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
        expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
        expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
        expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    });
    test('renders contact information', () => {
        render(<Footer />);
        // Check for contact information
        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByText(/info@lotacanada.org/)).toBeInTheDocument();
        expect(screen.getByText(/123 Main Street, Toronto, ON/)).toBeInTheDocument();
    });
    test('newsletter subscription form works correctly', () => {
        render(<Footer />);
        // Check for newsletter form
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const subscribeButton = screen.getByText('Subscribe');
        // Fill out the form
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        // Submit the form
        fireEvent.click(subscribeButton);
        // Check for success message (this would need to be updated based on actual implementation)
        expect(screen.getByText(/Thank you for subscribing/i)).toBeInTheDocument();
    });
    test('links have correct href attributes', () => {
        render(<Footer />);
        // Check href attributes for main navigation links
        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('Mission').closest('a')).toHaveAttribute('href', '/mission');
        expect(screen.getByText('Events').closest('a')).toHaveAttribute('href', '/events');
        // Check href attributes for program links
        expect(screen.getByText('Mentorship Program').closest('a')).toHaveAttribute('href', '/programs/mentorship');
        // Check href attributes for legal links
        expect(screen.getByText('Privacy Policy').closest('a')).toHaveAttribute('href', '/privacy');
    });
});
