import { useState, useEffect } from 'react';
import { Meilisearch } from 'meilisearch';

const client = new Meilisearch({


  host: 'https://getmeilimeilisearchv190-production-7566.up.railway.app',
  apiKey: 'fcbe8kxcskvf55j34f8hn4tw8e7loxff', // TODO: Move to env and use a Search Key for security
});

export interface SearchResult {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  image?: string;
  type: 'destination' | 'itinerary';
}

export function useSearch(query: string) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 1) {
      setResults([]);
      return;
    }

    const search = async () => {
      setLoading(true);
      try {
        const [destRes, itinRes] = await Promise.all([
          client.index('destinations').search(query, { limit: 5 }),
          client.index('itineraries').search(query, { limit: 5 }),
        ]);

        const combined: SearchResult[] = [
          ...destRes.hits.map((h: any) => ({ ...h, type: 'destination' as const })),
          ...itinRes.hits.map((h: any) => ({ ...h, type: 'itinerary' as const })),
        ];

        setResults(combined);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(search, 150); // Debounce
    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading };
}
