"use client";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, Twitter, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
const navigation = {
    main: [
        { name: "Home", href: "/" },
        { name: "Mission", href: "/mission" },
        { name: "Events", href: "/events" },
        { name: "Knowledge", href: "/knowledge" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ],
    programs: [
        { name: "Mentorship Program", href: "/programs/mentorship" },
        { name: "Leadership Workshop Series", href: "/programs/workshops" },
        { name: "Community Engagement", href: "/programs/community" },
        { name: "Executive Mentorship", href: "/programs/executive-mentorship" },
    ],
    knowledge: [
        { name: "Articles", href: "/knowledge" },
        { name: "Research", href: "/knowledge/research" },
        { name: "Resources", href: "/knowledge/resources" },
        { name: "Case Studies", href: "/knowledge/case-studies" },
    ],
    legal: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
    ],
    social: [
        {
            name: "Facebook",
            href: "#",
            icon: Facebook,
        },
        {
            name: "Instagram",
            href: "#",
            icon: Instagram,
        },
        {
            name: "Twitter",
            href: "#",
            icon: Twitter,
        },
        {
            name: "LinkedIn",
            href: "#",
            icon: Linkedin,
        },
    ],
};
export default function Footer() {
    return (<footer className="bg-black text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container-wide mx-auto pt-16 pb-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <span className="sr-only">
                LOTA - Leaders of Tomorrow Association
              </span>
              <Image src="/placeholder.svg?height=40&width=180" alt="LOTA" width={180} height={40} className="h-10 w-auto"/>
            </Link>

            <p className="text-sm text-gray-300 max-w-xs">
              Empowering the next generation of leaders through connection,
              education, and opportunity.
            </p>

            <div className="flex space-x-6">
              {navigation.social.map((item) => (<SocialLink key={item.name} item={item}/>))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <FooterColumn title="Navigation">
                <div className="mt-6 space-y-4">
                  {navigation.main.map((item) => (<FooterLink key={item.name} href={item.href}>
                      {item.name}
                    </FooterLink>))}
                </div>
              </FooterColumn>

              <FooterColumn title="Programs" className="mt-10 md:mt-0">
                <div className="mt-6 space-y-4">
                  {navigation.programs.map((item) => (<FooterLink key={item.name} href={item.href}>
                      {item.name}
                    </FooterLink>))}
                </div>
              </FooterColumn>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8">
              <FooterColumn title="Knowledge">
                <div className="mt-6 space-y-4">
                  {navigation.knowledge.map((item) => (<FooterLink key={item.name} href={item.href}>
                      {item.name}
                    </FooterLink>))}
                </div>
              </FooterColumn>

              <FooterColumn title="Contact Us" className="mt-10 md:mt-0">
                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3"/>
                    <a href="mailto:info@lotacanada.com" className="text-sm text-gray-300 hover:text-white transition-colors">
                      info@lotacanada.com
                    </a>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3"/>
                    <span className="text-sm text-gray-300">
                      Toronto, Ontario, Canada
                    </span>
                  </div>

                  <div className="pt-2">
                    <a href="/contact" className="inline-flex items-center text-sm text-white hover:text-gray-300 transition-colors">
                      Contact Us <ArrowRight className="ml-2 h-4 w-4"/>
                    </a>
                  </div>
                </div>
              </FooterColumn>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Leaders of Tomorrow Association.
            All rights reserved.
          </p>

          <div className="flex space-x-6">
            {navigation.legal.map((item) => (<a key={item.name} href={item.href} className="text-xs text-gray-400 hover:text-gray-300 transition-colors">
                {item.name}
              </a>))}
          </div>
        </div>
      </div>
    </footer>);
}
function SocialLink({ item }) {
    return (<a href={item.href} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
      <span className="sr-only">{item.name}</span>
      <item.icon className="h-6 w-6" aria-hidden="true"/>
    </a>);
}
function FooterColumn({ title, children, className }) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.3,
    });
    return (<motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.6 }} className={className}>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      {children}
    </motion.div>);
}
function FooterLink({ href, children }) {
    return (<div>
      <Link href={href} className="text-sm text-gray-300 hover:text-white transition-colors">
        {children}
      </Link>
    </div>);
}
