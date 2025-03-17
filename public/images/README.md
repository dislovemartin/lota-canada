# LOTA Website Images

This directory contains images used throughout the LOTA website.

## Image Organization

- `/brand/` - Logo and brand assets
- `/hero/` - Hero and header images
- `/hero/new/` - New high-quality images from Unsplash
- `/leadership/` - Leadership-related images
- `/networking/` - Networking-related images
- `/mentorship/` - Mentorship-related images
- `/project-management/` - Project management and avatar images

## Image Sources

All images are either:

1. Owned by LOTA
2. Licensed from stock photo services
3. Free-to-use images from Unsplash and other free sources

## Using Images

When using images in the codebase:

1. Use the appropriate image for the context
2. Avoid duplicate images across different sections
3. Use the `ProfessionalImage` or `OptimizedImage` components when possible
4. Provide meaningful alt text for accessibility
5. Consider using the image fallbacks from `lib/image-fallbacks.ts`

## Adding New Images

To add new images:

1. Place them in the appropriate directory
2. Use descriptive filenames
3. Optimize images for web (compress, resize)
4. Update the image fallbacks in `lib/image-fallbacks.ts` if needed
5. Document the source and license if from external sources

## Downloading New Images

You can use the `scripts/download-images.sh` script to download new high-quality images from Unsplash and other free sources.

```bash
# Make the script executable
chmod +x scripts/download-images.sh

# Run the script
./scripts/download-images.sh
```

The script will download images to the `/public/images/hero/new/` directory. You can then update the image paths in the code to use these new images.

# Image Attribution

This document provides attribution for all images used on the LOTA Canada website.

## Hero Section Images

- `hero/diverse-professionals.jpg` - Photo by [Christina @ wocintechchat.com](https://unsplash.com/@wocintechchat) on [Unsplash](https://unsplash.com/photos/people-sitting-on-chair-in-front-of-table-with-laptop-computer-during-daytime-LQ1t-8Ms5PY)
- `hero/leadership-workshop.jpg` - Photo by [Campaign Creators](https://unsplash.com/@campaign_creators) on [Unsplash](https://unsplash.com/photos/group-of-people-sitting-inside-room-gMsnXqILjp4)

## Programs Section Images

- `programs/mentorship.jpg` - Photo by [Amy Hirschi](https://unsplash.com/@amyhirschi) on [Unsplash](https://unsplash.com/photos/two-women-sitting-in-front-of-table-b3AYk8HKCl0)
- `programs/workshop.jpg` - Photo by [Headway](https://unsplash.com/@headwayio) on [Unsplash](https://unsplash.com/photos/people-sitting-on-chair-near-table-5QgIuuBxKwM)
- `programs/community.jpg` - Photo by [Clay Banks](https://unsplash.com/@claybanks) on [Unsplash](https://unsplash.com/photos/group-of-people-standing-on-green-grass-field-during-daytime-LjqARJaJotc)

## Summit Section Images

- `summit/conference.jpg` - Photo by [Headway](https://unsplash.com/@headwayio) on [Unsplash](https://unsplash.com/photos/people-sitting-on-gang-chairs-inside-building-5QgIuuBxKwM)

## Knowledge Section Images

- `knowledge/leadership-article.jpg` - Photo by [Kaleidico](https://unsplash.com/@kaleidico) on [Unsplash](https://unsplash.com/photos/person-writing-on-white-paper-26MJGnCM0Wc)
- `knowledge/professional-growth.jpg` - Photo by [Hunters Race](https://unsplash.com/@huntersrace) on [Unsplash](https://unsplash.com/photos/person-writing-on-notebook-MYbhN8KaaEc)
- `knowledge/networking.jpg` - Photo by [Priscilla Du Preez](https://unsplash.com/@priscilladupreez) on [Unsplash](https://unsplash.com/photos/two-women-sitting-on-chair-XkKCui44iM0)

## Testimonials Section Images

- `testimonials/professional-1.jpg` - Photo by [Christina @ wocintechchat.com](https://unsplash.com/@wocintechchat) on [Unsplash](https://unsplash.com/photos/woman-in-black-blazer-sitting-on-chair-SJvDxw0azqw)
- `testimonials/professional-2.jpg` - Photo by [Jurica Koletić](https://unsplash.com/@juricakoletic) on [Unsplash](https://unsplash.com/photos/man-in-black-suit-jacket-7YVZYZeITc8)
- `testimonials/professional-3.jpg` - Photo by [Christina @ wocintechchat.com](https://unsplash.com/@wocintechchat) on [Unsplash](https://unsplash.com/photos/woman-in-black-long-sleeve-shirt-pAtA8xe_iVM)

## Impact Section Icons

- `impact/members-icon.svg` - Icon by [Lucide](https://lucide.dev/icons/users)
- `impact/events-icon.svg` - Icon by [Lucide](https://lucide.dev/icons/calendar)
- `impact/mentorship-icon.svg` - Icon by [Lucide](https://lucide.dev/icons/award)
- `impact/partners-icon.svg` - Icon by [Lucide](https://lucide.dev/icons/building)

## Logo Images

- All LOTA logo images are the property of LOTA Canada and are used with permission.

## Director Images

- All director images are the property of LOTA Canada and are used with permission.

---

All images from Unsplash are used under the [Unsplash License](https://unsplash.com/license), which grants a non-exclusive, worldwide copyright license to download, copy, modify, distribute, perform, and use photos from Unsplash for free, including for commercial purposes, without permission from or attributing the photographer or Unsplash. However, we've provided attribution as a courtesy to the photographers.

All icons from Lucide are used under the [ISC License](https://github.com/lucide-icons/lucide/blob/main/LICENSE), which allows free use, modification, and distribution with proper attribution.
