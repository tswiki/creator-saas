
interface FetchParams {
  params?: {
    route?: string;
    [key: string]: any;
  };
  cache?: boolean;
}

async function fetchFromApi<T>({ params, cache = false }: FetchParams): Promise<T> {
  try {
    // Build URL with params
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    const url = `/api${params?.route || ''}${queryString}`;

    // Fetch with caching options
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      cache: cache ? 'force-cache' : 'no-store'
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching from API:', error);
    throw error;
  }
}

export default fetchFromApi;