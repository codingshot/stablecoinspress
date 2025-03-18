
import { useState, useEffect, useMemo } from 'react';
import { NewsItem } from '@/types';
import { fetchNews, formatDate } from '@/services/api';
import NewsCard from './NewsCard';
import { Loader2 } from 'lucide-react';
import { defaultNewsData } from '@/utils/defaultData';
import { toast } from 'sonner';
import SearchFilters, { TimeFilter, SortOption } from './SearchFilters';
import EmptyState from './EmptyState';
import SubmitNewsForm from './SubmitNewsForm';

const NewsFeed = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [showCuratorNotes, setShowCuratorNotes] = useState(true);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOption>('newest');
  const [searchBy, setSearchBy] = useState<'all' | 'content' | 'username' | 'curator'>('all');
  const [showSubmitForm, setShowSubmitForm] = useState(false);

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

  const resetFilters = () => {
    setSearchTerm('');
    setShowCuratorNotes(true);
    setTimeFilter('all');
    setSortOrder('newest');
    setSearchBy('all');
  };

  const hasActiveFilters = useMemo(() => {
    return (
      searchTerm !== '' ||
      !showCuratorNotes ||
      timeFilter !== 'all' ||
      sortOrder !== 'newest' ||
      searchBy !== 'all'
    );
  }, [searchTerm, showCuratorNotes, timeFilter, sortOrder, searchBy]);

  const filteredNews = useMemo(() => {
    if (news.length === 0) return [];

    // First apply time filter
    let filtered = [...news];
    
    if (timeFilter !== 'all') {
      const now = new Date();
      const timeThreshold = new Date();
      
      switch (timeFilter) {
        case 'hour':
          timeThreshold.setHours(now.getHours() - 1);
          break;
        case 'day':
          timeThreshold.setDate(now.getDate() - 1);
          break;
        case 'week':
          timeThreshold.setDate(now.getDate() - 7);
          break;
        case 'month':
          timeThreshold.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          timeThreshold.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(item => new Date(item.createdAt) >= timeThreshold);
    }

    // Then apply search term filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => {
        if (searchBy === 'all') {
          return (
            item.content.toLowerCase().includes(term) ||
            item.username.toLowerCase().includes(term) ||
            (item.curatorUsername && item.curatorUsername.toLowerCase().includes(term)) ||
            (item.curatorNotes && item.curatorNotes.toLowerCase().includes(term))
          );
        } else if (searchBy === 'content') {
          return item.content.toLowerCase().includes(term);
        } else if (searchBy === 'username') {
          return item.username.toLowerCase().includes(term);
        } else if (searchBy === 'curator') {
          return (
            (item.curatorUsername && item.curatorUsername.toLowerCase().includes(term)) ||
            (item.curatorNotes && item.curatorNotes.toLowerCase().includes(term))
          );
        }
        return false;
      });
    }

    // Apply sort order
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [news, searchTerm, timeFilter, sortOrder, showCuratorNotes, searchBy]);

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
    <div>
      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showCuratorNotes={showCuratorNotes}
        setShowCuratorNotes={setShowCuratorNotes}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        resetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
        curatorLabel="Show Curator"
      />

      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <NewsCard 
              key={item.tweetId} 
              item={item} 
              showCuratorNotes={showCuratorNotes}
            />
          ))}
        </div>
      ) : (
        <EmptyState resetFilters={resetFilters} searchTerm={searchTerm} />
      )}

      {error && filteredNews.length > 0 && (
        <div className="col-span-full mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-700 text-sm">
          Note: Showing fallback data due to API issues. Some content may not be current.
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
