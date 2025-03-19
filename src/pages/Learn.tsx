
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Book, ExternalLink, Tag as TagIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Define the LearnResource type
interface LearnResource {
  title: string;
  description: string;
  link: string;
  tags: string[];
}

// Sample resources data
const initialResources: LearnResource[] = [
  {
    title: "Coinmarketcap Stablecoins",
    description: "View market caps of all stablecoin projects.",
    link: "https://coinmarketcap.com/view/stablecoin/",
    tags: ["data", "analytics"]
  },
  {
    title: "Stablecoins: Definitions and Classifications",
    description: "A comprehensive introduction to what stablecoins are and how they work.",
    link: "https://www.bis.org/publ/qtrpdf/r_qt1909w.pdf",
    tags: ["basics"]
  },
  {
    title: "FATF Guidance for a Risk-Based Approach to Virtual Assets",
    description: "Regulatory guidance on virtual assets including stablecoins.",
    link: "https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/rba-virtual-assets.pdf",
    tags: ["laws"]
  },
  {
    title: "The Block: Stablecoin Research",
    description: "Ongoing research and reports on stablecoin markets and trends.",
    link: "https://www.theblock.co/stablecoins",
    tags: ["news", "reports"]
  },
  {
    title: "Messari Stablecoin Index",
    description: "Analytics and data tracking for major stablecoins.",
    link: "https://messari.io/asset/stablecoin-index",
    tags: ["analytics", "data"]
  },
  {
    title: "DeFi Llama Stablecoins",
    description: "Comprehensive stablecoin data and analytics across multiple blockchains.",
    link: "https://defillama.com/stablecoins",
    tags: ["data", "analytics"]
  },
  {
    title: "European Commission: MiCA Regulation",
    description: "European legislation on crypto-assets including stablecoins.",
    link: "https://finance.ec.europa.eu/regulation-and-supervision/financial-services-regulations-under-discussion/markets-crypto-assets_en",
    tags: ["laws"]
  },
  {
    title: "Stablecoins: Risks, Potential, and Regulation",
    description: "Federal Reserve research on stablecoins and their impact.",
    link: "https://www.federalreserve.gov/econres/feds/stablecoins-risks-potential-and-regulation.htm",
    tags: ["reports", "laws"]
  }
];

// Available tags for filtering
const allTags = ["basics", "laws", "analytics", "reports", "news", "data"];

export default function Learn() {
  // State for resources and search/filter
  const [resources, setResources] = useState<LearnResource[]>(initialResources);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags') ? searchParams.get('tags')!.split(',') : []
  );

  // Filter resources based on search term and selected tags
  useEffect(() => {
    // Update URL params when filters change
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
    setSearchParams(params, { replace: true });

    // Filter resources
    const filtered = initialResources.filter(resource => {
      // Filter by search term
      const matchesSearch = searchTerm.trim() === '' || 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by tags
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => resource.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });

    setResources(filtered);
  }, [searchTerm, selectedTags, setSearchParams]);

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Handle tag click from a resource card
  const handleTagClick = (tag: string, event: React.MouseEvent) => {
    event.preventDefault();
    toggleTag(tag);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSearchParams({});
  };

  // Get tag color based on category
  const getTagColor = (tag: string) => {
    switch(tag) {
      case 'basics': return 'bg-blue-500 hover:bg-blue-600';
      case 'laws': return 'bg-purple-500 hover:bg-purple-600';
      case 'analytics': return 'bg-green-500 hover:bg-green-600';
      case 'reports': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'news': return 'bg-red-500 hover:bg-red-600';
      case 'data': return 'bg-indigo-500 hover:bg-indigo-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow mt-24">
        <div className="container-narrow py-8">
          <div className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Stablecoins 101</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your hub for learning about Stablecoins with basic education, laws, analytics, reports and news resources.
            </p>
          </div>

          {/* Search and filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Book className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium flex items-center">
                <TagIcon size={16} className="mr-1" /> 
                Filter by:
              </span>
              
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  className={`cursor-pointer capitalize ${
                    selectedTags.includes(tag) 
                      ? getTagColor(tag) + ' text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
              
              {(searchTerm || selectedTags.length > 0) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="ml-2"
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>

          {/* Resources grid */}
          {resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <a 
                  key={index} 
                  href={resource.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block card-hover"
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between text-xl">
                        <span>{resource.title}</span>
                        <ExternalLink size={18} className="text-gray-500 flex-shrink-0" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-gray-700">
                        {resource.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-2 pt-0">
                      {resource.tags.map(tag => (
                        <Badge
                          key={tag}
                          className={`capitalize ${getTagColor(tag)} text-white`}
                          onClick={(e) => handleTagClick(tag, e)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </CardFooter>
                  </Card>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold mb-2">No resources found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
              <Button onClick={clearFilters}>Clear all filters</Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
