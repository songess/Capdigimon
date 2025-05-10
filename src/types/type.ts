export interface News {
    id: string;
    title: string;
    description: string;
    content: string;
    url: string;
    source: string;
    publishedAt: string;
    category: string;
    importance: number;
    keywords: string[];
}

export interface Paper {
    id: string;
    title: string;
    abstract: string;
    authors: string[];
    url: string;
    publishedAt: string;
    category: string;
    keywords: string[];
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

export interface Category {
    id: string;
    name: string;
    description: string;
    subcategories?: SubCategory[];
}

export interface SubCategory {
    id: string;
    name: string;
    description: string;
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
