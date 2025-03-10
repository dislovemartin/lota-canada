"use client";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";
export function AnnualEvent() {
    const [days, setDays] = useState(0);
    useEffect(() => {
        // Calculate days until March 1, 2025
        const registrationDate = new Date("2025-03-01");
        const today = new Date();
        const timeDiff = registrationDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setDays(daysDiff > 0 ? daysDiff : 0);
    }, []);
    return (<section className="py-20 relative">
      <div className="absolute inset-0 z-0">
        <Image src="/placeholder.svg?height=800&width=1600" alt="Tech Conference" fill className="object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-r from-background to-background/50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Annual Tech Summit <span className="text-accent">2025</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Join innovators and entrepreneurs for a transformative tech experience
            </p>

            <div className="flex items-center mb-4">
              <Calendar className="text-accent mr-3" size={20}/>
              <span className="text-foreground">June 10-12, 2025</span>
            </div>

            <div className="flex items-center mb-8">
              <Clock className="text-accent mr-3" size={20}/>
              <span className="text-foreground">Registration opens March 1, 2025</span>
            </div>

            <Link href="/events/tech-summit-2025" className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/80 transition-colors inline-block">
              Register Now
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 rounded-full border-4 border-secondary flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-accent mb-2">{days}</div>
                  <div className="text-muted-foreground">Days Until Registration</div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-accent/30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>);
}
