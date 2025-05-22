'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AdminStats } from '@/types/type';
import { fetchAdminStats, fetchCategoryStats, subCategoriesEngToKor } from '@/app/api/newsApi';
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
import { RefreshCcw, Users, FileText, Settings } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Admin() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'crawling'>('overview');
  const [loading, setLoading] = useState(true);
  const [newsCount, setNewsCount] = useState(0);
  const [papersCount, setPapersCount] = useState(0);
  const [newsCountData, setNewsCountData] = useState<{ name: string; count: number }[]>([]);
  const [paperCountData, setPaperCountData] = useState<{ name: string; count: number }[]>([]);
  const [userCountData, setUserCountData] = useState<{ name: string; count: number }[]>([]);
  const [totalHitsData, setTotalHitsData] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const statsData = await fetchAdminStats();
        setStats(statsData);

        // 뉴스 및 논문 데이터 가져오기
        setNewsCount(statsData.total_news);
        setPapersCount(statsData.total_papers);

        // 카테고리 데이터 가져오기
        const categoryStatsData = await fetchCategoryStats();
        const newsCountData = categoryStatsData.map((data) => ({
          name: subCategoriesEngToKor(data.category_name),
          count: data.news_count,
        }));
        const paperCountData = categoryStatsData.map((data) => ({
          name: subCategoriesEngToKor(data.category_name),
          count: data.paper_count,
        }));
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // 차트 데이터
  const contentDistributionData = [
    { name: '뉴스', value: newsCount },
    { name: '논문', value: papersCount },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  // const categoryDistributionData = [
  //   { name: '기술', count: 1250 },
  //   { name: '금융', count: 850 },
  //   { name: '통신', count: 650 },
  //   { name: '에너지', count: 450 },
  //   { name: '의료', count: 950 },
  //   { name: '인공지능', count: 1130 },
  // ];

  const crawlingHistoryData = [
    { date: '2025-04-01', 성공: 120, 실패: 5 },
    { date: '2025-04-02', 성공: 115, 실패: 8 },
    { date: '2025-04-03', 성공: 128, 실패: 3 },
  ];

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
            <div className="h-[900px]">
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
            <h2 className="text-xl font-semibold mb-4">크롤링 상태(TODO)</h2>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <RefreshCcw className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 text-sm">마지막 실행</h3>
                    <p className="text-lg font-semibold">{new Date(stats.crawlingStatus.lastRun).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  {stats.crawlingStatus.success ? (
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  ) : (
                    <div className="p-3 rounded-full bg-red-100 text-red-600">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                  )}
                  <div className="ml-4">
                    <h3 className="text-gray-500 text-sm">상태</h3>
                    <p className="text-lg font-semibold">{stats.crawlingStatus.success ? '성공' : '실패'}</p>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 text-sm">처리된 항목</h3>
                    <p className="text-lg font-semibold">{stats.crawlingStatus.itemsProcessed}</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* 크롤링 히스토리 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">크롤링 히스토리(TODO)</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={crawlingHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="성공" fill="#82ca9d" />
                  <Bar dataKey="실패" fill="#ff8042" />
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
    </div>
  );
}
