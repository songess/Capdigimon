'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { News, Paper } from '@/types/type';
import { fetchNews, fetchPapers } from '@/app/api/newsApi';
import { ArrowLeft, ExternalLink, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { extractEntities, Entity } from '@/utils/entityExtractor';
import EntityCard from '@/components/EntityCard';

// 검색 파라미터를 사용하는 컴포넌트
function NewsDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const type = searchParams.get('type') || 'news';
  
  const [item, setItem] = useState<News | Paper | null>(null);
  const [relatedItems, setRelatedItems] = useState<(News | Paper)[]>([
    {
      id: '1',
      title: '딥러닝을 활용한 추천 시스템 연구',
      description: '이 논문은 딥러닝 기술을 활용하여 추천 시스템의 성능을 향상시키는 방법을 탐구합니다.',
      publishedAt: '2023-05-10',
      abstract: '딥러닝을 활용한 추천 시스템의 다양한 아키텍처와 그 정확도에 미치는 영향을 논의합니다.',
      authors: ['홍길동', '김철수'],
      category: 'AI',
      url: 'https://example.com/paper1',
      keywords: ['딥러닝', '추천 시스템'],
    },
    {
      id: '2',
      title: '신경망 기반의 협업 필터링',
      description: '전통적인 방법에 비해 신경망을 활용한 협업 필터링의 장점을 소개합니다.',
      publishedAt: '2022-11-15',
      abstract: '신경망을 활용한 협업 필터링 접근법을 소개하며, 전통적인 방법에 비해 상당한 개선을 보여줍니다.',
      authors: ['이영희', '박민수'],
      category: 'AI',
      url: 'https://example.com/paper2',
      keywords: ['신경망', '협업 필터링'],
    },
    // {
    //   id: '3',
    //   title: '추천 시스템에서의 주의 메커니즘 적용',
    //   description: '사용자 선호도를 포착하는 데 있어 주의 메커니즘의 역할을 강조합니다.',
    //   publishedAt: '2024-02-20',
    //   abstract: '추천 시스템의 성능을 향상시키기 위해 주의 메커니즘을 적용하는 연구입니다.',
    //   authors: ['최지우', '강다니엘'],
    //   category: 'AI',
    //   url: 'https://example.com/paper3',
    //   keywords: ['주의 메커니즘', '추천 시스템'],
    // },
  ]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (!id) return;

        if (type === 'news') {
          // 뉴스 데이터 가져오기
          const newsData = await fetchNews();
          const selectedNews = newsData.find(news => news.id === id);
          if (selectedNews) {
            setItem(selectedNews);
            
            // 중요 엔티티 추출
            const extractedEntities = extractEntities(
              selectedNews.content + ' ' + selectedNews.description, 
              selectedNews.keywords
            );
            setEntities(extractedEntities);
            
            // 관련 뉴스 가져오기 (같은 카테고리의 다른 뉴스)
            const related = newsData
              .filter(news => news.id !== id && news.category === selectedNews.category)
              .slice(0, 3);
            if (related.length > 0) {
              setRelatedItems(related);
            }
          }
        } else {
          // 논문 데이터 가져오기
          const papersData = await fetchPapers();
          const selectedPaper = papersData.find(paper => paper.id === id);
          if (selectedPaper) {
            setItem(selectedPaper);
            
            // 중요 엔티티 추출
            const extractedEntities = extractEntities(
              selectedPaper.abstract, 
              selectedPaper.keywords
            );
            setEntities(extractedEntities);
            
            // 관련 논문 가져오기 (같은 카테고리의 다른 논문)
            const related = papersData
              .filter(paper => paper.id !== id && paper.category === selectedPaper.category)
              .slice(0, 3);
            if (related.length > 0) {
              setRelatedItems(related);
            }
          }
        }
      } catch (error) {
        console.error('데이터 로드 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, type]);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(
      bookmarked ? '북마크가 해제되었습니다.' : '북마크에 추가되었습니다.',
      { duration: 2000 }
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">콘텐츠를 찾을 수 없습니다</h1>
          <p className="text-gray-600 mb-6">요청하신 콘텐츠가 존재하지 않거나 삭제되었습니다.</p>
          <Link href="/dashboard">
            <Button>대시보드로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  // 뉴스 또는 논문 타입에 따라 다른 UI 렌더링
  const isNews = 'source' in item;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          대시보드로 돌아가기
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                  isNews ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {isNews ? (item as News).category : (item as Paper).category}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {isNews 
                    ? `${(item as News).source} | ${(item as News).publishedAt}`
                    : `${(item as Paper).publishedAt}`
                  }
                </span>
              </div>
              <div className="flex space-x-2">
                <button 
                  className={`p-1.5 rounded-full ${bookmarked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'} hover:bg-gray-200`}
                  onClick={handleBookmark}
                >
                  <Bookmark className="h-5 w-5" fill={bookmarked ? 'currentColor' : 'none'} />
                </button>
                <button 
                  className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('링크가 클립보드에 복사되었습니다.', {
                      icon: '🔗',
                      duration: 2000
                    });
                  }}
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h1>
            
            {isNews ? (
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">{(item as News).description}</p>
                <p className="text-gray-800">{(item as News).content}</p>
              </div>
            ) : (
              <div className="prose max-w-none">
                <div className="mb-4">
                  <span className="font-semibold">저자:</span> {(item as Paper).authors.join(', ')}
                </div>
                <h3 className="text-lg font-semibold mb-2">초록</h3>
                <p className="text-gray-800">{(item as Paper).abstract}</p>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-gray-200">
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                원문 보기
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* 중요 엔티티 정보 카드 */}
          {entities.length > 0 && (
            <div className="space-y-4">
              {entities.map((entity, index) => (
                <EntityCard key={index} entity={entity} />
              ))}
            </div>
          )}

          {/* AI 추천 관련 기사/논문 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">AI 추천 관련 {isNews ? '기사' : '논문'}</h2>
            <div className="space-y-4">
              {relatedItems.length > 0 ? (
                relatedItems.map((related) => (
                  <div key={related.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <Link 
                      href={`/news-detail?id=${related.id}${!isNews ? '&type=paper' : ''}`}
                      className="block hover:bg-gray-50 p-2 -mx-2 rounded"
                    >
                      <h3 className="font-medium text-gray-900 hover:text-blue-600">{related.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {isNews 
                          ? (related as News).description 
                          : (related as Paper).abstract
                        }
                      </p>
                      <div className="text-xs text-gray-500 mt-1">
                        {isNews 
                          ? `${(related as News).source} | ${(related as News).publishedAt}`
                          : `${(related as Paper).publishedAt}`
                        }
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">관련 {isNews ? '기사' : '논문'}가 없습니다.</p>
              )}
            </div>
          </div>

          {/* 키워드 */}
          {/* <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">키워드</h2>
            <div className="flex flex-wrap gap-2">
              {isNews 
                ? (item as News).keywords.map((keyword, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {keyword}
                    </span>
                  ))
                : (item as Paper).keywords.map((keyword, index) => (
                    <span key={index} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {keyword}
                    </span>
                  ))
              } 
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

// 메인 컴포넌트에서 Suspense로 감싸기
export default function NewsDetail() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    }>
      <NewsDetailContent />
    </Suspense>
  );
}
