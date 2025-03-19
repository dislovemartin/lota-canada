import { NextResponse } from 'next/server';

const PERIGON_API_KEY = process.env.PERIGON_API_KEY;
const BASE_URL = "https://api.goperigon.com/v1/all";

const topics = [
  {
    id: "leadership",
    title: "Leadership Development",
    query: "leadership development executive training"
  },
  {
    id: "networking",
    title: "Professional Networking",
    query: "professional networking career connections"
  },
  {
    id: "mentorship",
    title: "Mentorship",
    query: "professional mentorship career guidance coaching"
  },
  {
    id: "mentorship-programs",
    title: "Mentorship Programs",
    query: "corporate mentorship programs professional development"
  },
  {
    id: "career-development",
    title: "Career Development",
    query: "career growth professional development skills"
  },
  {
    id: "community",
    title: "Community Impact",
    query: "community engagement social impact leadership"
  },
  {
    id: "business-leadership",
    title: "Business Leadership",
    query: "business leadership management strategy"
  }
];

async function fetchPerigonContent(topic: { id: string; title: string; query: string }) {
  const params = new URLSearchParams({
    apiKey: PERIGON_API_KEY || '',
    q: topic.query,
    sortBy: 'date',
    language: 'en',
    size: '5',
    // Add more specific parameters for better results
    source: 'forbes.com,entrepreneur.com,hbr.org,inc.com',
    category: 'Business,Career',
    excludeSource: 'reddit.com,twitter.com' // Exclude social media
  });

  try {
    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error(`Error fetching content for topic ${topic.title}:`, error);
    return [];
  }
}

export async function GET() {
  try {
    const results = await Promise.all(
      topics.map(async (topic) => {
        const articles = await fetchPerigonContent(topic);
        return {
          id: topic.id,
          topic: topic.title,
          articles,
        };
      })
    );

    return NextResponse.json({ success: true, data: results });
  } catch (error: Error | unknown) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
} 