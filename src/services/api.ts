import { NewsItem } from '@/types';
import sampleData from './sampleData';
import { defaultNewsData } from '@/utils/defaultData';

export const fetchNews = async (): Promise<NewsItem[]> => {
  try {
    // Fetch from the live API
    const response = await fetch('https://stablecoins-rss.up.railway.app/api/items');
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    // Fallback to default data in case of any error
    return defaultNewsData;
  }
};

// Add a helper function for date formatting
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};
