
export interface ModerationHistory {
  tweetId: string;
  feedId: string;
  adminId: string;
  action: string;
  note: string | null;
  timestamp: string;
  moderationResponseTweetId: string;
}

export interface NewsItem {
  tweetId: string;
  userId: string;
  username: string;
  content: string;
  curatorNotes: string | null;
  curatorId: string;
  curatorUsername: string;
  curatorTweetId: string;
  createdAt: string;
  submittedAt: string;
  moderationHistory: ModerationHistory[];
  status: string;
  moderationResponseTweetId: string;
}

export interface ApiResponse {
  data: NewsItem[];
  status: number;
}
