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

export interface RecommendContentResponse extends NewsPaper {
  sim_score: number;
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
  hits_sum: number;
  group_category: string;
  record_date: string;
}

export interface AdminStats {
  total_users: number;
  total_news: number;
  total_papers: number;
  // crawlingStatus: {
  //   lastRun: string;
  //   success: boolean;
  //   itemsProcessed: number;
  // };
}

export interface CrawlingHistory {
  crawl_time: string;
  error_403: number;
  unexpected_category: number;
  type: string;
  success: number;
  error_etc: number;
}

export interface CategoryStats {
  category_name: string;
  news_count: number;
  paper_count: number;
  user_count: number;
  total_hits: number;
}

export interface LoginResponse extends Response {
  access_token: string;
  message: string;
  user_info: string;
}

export interface AlarmResponse extends Response {
  id: string;
  user_id: string;
  frequency: frequencyEnum;
  day_of_week: dayOfWeekEnum;
  day_of_month: dayOfMonthEnum;
  receive_time: receiveTimeEnum;
  email_on: boolean;
  kakao_on: boolean;
  email: string;
}

export interface KeywordSearchResponse {
  keyword: string;
  contexts: string;
}

export interface SchedulerState {
  state: 'RUNNING' | 'PAUSED' | 'STOPPED';
  next_run_time: string;
  next_newsletter_send_time: string;
  next_news_update_time: string;
  next_trend_data_update_time: string;
  next_paper_update_time: string;
}

export type frequencyEnum = 'daily' | 'weekly' | 'monthly';
export type dayOfWeekEnum = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type dayOfMonthEnum =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;
export type receiveTimeEnum =
  | '00:00'
  | '01:00'
  | '02:00'
  | '03:00'
  | '04:00'
  | '05:00'
  | '06:00'
  | '07:00'
  | '08:00'
  | '09:00'
  | '10:00'
  | '11:00'
  | '12:00'
  | '13:00'
  | '14:00'
  | '15:00'
  | '16:00'
  | '17:00'
  | '18:00'
  | '19:00'
  | '20:00'
  | '21:00'
  | '22:00'
  | '23:00';

export type categoryGroupEnum = 'CS' | 'EE' | 'IT';
