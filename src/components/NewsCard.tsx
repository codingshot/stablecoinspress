
import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { NewsItem } from '@/types';
import { formatDate } from '@/services/api';

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard = ({ item }: NewsCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const card = document.getElementById(`news-card-${item.tweetId}`);
    if (card) observer.observe(card);

    return () => observer.disconnect();
  }, [item.tweetId]);

  // Extract links from content for proper rendering
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = item.content.split(urlRegex);

  const handleOriginalTweetClick = () => {
    window.open(`https://twitter.com/${item.username}/status/${item.tweetId}`, '_blank');
  };

  const handleCuratorTweetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.curatorTweetId) {
      window.open(`https://twitter.com/${item.curatorUsername}/status/${item.curatorTweetId}`, '_blank');
    }
  };

  return (
    <div 
      id={`news-card-${item.tweetId}`}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden card-hover ${
        isInView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${Math.random() * 0.3}s` }}
    >
      <div 
        className="p-6 cursor-pointer" 
        onClick={handleOriginalTweetClick}
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
            <img 
              src={`https://unavatar.io/twitter/${item.username}`} 
              alt={item.username}
              className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsLoaded(true)}
            />
          </div>
          <div className="ml-3">
            <h3 className="text-black font-medium">@{item.username}</h3>
            <p className="text-gray-500 text-sm">{formatDate(item.createdAt)}</p>
          </div>
          <div className="ml-auto">
            <ExternalLink size={16} className="text-gray-400" />
          </div>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-black">
            {parts.map((part, i) => {
              // If it matches a URL pattern
              if (part.match(urlRegex)) {
                return (
                  <a 
                    key={i}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:text-brand/80 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {part}
                  </a>
                );
              }
              return part;
            })}
          </p>
        </div>
        
        {item.curatorNotes && (
          <div 
            className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm"
            onClick={handleCuratorTweetClick}
          >
            <div className="flex items-center mb-1">
              <span className="text-xs font-medium text-gray-500">Curator note by @{item.curatorUsername}</span>
            </div>
            <p className="text-gray-700">{item.curatorNotes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
