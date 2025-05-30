'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { NewsPaper } from '@/types/type';
import { fetchAllNews, fetchAllPapers, fetchKeywordSearch } from '@/app/api/newsApi';
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

  const [item, setItem] = useState<NewsPaper | null>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [contexts, setContexts] = useState<string>('');
  const [relatedItems, setRelatedItems] = useState<NewsPaper[]>([
    {
      id: 1,
      title: '딥러닝을 활용한 추천 시스템 연구',
      summary: '이 논문은 딥러닝 기술을 활용하여 추천 시스템의 성능을 향상시키는 방법을 탐구합니다.',
      date: '2023-05-10',
      source: 'AI Research Journal',
      hits: 150,
      contents: '딥러닝을 활용한 추천 시스템의 다양한 아키텍처와 그 정확도에 미치는 영향을 논의합니다.',
      author: '홍길동, 김철수',
      link: 'https://example.com/paper1',
      type: 'paper',
    },
    {
      id: 2,
      title: '신경망 기반의 협업 필터링',
      summary: '전통적인 방법에 비해 신경망을 활용한 협업 필터링의 장점을 소개합니다.',
      date: '2022-11-15',
      source: 'Machine Learning Conference',
      hits: 120,
      contents: '신경망을 활용한 협업 필터링 접근법을 소개하며, 전통적인 방법에 비해 상당한 개선을 보여줍니다.',
      author: '이영희, 박민수',
      link: 'https://example.com/paper2',
      type: 'paper',
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (!id) return;

        if (type === 'news') {
          // 뉴스 데이터 가져오기
          const newsData = await fetchAllNews();
          const selectedNews = newsData.find((news) => news.newspaper.id === Number(id));
          if (selectedNews) {
            setItem(selectedNews.newspaper);
            const keywordData = await fetchKeywordSearch(selectedNews.newspaper.contents);
            setKeyword(keywordData.keyword);
            setContexts(keywordData.contexts);

            // 관련 뉴스 가져오기 (같은 카테고리의 다른 뉴스)
            const related = newsData
              .filter(
                (news) =>
                  news.newspaper.id !== Number(id) &&
                  news.categories.some((cat) => selectedNews.categories.includes(cat)),
              )
              .map((news) => news.newspaper)
              .slice(0, 3);
            if (related.length > 0) {
              setRelatedItems(related);
            }
          }
        } else {
          // 논문 데이터 가져오기
          const papersData = await fetchAllPapers();
          const selectedPaper = papersData.find((paper) => paper.newspaper.id === Number(id));
          if (selectedPaper) {
            setItem(selectedPaper.newspaper);
            const keywordData = await fetchKeywordSearch(selectedPaper.newspaper.contents);
            setKeyword(keywordData.keyword);
            setContexts(keywordData.contexts);

            // 관련 논문 가져오기 (같은 카테고리의 다른 논문)
            const related = papersData
              .filter(
                (paper) =>
                  paper.newspaper.id !== Number(id) &&
                  paper.categories.some((cat) => selectedPaper.categories.includes(cat)),
              )
              .map((paper) => paper.newspaper)
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
    toast.success(bookmarked ? '북마크가 해제되었습니다.' : '북마크에 추가되었습니다.', { duration: 2000 });
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
  const isNews = item.type === 'news';

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
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                    isNews ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}
                >
                  {isNews ? '뉴스' : '논문'}
                </span>
                <span className="ml-2 text-sm text-gray-500">{`${item.source} | ${item.date.slice(0, 10)}`}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  className={`p-1.5 rounded-full ${
                    bookmarked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                  } hover:bg-gray-200`}
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
                      duration: 2000,
                    });
                  }}
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h1>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">{item.summary}</p>
              <p className="text-gray-800">{item.contents}</p>
              {!isNews && (
                <div className="mt-4">
                  <span className="font-semibold">저자:</span> {item.author}
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <a
                href={item.link}
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
          <EntityCard keyword={keyword} contexts={contexts} />
          {/* AI 추천 관련 기사/논문 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">AI 추천 관련 {isNews ? '기사' : '논문'}</h2>
            <div className="space-y-4">
              {relatedItems.length > 0 ? (
                relatedItems.map((related) => (
                  <div key={related.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <Link
                      href={`/news-detail?id=${related.id}${related.type === 'paper' ? '&type=paper' : ''}`}
                      className="block hover:bg-gray-50 p-2 -mx-2 rounded"
                    >
                      <h3 className="font-medium text-gray-900 hover:text-blue-600">{related.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{related.summary}</p>
                      <div className="text-xs text-gray-500 mt-1">{`${related.source} | ${related.date.slice(
                        0,
                        10,
                      )}`}</div>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">관련 {isNews ? '기사' : '논문'}가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 메인 컴포넌트에서 Suspense로 감싸기
export default function NewsDetail() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      }
    >
      <NewsDetailContent />
    </Suspense>
  );
}
