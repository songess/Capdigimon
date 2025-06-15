'use client';

import { useState, useEffect } from 'react';
import { AdminStats, CrawlingHistory, SchedulerState } from '@/types/type';
import {
  fetchAdminStats,
  fetchCategoryStats,
  fetchCrawlingHistory,
  fetchManualCrawling,
  fetchSchedulerState,
  subCategoriesEngToKor,
} from '@/app/api/newsApi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { RefreshCcw, Users, FileText, Settings, AlertCircle, Play, Pause } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export default function Admin() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'crawling' | 'scheduler'>('overview');
  const [loading, setLoading] = useState(true);
  const [schedulerState, setSchedulerState] = useState<SchedulerState | null>(null);
  const [newsCount, setNewsCount] = useState(0);
  const [papersCount, setPapersCount] = useState(0);
  const [newsCountData, setNewsCountData] = useState<{ name: string; count: number }[]>([]);
  const [paperCountData, setPaperCountData] = useState<{ name: string; count: number }[]>([]);
  const [userCountData, setUserCountData] = useState<{ name: string; count: number }[]>([]);
  const [totalHitsData, setTotalHitsData] = useState<{ name: string; count: number }[]>([]);
  const [crawlingType, setCrawlingType] = useState<'news' | 'paper'>('news');
  const [crawlingHistoryNews, setCrawlingHistoryNews] = useState<CrawlingHistory[]>([]);
  const [crawlingHistoryPaper, setCrawlingHistoryPaper] = useState<CrawlingHistory[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const statsData = await fetchAdminStats();
        const crawlingHistoryNewsData = await fetchCrawlingHistory('news');
        const crawlingHistoryPaperData = await fetchCrawlingHistory('paper');
        const schedulerStateData = await fetchSchedulerState();

        setStats(statsData);
        setCrawlingHistoryNews(crawlingHistoryNewsData.slice(0, 3).reverse());
        setCrawlingHistoryPaper(crawlingHistoryPaperData.slice(0, 3).reverse());
        setSchedulerState(schedulerStateData);

        // 뉴스 및 논문 데이터 가져오기
        setNewsCount(statsData.total_news);
        setPapersCount(statsData.total_papers);

        // 카테고리 데이터 가져오기
        const categoryStatsData = await fetchCategoryStats();
        const newsCountData = categoryStatsData.map((data) => ({
          name: subCategoriesEngToKor(data.category_name),
          count: data.news_count,
        }));
        const paperCountData = categoryStatsData
          .map((data) => ({
            name: subCategoriesEngToKor(data.category_name),
            count: data.paper_count,
          }))
          .filter((data) => {
            return !(
              data.name === '퀄컴' ||
              data.name === '미디어텍' ||
              data.name === '애플' ||
              data.name === '샤오미' ||
              data.name === '비보' ||
              data.name === 'OPPO' ||
              data.name === '화웨이' ||
              data.name === '스냅드래곤' ||
              data.name === '디멘시티' ||
              data.name === '키린'
            );
          });
        const userCountData = categoryStatsData.map((data) => ({
          name: subCategoriesEngToKor(data.category_name),
          count: data.user_count,
        }));
        const totalHitsData = categoryStatsData.map((data) => ({
          name: subCategoriesEngToKor(data.category_name),
          count: data.total_hits,
        }));
        setNewsCountData(newsCountData);
        setPaperCountData(paperCountData);
        setUserCountData(userCountData);
        setTotalHitsData(totalHitsData);
      } catch (error) {
        console.error('데이터 로드 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // 차트 데이터
  const contentDistributionData = [
    { name: '뉴스', value: newsCount },
    { name: '논문', value: papersCount },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
      </div>

      {/* 탭 메뉴 */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex -mb-px">
          <button
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            <Settings className="mr-2 h-5 w-5" />
            시스템 개요
          </button>
          <button
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'crawling'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('crawling')}
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            크롤링 모니터링
          </button>
          <button
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'scheduler'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('scheduler')}
          >
            <Settings className="mr-2 h-5 w-5" />
            스케줄러 관리
          </button>
        </div>
      </div>

      {/* 시스템 개요 */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm">총 사용자</h3>
                  <p className="text-2xl font-semibold">{stats.total_users}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm">총 뉴스</h3>
                  <p className="text-2xl font-semibold">{stats.total_news}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm">총 논문</h3>
                  <p className="text-2xl font-semibold">{stats.total_papers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 차트 */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">콘텐츠 분포</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contentDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contentDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 카테고리 분포 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">카테고리별 뉴스 분포</h2>
            <div className="h-[900px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={newsCountData} layout="vertical" margin={{ top: 5, right: 30, left: 150, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">카테고리별 논문 분포</h2>
            <div className="h-[600px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paperCountData} layout="vertical" margin={{ top: 5, right: 30, left: 150, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">카테고리별 유저 분포</h2>
            <div className="h-[900px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userCountData} layout="vertical" margin={{ top: 5, right: 30, left: 150, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">카테고리별 총 히트수 분포</h2>
            <div className="h-[900px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={totalHitsData} layout="vertical" margin={{ top: 5, right: 30, left: 150, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* 크롤링 모니터링 */}
      {activeTab === 'crawling' && (
        <div className="space-y-6">
          {/* 크롤링 상태 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">크롤링 상태</h2>
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-md ${
                    crawlingType === 'news' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setCrawlingType('news')}
                >
                  뉴스
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    crawlingType === 'paper' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setCrawlingType('paper')}
                >
                  논문
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <RefreshCcw className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 text-sm">마지막 실행</h3>
                    <p className="text-lg font-semibold">
                      {crawlingType === 'news'
                        ? new Date(crawlingHistoryNews[0]?.crawl_time || '').toLocaleString()
                        : new Date(crawlingHistoryPaper[0]?.crawl_time || '').toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 text-sm">성공</h3>
                    <p className="text-lg font-semibold">
                      {crawlingType === 'news'
                        ? crawlingHistoryNews[0]?.success || 0
                        : crawlingHistoryPaper[0]?.success || 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 text-red-600">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 text-sm">총 에러</h3>
                    <p className="text-lg font-semibold">
                      {crawlingType === 'news'
                        ? (crawlingHistoryNews[0]?.error_403 || 0) +
                          (crawlingHistoryNews[0]?.error_etc || 0) +
                          (crawlingHistoryNews[0]?.unexpected_category || 0)
                        : (crawlingHistoryPaper[0]?.error_403 || 0) +
                          (crawlingHistoryPaper[0]?.error_etc || 0) +
                          (crawlingHistoryPaper[0]?.unexpected_category || 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 에러 상세 정보 */}
            {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 text-sm">403 에러</h3>
                    <p className="text-lg font-semibold">
                      {crawlingType === 'news'
                        ? crawlingHistoryNews[0]?.error_403 || 0
                        : crawlingHistoryPaper[0]?.error_403 || 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 text-sm">예상치 못한 카테고리</h3>
                    <p className="text-lg font-semibold">
                      {crawlingType === 'news'
                        ? crawlingHistoryNews[0]?.unexpected_category || 0
                        : crawlingHistoryPaper[0]?.unexpected_category || 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 text-red-600">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 text-sm">기타 에러</h3>
                    <p className="text-lg font-semibold">
                      {crawlingType === 'news'
                        ? crawlingHistoryNews[0]?.error_etc || 0
                        : crawlingHistoryPaper[0]?.error_etc || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* 크롤링 히스토리 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">크롤링 히스토리</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={crawlingType === 'news' ? crawlingHistoryNews : crawlingHistoryPaper}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="crawl_time"
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시`;
                    }}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시`;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="success" name="성공" fill="#82ca9d" />
                  <Bar dataKey="error_403" name="403 에러" fill="#ff8042" />
                  <Bar dataKey="unexpected_category" name="예상치 못한 카테고리" fill="#8884d8" />
                  <Bar dataKey="error_etc" name="기타 에러" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 크롤링 실행 버튼 */}
          {/* <div className="flex justify-end">
            <Button
              className="px-6 py-6 text-base"
              onClick={() => {
                toast.promise(
                  // 실제로는 API 호출
                  new Promise((resolve) => setTimeout(resolve, 2000)),
                  {
                    loading: '크롤링 작업 실행 중...',
                    success: '크롤링 작업이 성공적으로 시작되었습니다!',
                    error: '크롤링 작업 시작 중 오류가 발생했습니다.',
                  },
                );
              }}
            >
              <RefreshCcw className="mr-2 h-5 w-5" />
              크롤링 실행
            </Button>
          </div> */}
        </div>
      )}

      {/* 스케줄러 관리 */}
      {activeTab === 'scheduler' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">스케줄러 상태</h2>
                <div className="mt-2 flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      schedulerState?.state === 'RUNNING'
                        ? 'bg-green-500'
                        : schedulerState?.state === 'PAUSED'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <span className="text-gray-600">
                    {schedulerState?.state === 'RUNNING'
                      ? '실행 중'
                      : schedulerState?.state === 'PAUSED'
                      ? '일시 중지'
                      : '중지됨'}
                  </span>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button
                  variant={schedulerState?.state === 'RUNNING' ? 'destructive' : 'default'}
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/scheduler/pause', { method: 'POST' });
                      if (response.ok) {
                        const newState = await response.json();
                        setSchedulerState(newState);
                        toast.success('스케줄러가 일시 중지되었습니다.');
                      }
                    } catch {
                      toast.error('스케줄러 상태 변경 중 오류가 발생했습니다.');
                    }
                  }}
                  // disabled={schedulerState?.state !== 'RUNNING'}
                  disabled={true}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                  // className="cursor-pointer"
                >
                  <Pause className="mr-2 h-5 w-5" />
                  일시 중지
                </Button>
                <Button
                  variant="default"
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/scheduler/resume', { method: 'POST' });
                      if (response.ok) {
                        const newState = await response.json();
                        setSchedulerState(newState);
                        toast.success('스케줄러가 재개되었습니다.');
                      }
                    } catch {
                      toast.error('스케줄러 상태 변경 중 오류가 발생했습니다.');
                    }
                  }}
                  // disabled={schedulerState?.state === 'RUNNING'}
                  disabled={true}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                  // className="cursor-pointer"
                >
                  <Play className="mr-2 h-5 w-5" />
                  재개
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">다음 실행 일정</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">뉴스 업데이트</span>
                    <span className="font-medium">
                      {new Date(schedulerState?.next_news_update_time || '').toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">논문 업데이트</span>
                    <span className="font-medium">
                      {new Date(schedulerState?.next_paper_update_time || '').toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">트렌드 데이터 업데이트</span>
                    <span className="font-medium">
                      {new Date(schedulerState?.next_trend_data_update_time || '').toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">뉴스레터 발송</span>
                    <span className="font-medium">
                      {new Date(schedulerState?.next_newsletter_send_time || '').toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">수동 크롤링 실행</h3>
                <div className="space-y-4">
                  <Button
                    className="w-full cursor-pointer"
                    onClick={async () => {
                      try {
                        const response = await fetchManualCrawling({ type: 'news' });
                        if (response.ok) {
                          toast.success('뉴스 크롤링이 시작되었습니다.');
                        }
                      } catch {
                        toast.error('뉴스 크롤링 시작 중 오류가 발생했습니다.');
                      }
                    }}
                  >
                    <RefreshCcw className="mr-2 h-5 w-5" />
                    뉴스 크롤링 실행
                  </Button>
                  <Button
                    className="w-full cursor-pointer"
                    onClick={async () => {
                      try {
                        const response = await fetchManualCrawling({ type: 'paper' });
                        if (response.ok) {
                          toast.success('논문 크롤링이 시작되었습니다.');
                        }
                      } catch {
                        toast.error('논문 크롤링 시작 중 오류가 발생했습니다.');
                      }
                    }}
                  >
                    <RefreshCcw className="mr-2 h-5 w-5" />
                    논문 크롤링 실행
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
