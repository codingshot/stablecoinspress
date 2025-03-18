
import { Search, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  resetFilters: () => void;
  searchTerm?: string;
}

const EmptyState = ({ resetFilters, searchTerm }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium mb-2">No results found</h3>
      <p className="text-gray-500 mb-6 max-w-md">
        {searchTerm ? (
          <>
            No results match <span className="font-medium">"{searchTerm}"</span>.
            Try adjusting your search or filter criteria.
          </>
        ) : (
          <>No results match the current filter criteria.</>
        )}
      </p>
      <Button onClick={resetFilters} variant="outline" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Reset filters
      </Button>
    </div>
  );
};

export default EmptyState;
