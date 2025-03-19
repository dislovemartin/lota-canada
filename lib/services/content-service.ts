import { cache } from 'react';

interface Article {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  author: string;
  imageUrl: string;
  category?: string;
  topics?: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
}

interface TopicContent {
  id: string;
  topic: string;
  articles: Article[];
}

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

class ContentService {
  private static instance: ContentService;
  private contentCache: Map<string, { data: TopicContent[]; timestamp: number }>;

  private constructor() {
    this.contentCache = new Map();
  }

  public static getInstance(): ContentService {
    if (!ContentService.instance) {
      ContentService.instance = new ContentService();
    }
    return ContentService.instance;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < CACHE_DURATION;
  }

  public async getContent(): Promise<TopicContent[]> {
    const cachedContent = this.contentCache.get('content');
    
    if (cachedContent && this.isCacheValid(cachedContent.timestamp)) {
      return cachedContent.data;
    }

    try {
      const response = await fetch('/api/content');
      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch content');
      }

      this.contentCache.set('content', {
        data: data.data,
        timestamp: Date.now()
      });

      return data.data;
    } catch (error) {
      console.error('Error fetching content:', error);
      // Return cached content if available, even if expired
      return cachedContent?.data || [];
    }
  }

  public clearCache(): void {
    this.contentCache.clear();
  }
}

export const getContentService = cache(() => ContentService.getInstance());

export const useContent = cache(async () => {
  const contentService = getContentService();
  return await contentService.getContent();
}); 