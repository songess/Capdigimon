'use client';

import { useState } from 'react';
import { NewsPaper } from '@/types/type';
import { Newspaper, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { subCategoriesEngToKor } from '@/app/api/newsApi';
import { incrementNewsViewCount } from '@/app/api/newsApi';

interface NewsPaperWithCategory extends NewsPaper {
  category: string[];
}

interface NewsPaperSectionProps {
  news: NewsPaperWithCategory[];
  papers: NewsPaperWithCategory[];
}

export default function NewsPaperSection({ news, papers }: NewsPaperSectionProps) {
  const [activeTab, setActiveTab] = useState<'news' | 'papers'>('news');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleIncrementViewCount = (item: NewsPaperWithCategory) => {
    incrementNewsViewCount(item.id);
  };

  const renderNewsPaperCard = (item: NewsPaperWithCategory) => {
    const categoryKor = item.category.map((category) => subCategoriesEngToKor(category));
    return (
      <Link
        href={`/news-detail?id=${item.id}&type=${item.type}`}
        key={item.title}
        onClick={() => handleIncrementViewCount(item)}
      >
        <div key={item.title} className="bg-white rounded-lg shadow-md p-6 mb-4 hover:bg-gray-50">
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {item.category ? categoryKor.join(', ') : '미분류'}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              {item.source} | {item.type === 'news' ? item.date.slice(0, 10) : item.date.slice(0, 4)}
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
            <div className="flex justify-end ">
              <Button variant="outline" size="sm" className="hover:cursor-pointer">
                자세히 보기
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const getCurrentItems = (items: NewsPaperWithCategory[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const getTotalPages = (items: NewsPaperWithCategory[]) => {
    return Math.ceil(items.length / itemsPerPage);
  };

  const renderPagination = (totalPages: number) => {
    const pages = [];
    const currentGroup = Math.ceil(currentPage / 10);
    const startPage = (currentGroup - 1) * 10 + 1;
    const endPage = Math.min(currentGroup * 10, totalPages);

    // 이전 그룹 버튼
    if (currentGroup > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => setCurrentPage(startPage - 1)}
          className="px-3 py-1 mx-1 rounded bg-white text-gray-700 hover:bg-gray-100"
        >
          &lt;
        </button>,
      );
    }

    // 페이지 버튼들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>,
      );
    }

    // 다음 그룹 버튼
    if (currentGroup < Math.ceil(totalPages / 10)) {
      pages.push(
        <button
          key="next"
          onClick={() => setCurrentPage(endPage + 1)}
          className="px-3 py-1 mx-1 rounded bg-white text-gray-700 hover:bg-gray-100"
        >
          &gt;
        </button>,
      );
    }

    return pages;
  };

  return (
    <div className="space-y-8">
      <div className="flex border-b border-gray-200">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'news' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => {
            setActiveTab('news');
            setCurrentPage(1);
          }}
        >
          <div className="flex items-center">
            <Newspaper className="h-5 w-5 mr-2" />
            뉴스
          </div>
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'papers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => {
            setActiveTab('papers');
            setCurrentPage(1);
          }}
        >
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            논문
          </div>
        </button>
      </div>

      {activeTab === 'news' && (
        <div className="space-y-6">
          {news.length > 0 ? (
            <>
              {getCurrentItems(news).map(renderNewsPaperCard)}
              <div className="flex justify-center mt-8">{renderPagination(getTotalPages(news))}</div>
            </>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'papers' && (
        <div className="space-y-6">
          {papers.length > 0 ? (
            <>
              {getCurrentItems(papers).map(renderNewsPaperCard)}
              <div className="flex justify-center mt-8">{renderPagination(getTotalPages(papers))}</div>
            </>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
