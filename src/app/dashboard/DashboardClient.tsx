'use client';

import { useState, useEffect } from 'react';
import { NewsPaper, Category, TrendData } from '@/types/type';
import { fetchNews, fetchPapers, fetchCategories, fetchTrends, fetchAllNews, fetchAllPapers } from '@/app/api/newsApi';
import { fetchSubCategoryTrends, fetchSubCategoryTrendsByCategory } from '@/app/api/subCategoryTrends';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts';
import { Newspaper, BookOpen, TrendingUp, BarChart2, Activity } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface NewsPaperWithCategory extends NewsPaper {
  category: string[];
}

interface DashboardClientProps {
  access_token?: string;
}

export default function DashboardClient({ access_token }: DashboardClientProps) {
  const [news, setNews] = useState<NewsPaperWithCategory[]>([]);
  const [papers, setPapers] = useState<NewsPaperWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [subCategoryTrends, setSubCategoryTrends] = useState<TrendData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'news' | 'papers'>('news');
  const [showSubCategoryTrend, setShowSubCategoryTrend] = useState<boolean>(false);
  const [selectedTrendCategory, setSelectedTrendCategory] = useState<string>('');
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area');

  useEffect(() => {
    // 데이터 로드
    const loadData = async () => {
      try {
        console.log('access_token', access_token);
        const newsData = access_token ? await fetchNews() : await fetchAllNews();
        const papersData = access_token ? await fetchPapers() : await fetchAllPapers();
        const categoriesData = await fetchCategories();
        const trendsData = await fetchTrends();
        const subCategoryTrendsData = await fetchSubCategoryTrends();

        setNews(
          newsData.map((response) => {
            return {
              ...response.newspaper,
              category: response.categories || [],
            };
          }) as NewsPaperWithCategory[],
        );
        setPapers(
          papersData.map((response) => {
            return {
              ...response.newspaper,
              category: response.categories || [],
            };
          }) as NewsPaperWithCategory[],
        );
        setCategories(categoriesData);
        setTrends(trendsData);
        setSubCategoryTrends(subCategoryTrendsData);

        // 검색 결과에 대한 토스트 알림
        if (selectedCategory || searchKeyword) {
          const totalResults = activeTab === 'news' ? newsData.length : papersData.length;
          toast.success(`${totalResults}개의 ${activeTab === 'news' ? '뉴스' : '논문'}를 찾았습니다.`, {
            duration: 2000,
            position: 'bottom-center',
          });
        }
      } catch (error) {
        console.error('데이터 로드 중 오류 발생:', error);
        toast.error('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    loadData();
  }, [selectedCategory, searchKeyword, activeTab, access_token]);

  // 특정 카테고리의 서브 카테고리 트렌드 데이터 로드
  useEffect(() => {
    if (showSubCategoryTrend && selectedTrendCategory) {
      const loadSubCategoryTrends = async () => {
        try {
          const data = await fetchSubCategoryTrendsByCategory(selectedTrendCategory);
          setSubCategoryTrends(data);
        } catch (error) {
          console.error('서브 카테고리 트렌드 데이터 로드 중 오류 발생:', error);
        }
      };

      loadSubCategoryTrends();
    }
  }, [showSubCategoryTrend, selectedTrendCategory]);

  // 트렌드 데이터 변환
  const getChartData = () => {
    const sourceData = showSubCategoryTrend ? subCategoryTrends : trends;

    return sourceData.reduce((acc: Array<{ date: string; [key: string]: number | string }>, curr) => {
      const existingDate = acc.find((item) => item.date === curr.date);
      if (existingDate) {
        existingDate[curr.keyword] = curr.count;
      } else {
        const newItem: { date: string; [key: string]: number | string } = { date: curr.date };
        newItem[curr.keyword] = curr.count;
        acc.push(newItem);
      }
      return acc;
    }, []);
  };

  const chartData = getChartData();

  // 키워드 목록 추출
  const getKeywordList = () => {
    const sourceData = showSubCategoryTrend ? subCategoryTrends : trends;
    return [...new Set(sourceData.map((trend) => trend.keyword))];
  };

  const keywordList = getKeywordList();

  // 차트 색상 생성 함수
  const getChartColor = (index: number) => {
    const colors = [
      '#8884d8',
      '#82ca9d',
      '#ffc658',
      '#ff8042',
      '#0088fe',
      '#00c49f',
      '#ffbb28',
      '#ff8042',
      '#a4de6c',
      '#d0ed57',
    ];
    return colors[index % colors.length];
  };

  // 그라데이션 정의
  const gradients = keywordList.map((keyword, index) => ({
    id: `color${index}`,
    color: getChartColor(index),
  }));

  // 차트 렌더링 함수
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="date" tick={{ fill: '#666' }} axisLine={{ stroke: '#ccc' }} />
            <YAxis tick={{ fill: '#666' }} axisLine={{ stroke: '#ccc' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                border: 'none',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" />
            {keywordList.map((keyword, index) => (
              <Line
                key={keyword}
                type="monotone"
                dataKey={keyword}
                stroke={getChartColor(index)}
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart data={chartData}>
            <defs>
              {gradients.map((gradient) => (
                <linearGradient key={gradient.id} id={gradient.id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={gradient.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={gradient.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="date" tick={{ fill: '#666' }} axisLine={{ stroke: '#ccc' }} />
            <YAxis tick={{ fill: '#666' }} axisLine={{ stroke: '#ccc' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                border: 'none',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" />
            {keywordList.map((keyword, index) => (
              <Area
                key={keyword}
                type="monotone"
                dataKey={keyword}
                stroke={getChartColor(index)}
                fillOpacity={1}
                fill={`url(#color${index})`}
              />
            ))}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="date" tick={{ fill: '#666' }} axisLine={{ stroke: '#ccc' }} />
            <YAxis tick={{ fill: '#666' }} axisLine={{ stroke: '#ccc' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                border: 'none',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" />
            {keywordList.map((keyword, index) => (
              <Bar key={keyword} dataKey={keyword} fill={getChartColor(index)} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        );

      default:
        return null;
    }
  };

  // 뉴스/논문 카드 렌더링
  const renderNewsPaperCard = (item: NewsPaperWithCategory) => {
    return (
      <Link href={`/news-detail?id=${item.id}&type=${item.type}`} key={item.title}>
        <div key={item.title} className="bg-white rounded-lg shadow-md p-6 mb-4 hover:bg-gray-50">
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {item.category ? item.category.join(', ') : '미분류'}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              {item.source} | {item.date}
            </span>
          </div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
          </div>
          <p className="text-gray-600 mb-4">{item.summary}</p>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <span className="font-medium">{item.source}</span>
              {item.type === 'paper' && <span className="ml-2">- {item.author}</span>}
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                자세히 보기
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-600 mt-2">최신 뉴스와 논문을 확인하고 트렌드를 분석하세요.</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="키워드 검색..."
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">모든 카테고리</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* 탭 버튼 */}
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'news' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('news')}
            >
              <div className="flex items-center">
                <Newspaper className="h-5 w-5 mr-2" />
                뉴스
              </div>
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'papers'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('papers')}
            >
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                논문
              </div>
            </button>
          </div>

          {/* 뉴스 목록 */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              {news.length > 0 ? (
                news.map(renderNewsPaperCard)
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <p className="text-gray-500">검색 결과가 없습니다.</p>
                </div>
              )}
            </div>
          )}

          {/* 논문 목록 */}
          {activeTab === 'papers' && (
            <div className="space-y-6">
              {papers.length > 0 ? (
                papers.map(renderNewsPaperCard)
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <p className="text-gray-500">검색 결과가 없습니다.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 트렌드 분석: 모든 산업에 대한 트렌드를 보여준다 */}
        <div className="space-y-8">
          {/* 트렌드 분석 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                트렌드 분석
              </h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-gray-100 rounded-full p-1">
                  <button
                    className={`flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      !showSubCategoryTrend ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                    } transition-all duration-200`}
                    onClick={() => setShowSubCategoryTrend(false)}
                  >
                    카테고리
                  </button>
                  <button
                    className={`flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      showSubCategoryTrend ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                    } transition-all duration-200`}
                    onClick={() => setShowSubCategoryTrend(true)}
                  >
                    서브 카테고리
                  </button>
                </div>
                <div className="relative group">
                  <button className="p-1 rounded-md hover:bg-gray-100">
                    <BarChart2 className="h-5 w-5 text-gray-500" />
                  </button>
                  <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
                    <div className="py-1">
                      <button
                        className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                          chartType === 'area' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setChartType('area')}
                      >
                        <Activity className="h-4 w-4 mr-2" />
                        영역 차트
                      </button>
                      <button
                        className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                          chartType === 'line' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setChartType('line')}
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />선 차트
                      </button>
                      <button
                        className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                          chartType === 'bar' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setChartType('bar')}
                      >
                        <BarChart2 className="h-4 w-4 mr-2" />
                        막대 차트
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showSubCategoryTrend && (
              <div className="mb-4">
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={selectedTrendCategory}
                  onChange={(e) => setSelectedTrendCategory(e.target.value)}
                >
                  <option value="">카테고리 선택</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart() || (
                  <div className="h-full w-full flex items-center justify-center">No data available</div>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* 하이라이트: 산업에서 조회수가 가장 많은 논문 AND 브리핑 설정에서 선택한 산업 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">산업별 뉴스 하이라이트</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-medium text-gray-900">기술 산업</h3>
                <p className="text-sm text-gray-600">
                  인공지능 기술의 발전으로 자동화 시스템이 급속도로 확산되고 있습니다.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-medium text-gray-900">금융 산업</h3>
                <p className="text-sm text-gray-600">블록체인 기술을 활용한 새로운 금융 서비스가 등장하고 있습니다.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="font-medium text-gray-900">의료 산업</h3>
                <p className="text-sm text-gray-600">
                  바이오 기술의 혁신으로 개인 맞춤형 의료 서비스가 확대되고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
