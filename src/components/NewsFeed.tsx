
import { useState, useEffect } from 'react';
import { NewsItem } from '@/types';
import { fetchNews } from '@/services/api';
import NewsCard from './NewsCard';
import { Loader2 } from 'lucide-react';
import { defaultNewsData } from '@/utils/defaultData';
import { toast } from 'sonner';

const NewsFeed = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        setIsLoading(true);
        const data = await fetchNews();
        setNews(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Unable to load news from API. Showing fallback data.');
        // Use default data in case of any error
        setNews(defaultNewsData);
        toast.error('Unable to load latest news from API. Showing fallback data.');
      } finally {
        setIsLoading(false);
      }
    };

    getNews();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 text-brand animate-spin mb-2" />
        <p className="text-gray-500">Loading latest stablecoin news...</p>
      </div>
    );
  }

  if (error && news.length === 0) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-brand text-white rounded-md hover:bg-brand/90 transition-colors"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <NewsCard key={item.tweetId} item={item} />
      ))}
      {error && (
        <div className="col-span-full mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-700 text-sm">
          Note: Showing fallback data due to API issues. Some content may not be current.
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
