"use client"

import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

// Define types for form state and errors
interface FormState {
  name: string
  email: string
  subject: string
  message: string
  department: string
  privacyPolicy: boolean
}

interface FormErrors {
  [key: string]: string
}

interface SubmitResult {
  success: boolean
  message: string
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    department: "",
    privacyPolicy: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev: FormState) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev: FormErrors) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleDepartmentChange = (value: string) => {
    setFormState((prev: FormState) => ({ ...prev, department: value }))

    // Clear error when department is selected
    if (errors.department) {
      setErrors((prev: FormErrors) => {
        const newErrors = { ...prev }
        delete newErrors.department
        return newErrors
      })
    }
  }

  const handlePrivacyPolicyChange = (checked: boolean) => {
    setFormState((prev: FormState) => ({ ...prev, privacyPolicy: checked }))

    // Clear error when privacy policy is checked
    if (errors.privacyPolicy && checked) {
      setErrors((prev: FormErrors) => {
        const newErrors = { ...prev }
        delete newErrors.privacyPolicy
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formState.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formState.department) {
      newErrors.department = "Please select a department"
    }

    if (!formState.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formState.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    if (!formState.privacyPolicy) {
      newErrors.privacyPolicy = "You must agree to the privacy policy"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      // Set focus to the first field with an error
      const firstErrorField = Object.keys(errors)[0]
      const element = document.getElementById(firstErrorField)
      if (element) {
        element.focus()
      }
      return
    }

    setIsSubmitting(true)
    setSubmitResult(null)

    // Announce to screen readers that form is submitting
    const statusRegion = document.getElementById('form-status')
    if (statusRegion) {
      statusRegion.textContent = 'Submitting your message. Please wait...'
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful submission
      setSubmitResult({
        success: true,
        message: "Thank you for your message. We will get back to you shortly.",
      })

      // Reset form
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
        department: "",
        privacyPolicy: false,
      })

      // Announce success to screen readers
      if (statusRegion) {
        statusRegion.textContent = 'Your message has been sent successfully.'
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "There was an error submitting your message. Please try again.",
      })

      // Announce error to screen readers
      if (statusRegion) {
        statusRegion.textContent = 'There was an error submitting your message. Please try again.'
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Status region for screen readers */}
      <output id="form-status" className="sr-only" aria-live="polite" aria-atomic="true"></output>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-md bg-white dark:bg-gray-950"
        aria-label="Contact form"
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <h2 className="col-span-full text-xl font-semibold text-gray-800 dark:text-white mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">Contact Information</h2>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Your Name <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <Input
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              placeholder="John Doe"
              className={`transition-all duration-200 ${errors.name ? "border-red-500 shadow-sm shadow-red-200" : "border-gray-300 hover:border-gray-400 focus:border-blue-500 dark:border-gray-600 dark:hover:border-gray-500"}`}
              required
            />
            {errors.name && (
              <p id="name-error" className="text-red-500 text-sm mt-1 flex items-center" role="alert">
                <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="john@example.com"
              className={`transition-all duration-200 ${errors.email ? "border-red-500 shadow-sm shadow-red-200" : "border-gray-300 hover:border-gray-400 focus:border-black dark:border-gray-600 dark:hover:border-gray-500"}`}
              required
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-sm mt-1 flex items-center" role="alert">
                <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Inquiry Details</h2>
          <label htmlFor="department" className="block text-sm font-medium">
            Department <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <Select
            value={formState.department}
            onValueChange={handleDepartmentChange}
            required
          >
            <SelectTrigger
              id="department"
              aria-required="true"
              aria-invalid={!!errors.department}
              aria-describedby={errors.department ? "department-error" : undefined}
              className={`transition-all duration-200 ${errors.department ? "border-red-500 shadow-sm shadow-red-200" : "border-gray-300 hover:border-gray-400 focus:border-blue-500 dark:border-gray-600 dark:hover:border-gray-500"}`}
              aria-label="Department selection"
            >
              <SelectValue placeholder="Select a department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiries</SelectItem>
              <SelectItem value="membership">Membership</SelectItem>
              <SelectItem value="programs">Programs</SelectItem>
              <SelectItem value="events">Events</SelectItem>
              <SelectItem value="partnerships">Partnerships</SelectItem>
            </SelectContent>
          </Select>
          {errors.department && (
            <p id="department-error" className="text-red-500 text-sm mt-1 flex items-center" role="alert">
              <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
              {errors.department}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-medium">
            Subject <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <Input
            id="subject"
            name="subject"
            value={formState.subject}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            placeholder="Your message subject"
            className={`transition-all duration-200 ${errors.subject ? "border-red-500 shadow-sm shadow-red-200" : "border-gray-300 hover:border-gray-400 focus:border-blue-500 dark:border-gray-600 dark:hover:border-gray-500"}`}
            required
          />
          {errors.subject && (
            <p id="subject-error" className="text-red-500 text-sm mt-1 flex items-center" role="alert">
              <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
              {errors.subject}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium">
            Message <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            rows={5}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder="How can we help you?"
            className={`transition-all duration-200 ${errors.message ? "border-red-500 shadow-sm shadow-red-200" : "border-gray-300 hover:border-gray-400 focus:border-blue-500 dark:border-gray-600 dark:hover:border-gray-500"}`}
            required
          />
          {errors.message && (
            <p id="message-error" className="text-red-500 text-sm mt-1 flex items-center" role="alert">
              <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Privacy Notice Section */}
        <div className="text-sm text-gray-600 dark:text-gray-300 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-medium text-base mb-2 text-gray-800 dark:text-gray-200 flex items-center">
            <span className="inline-block w-1 h-5 bg-black mr-2 rounded-sm"></span>
            Privacy Notice
          </h3>
          <p className="mb-2">
            We collect your contact information to respond to your inquiry and provide the information you requested. Your data will be processed in accordance with our privacy policy.
          </p>
          <p>
            We will not share your information with third parties without your consent. For more information, please see our{" "}
            <Link href="/privacy-policy" className="text-black dark:text-white font-medium hover:text-gray-800 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm transition-colors duration-200">
              Privacy Policy
            </Link>.
          </p>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <Checkbox
              id="privacyPolicy"
              checked={formState.privacyPolicy}
              onCheckedChange={handlePrivacyPolicyChange}
              aria-required="true"
              aria-invalid={!!errors.privacyPolicy}
              aria-describedby={errors.privacyPolicy ? "privacy-error" : undefined}
              aria-label="I consent to LOTA Canada collecting and processing my data"
              className={errors.privacyPolicy ? "border-red-500 text-red-500" : "text-blue-600 border-gray-300 focus:ring-blue-500"}
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="privacyPolicy"
              className={`font-medium ${errors.privacyPolicy ? "text-red-500" : "text-gray-700 dark:text-gray-300"}`}
            >
              I consent to LOTA Canada collecting and processing my data as described in the privacy notice.
            </label>
            {errors.privacyPolicy && (
              <p id="privacy-error" className="text-red-500 text-sm mt-1 flex items-center" role="alert">
                <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                {errors.privacyPolicy}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg active:shadow-sm px-6 py-2.5 rounded-md"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            aria-label="Send Message"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </div>

        {submitResult && (
          <div
            className={`p-4 rounded-md shadow-md ${submitResult.success ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800" : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800"}`}
            role="alert"
            aria-live="assertive"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                {submitResult.success ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" aria-hidden="true" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" aria-hidden="true" />
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{submitResult.message}</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
