"use client";
import { useState, useEffect } from "react";
const teamMembers = [
    {
        id: 1,
        name: "Stone Yu",
        role: "President",
        availability: "busy",
    },
    {
        id: 2,
        name: "Mo Mokbel",
        role: "CEO",
        availability: "available",
    },
    {
        id: 3,
        name: "Daniel Kim",
        role: "COO",
        availability: "away",
    },
    {
        id: 4,
        name: "Sue McLay",
        role: "VP of Marketing",
        availability: "available",
    },
];
export default function TeamAvailability() {
    const [members, setMembers] = useState(teamMembers);
    const [currentTime, setCurrentTime] = useState(new Date());
    // Update current time every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
            // In a real implementation, this would fetch real-time availability data
            // For demo purposes, we'll randomly update availability
            setMembers((prev) => prev.map((member) => (Object.assign(Object.assign({}, member), { availability: Math.random() > 0.7
                    ? ["available", "busy", "away"][Math.floor(Math.random() * 3)]
                    : member.availability }))));
        }, 60000);
        return () => clearInterval(interval);
    }, []);
    const getAvailabilityColor = (status) => {
        switch (status) {
            case "available":
                return "bg-green-500";
            case "busy":
                return "bg-red-500";
            case "away":
                return "bg-yellow-500";
            default:
                return "bg-gray-500";
        }
    };
    const getAvailabilityText = (status) => {
        switch (status) {
            case "available":
                return "Available";
            case "busy":
                return "In a meeting";
            case "away":
                return "Away";
            default:
                return "Unknown";
        }
    };
    return (<div className="border rounded-md overflow-hidden">
      <div className="bg-secondary px-4 py-3 flex justify-between items-center">
        <h4 className="font-medium text-sm">Team Availability</h4>
        <div className="text-xs text-muted-foreground">
          {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
      <div className="divide-y">
        {members.map((member) => (<div key={member.id} className="px-4 py-3 flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">{member.name}</div>
              <div className="text-xs text-muted-foreground">{member.role}</div>
            </div>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${getAvailabilityColor(member.availability)} mr-2`}></div>
              <span className="text-xs">{getAvailabilityText(member.availability)}</span>
            </div>
          </div>))}
      </div>
      <div className="bg-secondary px-4 py-2 text-xs text-center text-muted-foreground">Updated in real-time</div>
    </div>);
}
