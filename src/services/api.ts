
import { NewsItem } from '@/types';
import sampleData from './sampleData';
import { defaultNewsData } from '@/utils/defaultData';

export const fetchNews = async (): Promise<NewsItem[]> => {
  try {
    // This is a mock implementation, replace with actual API call
    // For now, we'll simulate an API call with a delayed response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Try to use sample data first, if it fails, use default data
    try {
      // This will throw an error if sampleData has syntax issues
      const data = sampleData;
      return data;
    } catch (error) {
      console.error('Error using sampleData, falling back to default data:', error);
      return defaultNewsData;
    }
    
  } catch (error) {
    console.error('API Error:', error);
    // Fallback to default data in case of any error
    return defaultNewsData;
  }
};
