interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!src) return '';

  // Handle Cloudinary URLs by transforming them directly on Cloudinary's edge CDN
  if (src.includes('res.cloudinary.com')) {
    const uploadMatch = src.match(/^(https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.*)$/);
    if (uploadMatch) {
      const [, base, rest] = uploadMatch;
      const q = quality ? `q_${quality}` : 'q_auto';
      const transform = `f_auto,${q},w_${width},c_limit`;

      // Avoid injecting duplicate transformations if already present
      if (rest.startsWith('f_auto') || rest.startsWith('w_') || rest.startsWith('c_')) {
        return src;
      }

      return `${base}${transform}/${rest}`;
    }
    return src;
  }

  // Handle Unsplash URLs
  if (src.includes('images.unsplash.com')) {
    try {
      const url = new URL(src);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', (quality || 75).toString());
      url.searchParams.set('auto', 'format');
      return url.toString();
    } catch {
      return src;
    }
  }

  // Return local static assets or other URLs directly
  return src;
}
