"use client";

import { Breadcrumb } from "@/components/breadcrumb";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionDivider } from "@/components/ui/section-divider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail, MapPin, MessageSquare, Phone, Send, Users } from "lucide-react";
import { useRef, useState } from "react";

function ContactOption({ icon: Icon, title, description, info, href, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
        className
      )}
    >
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900/20 dark:to-gray-800/20 rounded-full w-14 h-14 flex items-center justify-center mb-4 shadow-inner">
          <Icon className="w-7 h-7 text-black dark:text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        {info && (
          <a
            href={href}
            className="font-medium text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200"
          >
            {info}
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    inquiryType: "",
    subject: "",
    message: "",
    interests: [],
  });
  const [formStatus, setFormStatus] = useState({ submitted: false, error: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormState((prev) => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here would be the actual form submission logic
    // For demo purposes, we'll simulate a successful submission
    setFormStatus({ submitted: true, error: false });
    
    // Reset form after successful submission
    setTimeout(() => {
      setFormState({
        name: "",
        email: "",
        inquiryType: "",
        subject: "",
        message: "",
        interests: [],
      });
      setFormStatus({ submitted: false, error: false });
    }, 5000);
  };

  return (
    <PageTransition variant="fade">
      <div id="main-content">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Contact", href: "/contact", isCurrent: true },
          ]}
          className="container-wide pt-4 pb-2"
        />

        {/* Hero Banner */}
        <div className="relative py-16 md:py-24 bg-gradient-to-r from-black to-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-center bg-no-repeat bg-cover opacity-20 mix-blend-overlay" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
          <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
          
          <div className="container-wide relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="p-4 bg-gradient-to-br from-gray-400/20 to-gray-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg backdrop-blur-sm border border-white/20">
                <MessageSquare className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Get In Touch</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                We'd love to hear from you. Reach out for inquiries, collaborations, 
                or to join our growing community of leaders.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-white mx-auto rounded-full mt-4 mb-2 opacity-70"></div>
            </motion.div>
          </div>
        </div>

        {/* Contact Options */}
        <div className="subtle-bg py-16">
          <div className="container-wide mx-auto">
            <h2 className="text-2xl font-bold text-center mb-10 relative">
              <span className="relative z-10 px-4 bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent">Contact Information</span>
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-gray-400 to-black rounded-full"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <ContactOption
                icon={Mail}
                title="Email Us"
                description="Send us an email for general inquiries or information."
                info="info@lotacanada.com"
                href="mailto:info@lotacanada.com"
              />
              
              <ContactOption
                icon={Phone}
                title="Call Us"
                description="Speak directly with our team during business hours."
                info="+1 (416) 555-1234"
                href="tel:+14165551234"
              />
              
              <ContactOption
                icon={MapPin}
                title="Visit Us"
                description="Our office is located in downtown Toronto."
                info="123 Leadership Ave, Toronto, ON"
                href="https://maps.google.com"
              />
            </div>

            <div className="relative py-4">
              <SectionDivider variant="wave" color="accent" height="sm" animated />
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center border border-gray-200 dark:border-gray-700">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">LOTA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white dark:bg-gray-900 py-16">
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Form */}
              <div>
                <AnimatedHeading
                  title="Send Us a Message"
                  subtitle="Complete the form below and we'll get back to you as soon as possible."
                  underline
                  animated
                  className="mb-8"
                />

                {formStatus.submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center shadow-md"
                  >
                    <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800/30 dark:to-green-700/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 text-green-700 dark:text-green-300">Message Sent!</h3>
                    <p className="text-green-600 dark:text-green-400 mb-5">
                      Thank you for reaching out. We'll get back to you shortly.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full mt-2"></div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-md bg-white dark:bg-gray-950">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <h2 className="col-span-full text-xl font-semibold text-gray-800 dark:text-white mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">Contact Information</h2>
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-8">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Inquiry Details</h2>
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select 
                        value={formState.inquiryType} 
                        onValueChange={handleSelectChange}
                        required
                      >
                        <SelectTrigger id="inquiryType">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="membership">Membership</SelectItem>
                          <SelectItem value="event">Event Information</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="Subject of your message"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Your message here..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
                      <Label className="flex items-center font-medium text-base mb-2 text-gray-800 dark:text-gray-200">
                        <span className="inline-block w-1 h-5 bg-blue-600 mr-2 rounded-sm"></span>
                        Interested In (Optional)
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="interest-mentorship"
                            className="rounded text-black focus:ring-black dark:bg-gray-700 border-gray-300 focus:ring-gray-800"
                          />
                          <label htmlFor="interest-mentorship">Mentorship</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="interest-events"
                            className="rounded text-black focus:ring-black dark:bg-gray-700 border-gray-300 focus:ring-gray-800"
                          />
                          <label htmlFor="interest-events">Events</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="interest-networking"
                            className="rounded text-black focus:ring-black dark:bg-gray-700 border-gray-300 focus:ring-gray-800"
                          />
                          <label htmlFor="interest-networking">Networking</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="interest-newsletter"
                            className="rounded text-black focus:ring-black dark:bg-gray-700 border-gray-300 focus:ring-gray-800"
                          />
                          <label htmlFor="interest-newsletter">Newsletter</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg active:shadow-sm px-6 py-2.5 rounded-md">
                        Send Message
                      </Button>
                    </div>
                  </form>
                )}
              </div>
              
              {/* Map and Hours */}
              <div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden h-96 mb-8 shadow-md border border-gray-200 dark:border-gray-700">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.0268522031403!2d-79.38459492346283!3d43.6502617791215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d7b66a4a51%3A0xd9b3d48c1de0f7d2!2sToronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sus!4v1700606911000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="LOTA Canada Office Location"
                  ></iframe>
                </div>
                
                <AnimatedHeading
                  title="Office Hours"
                  animated
                  size="sm"
                  className="mb-6"
                  underline
                />
                
                <div className="space-y-4 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span>Saturday</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
                
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Join Our Community
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Want to be part of something special? Join LOTA's network of professionals and leaders.
                  </p>
                  <AnimatedButton href="/join" variant="primary">
                    Become a Member
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="container-wide mx-auto">
            <AnimatedHeading
              title="Frequently Asked Questions"
              subtitle="Answers to common questions about contacting and joining LOTA"
              align="center"
              underline
              animated
              className="mb-12"
            />
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How can I become a member of LOTA?",
                  answer: "You can become a member by filling out the membership application form on our Join page. Membership includes access to our events, networking opportunities, mentorship programs, and other exclusive resources."
                },
                {
                  question: "Are there membership fees to join LOTA?",
                  answer: "Yes, LOTA has an annual membership fee that helps support our programs and initiatives. We offer different membership tiers for professionals at various career stages. Details about membership fees can be found on our Join page."
                },
                {
                  question: "How quickly will I receive a response to my inquiry?",
                  answer: "We strive to respond to all inquiries within 1-2 business days. During busy periods or special events, response times may be slightly longer."
                },
                {
                  question: "Can I volunteer with LOTA?",
                  answer: "Absolutely! We welcome volunteers who want to contribute to our mission. Please contact us through this form and mention your interest in volunteering in the message field."
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6"
                >
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
