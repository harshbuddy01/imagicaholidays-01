const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.imagicaholidays.com/api/v1';

export interface WebsiteConfigData {
  hero?: {
    useVideo: boolean;
    videoUrl1: string;
    videoUrl2: string;
    fallbackSlides: Array<{
      title: string;
      subtitle: string;
      image: string;
      location?: string;
    }>;
  };
  odyssey?: {
    title: string;
    subtitle: string;
    spots: Array<{
      id: string;
      name: string;
      location: string;
      image: string;
    }>;
  };
  destinations?: Array<{
    id: string;
    title: string;
    tagline: string;
    description: string;
    mainImage: string;
    overlayImage: string;
    link: string;
  }>;
  activities?: Array<{
    title: string;
    subtitle: string;
    image: string;
    alt: string;
  }>;
  villas?: {
    title?: string;
    subtitle?: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      image: string;
    }>;
  };
  [key: string]: any;
}

export interface DestinationCmsData {
  id: string;
  destinationId: string;
  aboutHtml: string | null;
  heroImage: string | null;
  galleryImages: any;
  seoTitle: string | null;
  seoDesc: string | null;
  isPublished: boolean;
  pageContent: {
    heroImage?: string;
    attractions?: Array<{
      name: string;
      tag: string;
      image: string;
      short: string;
    }>;
  } | null;
  destination: {
    id: string;
    name: string;
  };
}

export async function fetchWebsiteConfig(): Promise<{ config: WebsiteConfigData; destinations: DestinationCmsData[] } | null> {
  try {
    const res = await fetch(`${API_BASE}/website-configs/public`, {
      next: { revalidate: 10 } // Cache for 10 seconds for real-time responsiveness
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const body = await res.json();
    if (body.success && body.data) {
      return body.data;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch website config:', error);
    return null;
  }
}

export async function fetchDestinationCms(slug: string): Promise<DestinationCmsData | null> {
  try {
    const data = await fetchWebsiteConfig();
    if (data && data.destinations) {
      const match = data.destinations.find((d: any) => 
        d.destinationId === slug || 
        d.destination?.name?.toLowerCase() === slug.toLowerCase()
      );
      return match || null;
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch destination CMS for ${slug}:`, error);
    return null;
  }
}
