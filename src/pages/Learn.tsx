import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Book, ExternalLink, Tag as TagIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LearnResource {
  title: string;
  description: string;
  link: string;
  tags: string[];
}

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
  },
  {
    title: "Artemis Stablecoin Dashboard",
    description: "Comprehensive dashboard for stablecoin analytics.",
    link: "https://app.artemis.xyz/stablecoins",
    tags: ["data", "analytics"]
  },
  {
    title: "RWA Stablecoins Dashboard",
    description: "Dashboard for real-world asset backed stablecoins.",
    link: "https://app.rwa.xyz/stablecoins",
    tags: ["data", "analytics"]
  },
  {
    title: "Coinchange Yield Indexes and Benchmark Comparison",
    description: "A comprehensive analysis of yield indexes for stablecoin assets, including performance trends and risk categorization (DeFi and CeFi). Tracks stablecoin yields like USDC, USDT, DAI, and others.",
    link: "https://www.coinchange.io/blog/yield-indexes-and-benchmark-comparison-stablecoin-assets-december-2023",
    tags: ["analytics", "reports"]
  },
  {
    title: "S&P Global: Stablecoins - A Deep Dive into Valuation and Depegging",
    description: "An in-depth report analyzing stablecoin valuation, market capitalization trends, and depegging events. Includes historical data on major stablecoins like USDT, USDC, and DAI.",
    link: "https://www.spglobal.com/content/dam/spglobal/corporate/en/images/general/special-editorial/rl_stablecoins.pdf",
    tags: ["reports", "analytics"]
  },
  {
    title: "European Central Bank (ECB) Working Paper on Stablecoins",
    description: "Explores the relationship between stablecoins, money market funds, and monetary policy. Includes market capitalization data for Tether, USDC, and DAI.",
    link: "https://www.ecb.europa.eu/pub/pdf/scpwps/ecb.wp2987~1919e51abf.en.pdf",
    tags: ["reports", "laws"]
  },
  {
    title: "Visa Onchain Analytics Dashboard",
    description: "Provides transaction data for stablecoins across public blockchains, offering insights into their adoption and usage patterns.",
    link: "https://visaonchainanalytics.com/transactions",
    tags: ["analytics", "data"]
  },
  {
    title: "Chainalysis Stablecoins 101",
    description: "An educational resource on stablecoins with insights into their programmability, transparency, and major issuers like Circle (USDC) and Paxos (USDP).",
    link: "https://www.chainalysis.com/blog/stablecoins-most-popular-asset/",
    tags: ["basics", "reports"]
  },
  {
    title: "CoinGecko Stablecoin Market Overview",
    description: "Tracks price charts, market cap rankings, and historical performance for various stablecoins like Tether (USDT), USDC, and DAI.",
    link: "https://www.coingecko.com/en/coins/stablecoin",
    tags: ["data", "analytics"]
  },
  {
    title: "IMF Report on Digital Currencies",
    description: "Examines the role of stablecoins in global finance, including their impact on monetary policy and financial stability.",
    link: "https://www.imf.org/en/Publications/Policy-Papers/Issues/2023/09/14/The-Rise-of-Public-and-Private-Digital-Money-Opportunities-and-Challenges-537023",
    tags: ["reports", "laws"]
  },
  {
    title: "Messari Stablecoin Research Reports",
    description: "Offers periodic reports on the stablecoin ecosystem with data on market trends, adoption rates, and regulatory developments.",
    link: "https://messari.io/research/stablecoins",
    tags: ["reports", "analytics"]
  },
  {
    title: "CryptoCompare Stablecoin Metrics",
    description: "Provides analytics on trading volumes, price stability, and liquidity for major stablecoins.",
    link: "https://data.cryptocompare.com/research",
    tags: ["analytics", "data"]
  },
  {
    title: "GENIUS Act: Stablecoin Regulatory Framework",
    description: "Legislation introduced by Senators Scott, Hagerty, Lummis, and Gillibrand to establish a comprehensive regulatory framework for payment stablecoins in the United States.",
    link: "https://www.banking.senate.gov/newsroom/majority/scott-hagerty-lummis-gillibrand-introduce-legislation-to-establish-a-stablecoin-regulatory-framework",
    tags: ["laws", "news"]
  },
  {
    title: "Report on Stablecoins - Treasury Department",
    description: "A report by the President's Working Group on Financial Markets, FDIC, and OCC recommending a federal prudential framework for payment stablecoins.",
    link: "https://home.treasury.gov/system/files/136/StableCoinReport_Nov1_508.pdf",
    tags: ["reports", "laws"]
  },
  {
    title: "S. 394 - GENIUS Act of 2025",
    description: "Full text of the GENIUS Act of 2025, providing definitions, licensing procedures, reserve requirements, and enforcement regimes for stablecoin issuers.",
    link: "https://www.congress.gov/119/bills/s394/BILLS-119s394is.pdf",
    tags: ["laws"]
  },
  {
    title: "Update on Regulation of Fiat-Backed Stablecoins - GOV.UK",
    description: "An update from the UK government on its legislative approach to regulating fiat-backed stablecoins within its financial services framework.",
    link: "https://www.gov.uk/government/publications/update-on-plans-for-the-regulation-of-fiat-backed-stablecoins",
    tags: ["laws", "news"]
  },
  {
    title: "Stablecoins: Regulatory Responses to Their Promise of Stability",
    description: "A paper by the BIS assessing regulatory frameworks across jurisdictions for single fiat-pegged stablecoins, focusing on licensing, reserve management, and consumer protection.",
    link: "https://www.bis.org/fsi/publ/insights57.htm",
    tags: ["reports", "laws"]
  },
  {
    title: "Evolution of Stablecoins - Congress.gov",
    description: "A report discussing legislative efforts to create a federal framework for issuing stablecoins, addressing risks such as runs and systemic concerns.",
    link: "https://www.congress.gov/118/meeting/house/115753/documents/HHRG-118-BA21-20230419-SD002.pdf",
    tags: ["reports", "laws"]
  },
  {
    title: "Congress Moves Forward on Stablecoin Legislation: GENIUS Act",
    description: "Details on the US Senate Banking Committee's approval of the GENIUS Act, establishing a comprehensive regulatory framework for payment stablecoins.",
    link: "https://www.mayerbrown.com/en/insights/publications/2025/03/congress-moves-forward-on-stablecoin-legislation-the-us-senate-banking-committee-approves-the-genius-act",
    tags: ["news", "laws"]
  },
  {
    title: "President's Working Group Report on Stablecoins",
    description: "A report outlining regulatory frameworks for stablecoins and pathways to address risks such as destabilizing runs and disruptions in payment systems.",
    link: "https://home.treasury.gov/news/press-releases/jy0454",
    tags: ["reports", "laws"]
  }
];

const allTags = ["basics", "laws", "analytics", "reports", "news", "data"];

export default function Learn() {
  const [resources, setResources] = useState<LearnResource[]>(initialResources);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags') ? searchParams.get('tags')!.split(',') : []
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
    setSearchParams(params, { replace: true });

    const filtered = initialResources.filter(resource => {
      const matchesSearch = searchTerm.trim() === '' || 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => resource.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });

    setResources(filtered);
  }, [searchTerm, selectedTags, setSearchParams]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const handleTagClick = (tag: string, event: React.MouseEvent) => {
    event.preventDefault();
    toggleTag(tag);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSearchParams({});
  };

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
