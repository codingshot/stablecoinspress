
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X, ChevronDown, Clock, SortDesc, SortAsc } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export type TimeFilter = 'all' | 'hour' | 'day' | 'week' | 'month' | 'year';
export type SortOption = 'newest' | 'oldest';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showCuratorNotes: boolean;
  setShowCuratorNotes: (show: boolean) => void;
  timeFilter: TimeFilter;
  setTimeFilter: (filter: TimeFilter) => void;
  sortOrder: SortOption;
  setSortOrder: (sort: SortOption) => void;
  searchBy: 'all' | 'content' | 'username' | 'curator';
  setSearchBy: (by: 'all' | 'content' | 'username' | 'curator') => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  curatorLabel?: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  showCuratorNotes,
  setShowCuratorNotes,
  timeFilter,
  setTimeFilter,
  sortOrder,
  setSortOrder,
  searchBy,
  setSearchBy,
  resetFilters,
  hasActiveFilters,
  curatorLabel = "Show Curator"
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();

  const timeFilterLabels: Record<TimeFilter, string> = {
    all: 'All Time',
    hour: 'Last Hour',
    day: 'Last 24 Hours',
    week: 'Last Week',
    month: 'Last Month',
    year: 'Last Year'
  };

  const searchByLabels: Record<'all' | 'content' | 'username' | 'curator', string> = {
    all: 'All Fields',
    content: 'Content',
    username: 'Username',
    curator: 'Curator'
  };

  return (
    <div className="mb-6 space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4"
        />
        {searchTerm && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            <span className="hidden sm:inline">Filters</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${showFilters ? 'rotate-180' : ''}`}
            />
          </Button>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="ml-2 text-gray-500"
              onClick={resetFilters}
            >
              <X size={14} className="mr-1" />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center text-sm">
            <Clock size={16} className="mr-2 text-gray-500" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
              className="bg-transparent border-none text-sm focus:outline-none cursor-pointer"
            >
              {Object.entries(timeFilterLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center text-sm">
            {sortOrder === 'newest' ? (
              <SortDesc size={16} className="mr-2 text-gray-500" />
            ) : (
              <SortAsc size={16} className="mr-2 text-gray-500" />
            )}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOption)}
              className="bg-transparent border-none text-sm focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="p-4 bg-gray-50 rounded-md space-y-4 animate-in fade-in-0 slide-in-from-top-5 duration-300">
          <div className={isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-2 gap-4"}>
            <div>
              <h4 className="text-sm font-medium mb-2">Search Options</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(searchByLabels).map(([value, label]) => (
                  <Button
                    key={value}
                    type="button"
                    size="sm"
                    variant={searchBy === value ? 'default' : 'outline'}
                    className={`text-xs ${searchBy === value ? 'bg-brand text-white' : ''}`}
                    onClick={() => setSearchBy(value as 'all' | 'content' | 'username' | 'curator')}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Display Options</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="show-curator-notes"
                  checked={showCuratorNotes}
                  onChange={(e) => setShowCuratorNotes(e.target.checked)}
                  className="rounded border-gray-300 text-brand focus:ring-brand"
                />
                <label htmlFor="show-curator-notes" className="text-sm">
                  {curatorLabel}
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
