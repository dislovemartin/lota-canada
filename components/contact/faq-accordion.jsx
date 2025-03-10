"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const faqs = [
    {
        question: "How do I become a member of LOTA?",
        answer: "To become a member of the Leaders of Tomorrow Association, you can apply through our Membership Portal. We offer different membership tiers based on your career stage and goals. The application process includes submitting your professional information, a brief statement of interest, and, for some tiers, a recommendation from an existing member.",
    },
    {
        question: "What programs does LOTA offer?",
        answer: "LOTA offers a variety of programs including our Executive Mentorship Program, Leadership Workshop Series, Community Engagement Initiative, Professional Development Seminars, Networking Events, and Leadership Certification. Each program is designed to address different aspects of professional development and leadership growth.",
    },
    {
        question: "How can I participate in LOTA events?",
        answer: "LOTA events are open to both members and non-members, though members often receive priority registration and discounted rates. You can view our upcoming events on the Events page and register directly through our website. We offer both in-person and virtual participation options for most events.",
    },
    {
        question: "Does LOTA offer corporate partnership opportunities?",
        answer: "Yes, we collaborate with organizations that share our commitment to leadership development. Corporate partnerships can include sponsored events, customized leadership programs for your team, speaking opportunities, and more. Please contact our Partnerships team through the form on this page for more information.",
    },
    {
        question: "How can I contribute to LOTA's knowledge resources?",
        answer: "We welcome contributions from experts in leadership, professional development, and related fields. If you're interested in submitting an article, research paper, or case study for our Knowledge Hub, please reach out to our Content team through the contact form, selecting 'Content Contribution' as your inquiry type.",
    },
    {
        question: "Is LOTA only active in Toronto?",
        answer: "While our headquarters is in Toronto, LOTA has regional chapters across Canada, including Vancouver, Montreal, Calgary, and Ottawa. Each chapter offers local programming and networking opportunities, while also connecting to our national initiatives and resources.",
    },
    {
        question: "How quickly can I expect a response to my inquiry?",
        answer: "We strive to respond to all inquiries within 24-48 business hours. Complex inquiries may require additional time for a comprehensive response. Our intelligent routing system ensures your message reaches the most appropriate team member for a prompt and helpful reply.",
    },
];
export default function FaqAccordion() {
    return (<Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (<AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
        </AccordionItem>))}
    </Accordion>);
}
