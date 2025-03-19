import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  sentiment?: "positive" | "negative" | "neutral";
}

interface TopicContent {
  id: string;
  topic: string;
  articles: Article[];
}

const LoadingSkeleton = () => (
  <div className="grid gap-4">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="overflow-hidden">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    ))}
  </div>
);

export function ContentFeed() {
  const [content, setContent] = useState<TopicContent[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchContent = async () => {
      if (!mounted) return;

      try {
        const response = await fetch("/api/content");
        if (!response.ok) throw new Error("Failed to fetch content");

        const data = await response.json();
        if (!data.success)
          throw new Error(data.error || "Failed to fetch content");

        if (!mounted) return;

        setContent(data.data);
        if (data.data.length > 0) {
          setSelectedTopic(data.data[0].id);
        }
        setLoading(false);
      } catch (err) {
        if (!mounted) return;

        setError("Failed to load content");
        setLoading(false);
      }
    };

    void fetchContent();

    const refreshInterval = setInterval(() => {
      void fetchContent();
    }, 15 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(refreshInterval);
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <Icons.error className="w-12 h-12 mb-4" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <Tabs value={selectedTopic} onValueChange={setSelectedTopic}>
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {content.map((topic) => (
            <TabsTrigger
              key={topic.id}
              value={topic.id}
              className="relative overflow-hidden"
            >
              <span>{topic.topic}</span>
              {topic.id === "mentorship" && (
                <Badge
                  variant="secondary"
                  className="absolute top-0 right-0 -mr-1 -mt-1"
                >
                  New
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <AnimatePresence mode="wait">
          {content.map((topic) => (
            <TabsContent key={topic.id} value={topic.id}>
              <ScrollArea className="h-[600px] pr-4">
                <motion.div
                  className="grid gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {topic.articles.map((article, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="group hover:shadow-lg transition-shadow duration-200">
                        <CardHeader>
                          <CardTitle className="group-hover:text-primary transition-colors">
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              {article.title}
                              <Icons.externalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Image
                              src={`https://www.google.com/s2/favicons?domain=${article.source}&sz=32`}
                              alt={article.source}
                              width={16}
                              height={16}
                              className="w-4 h-4"
                            />
                            <span>{article.source}</span>
                            <span>•</span>
                            <span>
                              {format(
                                new Date(article.publishedAt),
                                "MMM d, yyyy"
                              )}
                            </span>
                          </CardDescription>
                        </CardHeader>
                        {article.imageUrl && (
                          <div className="px-6">
                            <Image
                              src={article.imageUrl}
                              alt={article.title}
                              width={800}
                              height={400}
                              className="w-full h-48 object-cover rounded-md"
                              priority={index === 0}
                            />
                          </div>
                        )}
                        <CardContent>
                          <p className="text-muted-foreground">
                            {article.description}
                          </p>
                          {article.topics && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {article.topics.map((topic, i) => (
                                <Badge key={i} variant="outline">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          {article.author && (
                            <p className="text-sm text-muted-foreground">
                              By {article.author}
                            </p>
                          )}
                          {article.sentiment && (
                            <Badge
                              variant={
                                article.sentiment === "positive"
                                  ? "success"
                                  : article.sentiment === "negative"
                                  ? "destructive"
                                  : "default"
                              }
                            >
                              {article.sentiment}
                            </Badge>
                          )}
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </ScrollArea>
            </TabsContent>
          ))}
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
