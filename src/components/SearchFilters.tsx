
import { useState, useEffect } from 'react';
import { Search, X, Filter, Clock, ArrowUpDown, MessageSquareText, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
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
  setSortOrder: (order: SortOption) => void;
  searchBy: 'all' | 'content' | 'username' | 'curator';
  setSearchBy: (searchBy: 'all' | 'content' | 'username' | 'curator') => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

const SearchFilters = ({
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
  hasActiveFilters
}: SearchFiltersProps) => {
  const isMobile = useIsMobile();
  const [showFilters, setShowFilters] = useState(false);

  // Close filters panel when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setShowFilters(false);
    }
  }, [isMobile]);

  return (
    <div className="mb-6 space-y-4">
      {/* Search bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="search"
          placeholder="Search stablecoin news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Mobile Filter Toggle */}
      {isMobile && (
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs">
              Reset
            </Button>
          )}
        </div>
      )}

      {/* Filter options - shown on desktop or when toggle is active on mobile */}
      {(!isMobile || showFilters) && (
        <div className="space-y-4 pt-2">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            {/* Search by filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Search in:</span>
              <ToggleGroup
                type="single"
                value={searchBy}
                onValueChange={(value) => value && setSearchBy(value as any)}
                size="sm"
              >
                <ToggleGroupItem value="all" aria-label="Search all fields">
                  All
                </ToggleGroupItem>
                <ToggleGroupItem value="content" aria-label="Search content">
                  <MessageSquareText className="h-3.5 w-3.5 mr-1" />
                  Content
                </ToggleGroupItem>
                <ToggleGroupItem value="username" aria-label="Search by username">
                  <User className="h-3.5 w-3.5 mr-1" />
                  Username
                </ToggleGroupItem>
                <ToggleGroupItem value="curator" aria-label="Search by curator">
                  Curator
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Sort order */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort:</span>
              <Tabs
                defaultValue="newest"
                value={sortOrder}
                onValueChange={(value) => setSortOrder(value as SortOption)}
                className="w-auto"
              >
                <TabsList className="grid w-auto grid-cols-2">
                  <TabsTrigger value="newest" className="flex items-center gap-1">
                    <ArrowUpDown className="h-3.5 w-3.5" />
                    Newest
                  </TabsTrigger>
                  <TabsTrigger value="oldest" className="flex items-center gap-1">
                    <ArrowUpDown className="h-3.5 w-3.5" />
                    Oldest
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            {/* Time period filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                <Clock className="h-3.5 w-3.5 inline mr-1" />
                Time:
              </span>
              <Select
                value={timeFilter}
                onValueChange={(value) => setTimeFilter(value as TimeFilter)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="hour">Past hour</SelectItem>
                  <SelectItem value="day">Past day</SelectItem>
                  <SelectItem value="week">Past week</SelectItem>
                  <SelectItem value="month">Past month</SelectItem>
                  <SelectItem value="year">Past year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Show curator notes toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Show curator notes:</span>
              <Switch
                checked={showCuratorNotes}
                onCheckedChange={setShowCuratorNotes}
                aria-label="Toggle curator notes"
              />
            </div>

            {/* Reset filters button (desktop only) */}
            {!isMobile && hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={resetFilters} className="ml-auto">
                Reset filters
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
