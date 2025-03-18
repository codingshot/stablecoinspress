
import { NewsItem } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatDate } from '@/services/api';

interface NewsCardProps {
  item: NewsItem;
  showCuratorNotes?: boolean;
}

const NewsCard = ({ item, showCuratorNotes = true }: NewsCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-xs overflow-hidden">
            {item.username.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">@{item.username}</p>
            <p className="text-xs text-gray-500">{formatDate(item.createdAt)}</p>
          </div>
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
      
      <CardFooter className="p-4 pt-2 border-t border-gray-100 text-xs text-gray-500">
        Curated by @{item.curatorUsername}
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
