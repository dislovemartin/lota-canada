import { NavigationItem } from './types';

export const navigation: NavigationItem[] = [
  {
    name: "Home",
    href: "/",
    aiMetadata: {
      relevance: ["general", "overview"],
      keywords: ["home", "main", "landing"]
    }
  },
  {
    name: "About",
    href: "/about",
    aiMetadata: {
      relevance: ["organization", "mission", "leadership"],
      keywords: ["about", "mission", "vision", "team"]
    },
    submenu: [
      {
        name: "Our Mission",
        href: "/mission",
        description: "Learn about our vision and values",
        aiMetadata: {
          relevance: ["mission", "values"],
          keywords: ["mission", "vision", "values", "purpose"]
        }
      },
      {
        name: "Board of Directors",
        href: "/board",
        description: "Meet our leadership team",
        aiMetadata: {
          relevance: ["leadership", "team"],
          keywords: ["board", "directors", "leadership", "management"]
        }
      },
      {
        name: "Impact",
        href: "/impact",
        description: "See how we're making a difference",
        aiMetadata: {
          relevance: ["impact", "results"],
          keywords: ["impact", "achievements", "success", "difference"]
        }
      }
    ]
  },
  {
    name: "Programs",
    href: "/programs",
    aiMetadata: {
      relevance: ["services", "offerings"],
      keywords: ["programs", "services", "training"]
    },
    submenu: [
      {
        name: "Executive Mentorship",
        href: "/programs/executive-mentorship",
        description: "Strategic leadership development for executives",
        aiMetadata: {
          relevance: ["mentorship", "executive"],
          keywords: ["executive", "mentorship", "leadership", "development"]
        }
      },
      {
        name: "Leadership Workshops",
        href: "/programs/leadership-workshops",
        description: "Enhance your professional skills and competencies",
        aiMetadata: {
          relevance: ["workshops", "training"],
          keywords: ["workshops", "training", "skills", "development"]
        }
      },
      {
        name: "Community Engagement",
        href: "/programs/community-engagement",
        description: "Connect with industry professionals and leaders",
        aiMetadata: {
          relevance: ["community", "networking"],
          keywords: ["community", "engagement", "networking", "connection"]
        }
      }
    ]
  },
  {
    name: "Events",
    href: "/events",
    aiMetadata: {
      relevance: ["events", "activities"],
      keywords: ["events", "activities", "calendar"]
    },
    submenu: [
      {
        name: "Upcoming Events",
        href: "/events",
        description: "See what's happening next",
        aiMetadata: {
          relevance: ["upcoming", "calendar"],
          keywords: ["upcoming", "events", "schedule", "calendar"]
        }
      },
      {
        name: "Leadership Summit",
        href: "/events/leadership-summit-2025",
        description: "Our annual flagship event",
        aiMetadata: {
          relevance: ["summit", "conference"],
          keywords: ["summit", "leadership", "conference", "annual"]
        }
      },
      {
        name: "Past Events",
        href: "/events/past",
        description: "Browse our previous events",
        aiMetadata: {
          relevance: ["history", "past"],
          keywords: ["past", "previous", "history", "archive"]
        }
      }
    ]
  },
  {
    name: "Knowledge",
    href: "/knowledge",
    aiMetadata: {
      relevance: ["resources", "learning"],
      keywords: ["knowledge", "resources", "learning", "education"]
    },
    submenu: [
      {
        name: "Articles",
        href: "/knowledge",
        description: "Insights and resources for professional growth",
        aiMetadata: {
          relevance: ["articles", "insights"],
          keywords: ["articles", "insights", "resources", "growth"]
        }
      },
      {
        name: "Leadership Resources",
        href: "/knowledge/leadership",
        description: "Tools and guides for effective leadership",
        aiMetadata: {
          relevance: ["leadership", "resources"],
          keywords: ["leadership", "resources", "tools", "guides"]
        }
      },
      {
        name: "Career Development",
        href: "/knowledge/career",
        description: "Resources for advancing your career",
        aiMetadata: {
          relevance: ["career", "development"],
          keywords: ["career", "development", "advancement", "growth"]
        }
      }
    ]
  },
  {
    name: "LOTA AI",
    href: "/lota-llm",
    aiMetadata: {
      relevance: ["ai", "technology"],
      keywords: ["ai", "artificial intelligence", "llm", "technology"]
    }
  },
  {
    name: "Testimonials",
    href: "/testimonials",
    aiMetadata: {
      relevance: ["feedback", "success"],
      keywords: ["testimonials", "feedback", "success", "stories"]
    }
  },
  {
    name: "Contact",
    href: "/contact",
    aiMetadata: {
      relevance: ["contact", "support"],
      keywords: ["contact", "support", "help", "reach"]
    }
  }
]; 