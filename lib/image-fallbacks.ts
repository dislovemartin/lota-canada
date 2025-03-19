/**
 * Image fallback configuration for the LOTA Canada website
 * Provides category-specific professional images to replace placeholders
 */

export const imageFallbacks = {
  // Hero and header images
  hero: "/images/hero/diverse-professionals.jpg",
  header: "/images/hero/image-asset2.jpeg",

  // Logo images
  logo: "/images/brand/LOTA logo SVG.svg",
  logoSquare: "/images/brand/LOTA LOGO transparent background.png",
  logoHorizontal: "/images/brand/LOTA LOGO transparent background.png",

  // Program-specific images
  leadership: "/images/hero/image-asset3.jpeg",
  networking: "/images/hero/image-asset4.jpeg",
  mentorship: "/images/professional/mentorship/mentorship-session.jpg",

  // People images
  avatar: "/images/project-management/avatar-1.jpg",
  avatarAlt: "/images/project-management/avatar-2.jpg",
  avatarFallback: "/images/project-management/avatar-3.jpg",
  avatarMale1: "/images/project-management/avatar-2.jpg",
  avatarFemale1: "/images/project-management/avatar-1.jpg",
  avatarMale2: "/images/project-management/avatar-3.jpg",

  // Event images
  event: "/images/hero/diverse-professionals.jpg",
  conference: "/images/hero/image-asset2.jpeg",
  workshop: "/images/professional/workshops/leadership-workshop.jpg",

  // Knowledge section images
  emotionalIntelligence: "/images/hero/image-asset3.jpeg",
  careerTransition: "/images/hero/image-asset4.jpeg",
  professionalDevelopment: "/images/hero/image-asset2.jpeg",

  // Default fallback
  default: "/images/hero/diverse-professionals.jpg",
};

/**
 * Get appropriate fallback image based on image context
 * @param type - The type of image needed
 * @param alt - Alt text which can be used to determine appropriate fallback
 * @returns The path to the appropriate fallback image
 */
export function getFallbackImage(
  type: string = "default",
  alt: string = ""
): string {
  // Check if we have a direct match for the type
  if (type in imageFallbacks) {
    return imageFallbacks[type as keyof typeof imageFallbacks];
  }

  // Try to determine type from alt text
  const altLower = alt.toLowerCase();

  if (altLower.includes("leadership") || altLower.includes("leader")) {
    return imageFallbacks.leadership;
  }

  if (altLower.includes("network") || altLower.includes("connection")) {
    return imageFallbacks.networking;
  }

  if (altLower.includes("mentor") || altLower.includes("guidance")) {
    return imageFallbacks.mentorship;
  }

  if (altLower.includes("event") || altLower.includes("gathering")) {
    return imageFallbacks.event;
  }

  if (altLower.includes("conference") || altLower.includes("summit")) {
    return imageFallbacks.conference;
  }

  if (altLower.includes("workshop") || altLower.includes("training")) {
    return imageFallbacks.workshop;
  }

  if (
    altLower.includes("avatar") ||
    altLower.includes("profile") ||
    altLower.includes("person")
  ) {
    // Randomly select one of the three avatar options for variety
    const avatarOptions = [
      imageFallbacks.avatar,
      imageFallbacks.avatarAlt,
      imageFallbacks.avatarFallback,
    ];
    const randomIndex = Math.floor(Math.random() * avatarOptions.length);
    return avatarOptions[randomIndex];
  }

  // Default fallback
  return imageFallbacks.default;
}
