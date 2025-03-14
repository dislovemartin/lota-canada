"use client";

import { Breadcrumb } from "@/components/breadcrumb";
import { LoginForm } from "@/components/login-form";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { PageTransition } from "@/components/ui/page-transition";
import { motion } from "framer-motion";
import Image from "next/image";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login page...</div>}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  return (
    <PageTransition>
      <div id="main-content">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Login", href: "/login", isCurrent: true },
          ]}
          className="container-wide pt-4 pb-2"
        />

        <div className="relative min-h-[calc(100vh-200px)] flex items-center">
          {/* Background pattern for visual appeal */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-[10%] -left-[5%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-3xl" />
            <div className="absolute top-[30%] -right-[5%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-3xl" />
            <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-teal-500/5 blur-3xl" />
          </div>

          <div className="container max-w-screen-xl mx-auto py-12 md:py-24 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden md:block"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="LOTA Login"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-white/90">Access exclusive resources and connect with the LOTA community</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <AnimatedHeading
                  title="Sign in to your account"
                  subtitle="Access exclusive resources, event registrations, and community features."
                  align="left"
                  size="lg"
                  className="mb-8"
                />

                <div className="bg-white dark:bg-gray-800/80 rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
                  <LoginForm />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

