"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
export function ContactForm() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        department: "",
        privacyPolicy: false,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
        // Clear error when field is edited
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = Object.assign({}, prev);
                delete newErrors[name];
                return newErrors;
            });
        }
    };
    const handleDepartmentChange = (value) => {
        setFormState((prev) => (Object.assign(Object.assign({}, prev), { department: value })));
        // Clear error when department is selected
        if (errors.department) {
            setErrors((prev) => {
                const newErrors = Object.assign({}, prev);
                delete newErrors.department;
                return newErrors;
            });
        }
    };
    const handlePrivacyPolicyChange = (checked) => {
        setFormState((prev) => (Object.assign(Object.assign({}, prev), { privacyPolicy: checked })));
        // Clear error when privacy policy is checked
        if (errors.privacyPolicy && checked) {
            setErrors((prev) => {
                const newErrors = Object.assign({}, prev);
                delete newErrors.privacyPolicy;
                return newErrors;
            });
        }
    };
    const validateForm = () => {
        const newErrors = {};
        if (!formState.name.trim()) {
            newErrors.name = "Name is required";
        }
        if (!formState.email.trim()) {
            newErrors.email = "Email is required";
        }
        else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!formState.department) {
            newErrors.department = "Please select a department";
        }
        if (!formState.subject.trim()) {
            newErrors.subject = "Subject is required";
        }
        if (!formState.message.trim()) {
            newErrors.message = "Message is required";
        }
        else if (formState.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }
        if (!formState.privacyPolicy) {
            newErrors.privacyPolicy = "You must agree to the privacy policy";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!validateForm()) {
            // Set focus to the first field with an error
            const firstErrorField = Object.keys(errors)[0];
            const element = document.getElementById(firstErrorField);
            if (element) {
                element.focus();
            }
            return;
        }
        setIsSubmitting(true);
        setSubmitResult(null);
        // Announce to screen readers that form is submitting
        const statusRegion = document.getElementById('form-status');
        if (statusRegion) {
            statusRegion.textContent = 'Submitting your message. Please wait...';
        }
        // Simulate API call
        try {
            yield new Promise((resolve) => setTimeout(resolve, 1500));
            // Simulate successful submission
            setSubmitResult({
                success: true,
                message: "Thank you for your message. We will get back to you shortly.",
            });
            // Reset form
            setFormState({
                name: "",
                email: "",
                subject: "",
                message: "",
                department: "",
                privacyPolicy: false,
            });
            // Announce success to screen readers
            if (statusRegion) {
                statusRegion.textContent = 'Your message has been sent successfully.';
            }
        }
        catch (error) {
            setSubmitResult({
                success: false,
                message: "There was an error submitting your message. Please try again.",
            });
            // Announce error to screen readers
            if (statusRegion) {
                statusRegion.textContent = 'There was an error submitting your message. Please try again.';
            }
        }
        finally {
            setIsSubmitting(false);
        }
    });
    return (<div>
      {/* Status region for screen readers */}
      <output id="form-status" className="sr-only" aria-live="polite" aria-atomic="true"></output>
      
      <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Your Name <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <Input id="name" name="name" value={formState.name} onChange={handleChange} aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} placeholder="John Doe" className={errors.name ? "border-red-500" : ""} required/>
            {errors.name && (<p id="name-error" className="text-red-500 text-sm mt-1 flex items-center" role="alert">
                <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true"/>
                {errors.name}
              </p>)}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <Input id="email" name="email" type="email" value={formState.email} onChange={handleChange} aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} placeholder="john@example.com" className={errors.email ? "border-red-500" : ""} required/>
            {errors.email && (<p id="email-error" className="text-red-500 text-sm mt-1 flex items-center" role="alert">
                <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true"/>
                {errors.email}
              </p>)}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="department" className="block text-sm font-medium">
            Department <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <Select value={formState.department} onValueChange={handleDepartmentChange} required>
            <SelectTrigger id="department" aria-required="true" aria-invalid={!!errors.department} aria-describedby={errors.department ? "department-error" : undefined} className={errors.department ? "border-red-500" : ""}>
              <SelectValue placeholder="Select a department"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiries</SelectItem>
              <SelectItem value="membership">Membership</SelectItem>
              <SelectItem value="programs">Programs</SelectItem>
              <SelectItem value="events">Events</SelectItem>
              <SelectItem value="partnerships">Partnerships</SelectItem>
            </SelectContent>
          </Select>
          {errors.department && (<p id="department-error" className="text-red-500 text-sm mt-1 flex items-center" role="alert">
              <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true"/>
              {errors.department}
            </p>)}
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-medium">
            Subject <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <Input id="subject" name="subject" value={formState.subject} onChange={handleChange} aria-required="true" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined} placeholder="Your message subject" className={errors.subject ? "border-red-500" : ""} required/>
          {errors.subject && (<p id="subject-error" className="text-red-500 text-sm mt-1 flex items-center" role="alert">
              <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true"/>
              {errors.subject}
            </p>)}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium">
            Message <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <Textarea id="message" name="message" value={formState.message} onChange={handleChange} rows={5} aria-required="true" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} placeholder="How can we help you?" className={errors.message ? "border-red-500" : ""} required/>
          {errors.message && (<p id="message-error" className="text-red-500 text-sm mt-1 flex items-center" role="alert">
              <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true"/>
              {errors.message}
            </p>)}
        </div>

        {/* Privacy Notice Section */}
        <div className="text-sm text-gray-600 dark:text-gray-300 p-4 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-base mb-2">Privacy Notice</h3>
          <p className="mb-2">
            We collect your contact information to respond to your inquiry and provide the information you requested. Your data will be processed in accordance with our privacy policy.
          </p>
          <p>
            We will not share your information with third parties without your consent. For more information, please see our{" "}
            <Link href="/privacy-policy" className="text-primary underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm">
              Privacy Policy
            </Link>.
          </p>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <Checkbox id="privacyPolicy" checked={formState.privacyPolicy} onCheckedChange={handlePrivacyPolicyChange} aria-required="true" aria-invalid={!!errors.privacyPolicy} aria-describedby={errors.privacyPolicy ? "privacy-error" : undefined} required/>
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="privacyPolicy" className={`font-medium ${errors.privacyPolicy ? "text-red-500" : ""}`}>
              I consent to LOTA Canada collecting and processing my data as described in the privacy notice.
            </label>
            {errors.privacyPolicy && (<p id="privacy-error" className="text-red-500 text-sm mt-1 flex items-center" role="alert">
                <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true"/>
                {errors.privacyPolicy}
              </p>)}
          </div>
        </div>

        <div>
          <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>

        {submitResult && (<div className={`p-4 rounded-md ${submitResult.success ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`} role="alert" aria-live="assertive">
            <div className="flex">
              <div className="flex-shrink-0">
                {submitResult.success ? (<CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" aria-hidden="true"/>) : (<AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" aria-hidden="true"/>)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{submitResult.message}</p>
              </div>
            </div>
          </div>)}
      </form>
    </div>);
}
