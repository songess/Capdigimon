export interface NewsPaper {
  summary: string;
  title: string;
  date: string;
  source: string;
  hits: number;
  id: number;
  contents: string;
  author: string;
  link: string;
  type: 'news' | 'paper';
}

export interface NewsPaperResponse {
  newspaper: NewsPaper;
  categories: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  interests: string[];
  preferredCategories: string[];
  notificationSettings: {
    email: boolean;
    kakao: boolean;
    slack: boolean;
  };
  briefingFrequency: 'daily' | 'weekly' | 'monthly';
}

export type CategoryEnum = 'COMPUTER_ENGINEERING' | 'ELECTRICAL_ELECTRONIC_ENGINEERING' | 'IT_CATEGORY';

export interface Category {
  id: CategoryEnum;
  name: string;
  subcategories?: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
}

export interface Keyword {
  id: string;
  name: string;
  category: string;
  count: number;
}

export interface TrendData {
  date: string;
  keyword: string;
  count: number;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalNews: number;
  totalPapers: number;
  crawlingStatus: {
    lastRun: string;
    success: boolean;
    itemsProcessed: number;
  };
}

export interface LoginResponse extends Response {
  access_token: string;
  message: string;
  username: string;
}
