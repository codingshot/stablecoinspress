
import { NewsItem } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatDate } from '@/services/api';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ExternalLink } from 'lucide-react';

interface NewsCardProps {
  item: NewsItem;
  showCuratorNotes?: boolean;
}

const NewsCard = ({ item, showCuratorNotes = true }: NewsCardProps) => {
  const tweetUrl = `https://x.com/${item.username}/status/${item.tweetId}`;
  
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gray-200 text-gray-600 font-semibold text-xs">
              {item.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">
              <a 
                href={`https://x.com/${item.username}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-brand transition-colors"
              >
                @{item.username}
              </a>
            </p>
            <p className="text-xs text-gray-500">{formatDate(item.createdAt)}</p>
          </div>
          <a 
            href={tweetUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-auto text-gray-500 hover:text-brand transition-colors"
            aria-label="View on X"
          >
            <ExternalLink size={16} />
          </a>
        </div>
        
        <div>
          <p className="whitespace-pre-line mb-2">{item.content}</p>
          
          {showCuratorNotes && item.curatorNotes && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Curator Notes:</p>
              <p className="text-sm text-gray-600">{item.curatorNotes}</p>
            </div>
          )}
        </div>
      </CardContent>
      
      {showCuratorNotes && (
        <CardFooter className="p-4 pt-2 border-t border-gray-100 text-xs text-gray-500">
          Curated by{" "}
          <a 
            href={`https://x.com/${item.curatorUsername}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-brand transition-colors ml-1"
          >
            @{item.curatorUsername}
          </a>
        </CardFooter>
      )}
    </Card>
  );
};

export default NewsCard;
