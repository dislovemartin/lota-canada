import { SocialShare } from "@/components/social-share";
import { ArticleStructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articles } from "../data";

type ArticleParams = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<ArticleParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Find the article by slug
  const article = articles.find((a) => a.slug === slug) || articles[0];

  return {
    title: `${article.title} | LOTA Canada`,
    description: article.excerpt,
    keywords: [article.category.toLowerCase(), "leadership", "professional development", ...article.title.toLowerCase().split(" ")],
    openGraph: {
      title: `${article.title} | LOTA Canada`,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      tags: [article.category],
      images: [
        {
          url: article.image.startsWith('http') ? article.image : `https://lota-canada.vercel.app${article.image}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | LOTA Canada`,
      description: article.excerpt,
      images: [article.image.startsWith('http') ? article.image : `https://lota-canada.vercel.app${article.image}`],
    },
    alternates: {
      canonical: `https://lota-canada.vercel.app/knowledge/${slug}`,
    },
  };
}

export default async function ArticleDetail({
  params,
}: {
  params: Promise<ArticleParams>;
}) {
  const { slug } = await params;
  // In a real application, you would fetch this data from an API or CMS
  const article = articles.find((a) => a.slug === slug) || articles[0];

  // Create breadcrumb items
  const breadcrumbItems = [
    {
      name: "Knowledge Hub",
      item: "https://lota-canada.vercel.app/knowledge",
    },
    {
      name: article.title,
      item: `https://lota-canada.vercel.app/knowledge/${article.slug}`,
    },
  ];

  // Article URL for sharing
  const articleUrl = `https://lota-canada.vercel.app/knowledge/${article.slug}`;

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="container-wide">
          <Link
            href="/knowledge"
            className="inline-flex items-center text-sm hover:underline mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Knowledge
          </Link>

          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <span className="inline-block text-sm text-muted-foreground">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl font-serif mb-6">{article.title}</h1>

            <div className="flex items-center text-sm text-muted-foreground mb-8">
              <span className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {article.date}
              </span>
              <span className="mx-3">•</span>
              <span className="flex items-center">
                <Clock size={14} className="mr-1" />
                {article.readTime} min read
              </span>
            </div>

            {article.image && (
              <div className="relative h-[400px] w-full mb-10 rounded-lg overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg dark:prose-invert">
              {article.content.map((block, index) => {
                if (block.type === "paragraph") {
                  return <p key={index}>{block.content}</p>;
                } else if (block.type === "heading") {
                  return <h2 key={index} id={block.content?.toLowerCase().replace(/\s+/g, '-') || `heading-${index}`}>{block.content}</h2>;
                } else if (block.type === "list") {
                  return (
                    <ul key={index}>
                      {block.items?.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </div>

            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Written by</p>
                  <p className="font-medium">{article.author}</p>
                </div>

                <SocialShare
                  url={articleUrl}
                  title={article.title}
                  description={article.excerpt}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Structured Data */}
      <ArticleStructuredData
        headline={article.title}
        description={article.excerpt}
        image={article.image.startsWith('http') ? article.image : `https://lota-canada.vercel.app${article.image}`}
        datePublished={article.date}
        author={{
          name: article.author,
        }}
        publisher={{
          name: "LOTA Canada",
          logo: "https://lota-canada.vercel.app/images/brand/lota-logo.svg",
        }}
        url={`https://lota-canada.vercel.app/knowledge/${article.slug}`}
        keywords={[article.category, "leadership", "professional development"]}
        articleSection="Knowledge Hub"
        isAccessibleForFree={true}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData items={breadcrumbItems} />
    </>
  );
}
