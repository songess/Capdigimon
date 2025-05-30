'use client';

import { NewsPaper } from '@/types/type';
import { ExternalLink, Share2, Bookmark } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  item: NewsPaper;
}

export default function NewsDetailSection({ item }: Props) {
  const [bookmarked, setBookmarked] = useState(false);
  const isNews = item.type === 'news';

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(bookmarked ? '북마크가 해제되었습니다.' : '북마크에 추가되었습니다.', { duration: 2000 });
  };

  return (
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
  );
}
