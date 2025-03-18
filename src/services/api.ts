
import { NewsItem, ApiResponse } from "../types";
import { toast } from "@/hooks/use-toast";

// Sample data in case API fails or returns empty
import sampleData from "./sampleData";

const API_URL = "https://curatedotfun-floral-sun-1539.fly.dev/api/submissions/stablecoins?status=approved";

export const fetchNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data: NewsItem[] = await response.json();
    
    // If we get empty data, use sample data
    if (!data || data.length === 0) {
      console.log("API returned empty data, using sample data");
      return sampleData as NewsItem[];
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    toast({
      title: "Unable to fetch latest news",
      description: "Using cached data instead",
      variant: "destructive",
    });
    
    // Return sample data as fallback
    return sampleData as NewsItem[];
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
