"use client";

import { Facebook, Linkedin, Mail, Share2, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface SocialShareProps {
    url: string;
    title: string;
    description?: string;
    className?: string;
}

export function SocialShare({
    url,
    title,
    description = "",
    className = "",
}: SocialShareProps) {
    const [canShare, setCanShare] = useState(false);

    useEffect(() => {
        // Check if the Web Share API is available
        setCanShare(typeof navigator !== 'undefined' && !!navigator.share);
    }, []);

    // Encode the URL and text for sharing
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    // Generate sharing URLs
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    const emailUrl = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`;

    // Handle native sharing if available
    const handleShare = async () => {
        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: description,
                    url,
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            // Fallback to opening a share dialog
            window.open(twitterUrl, "_blank");
        }
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <span className="text-sm text-muted-foreground mr-2">Share:</span>

            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => window.open(twitterUrl, "_blank", "noopener,noreferrer")}
                aria-label="Share on Twitter"
            >
                <Twitter className="h-4 w-4" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => window.open(facebookUrl, "_blank", "noopener,noreferrer")}
                aria-label="Share on Facebook"
            >
                <Facebook className="h-4 w-4" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => window.open(linkedinUrl, "_blank", "noopener,noreferrer")}
                aria-label="Share on LinkedIn"
            >
                <Linkedin className="h-4 w-4" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => window.open(emailUrl)}
                aria-label="Share via Email"
            >
                <Mail className="h-4 w-4" />
            </Button>

            {canShare && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={handleShare}
                    aria-label="Share using device sharing"
                >
                    <Share2 className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
} 