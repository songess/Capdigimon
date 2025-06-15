'use client';

import { NewsPaper } from '@/types/type';
import Link from 'next/link';

interface Props {
  items: NewsPaper[];
  type: string;
}

export default function RelatedItemsSection({ items, type }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">관련 컨텐츠 추천</h2>
      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
              <Link
                href={`/news-detail?id=${item.id}${item.type === 'paper' ? '&type=paper' : ''}`}
                className="block hover:bg-gray-50 p-2 -mx-2 rounded"
              >
                <h3 className="font-medium text-gray-900 hover:text-blue-600">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.summary}</p>
                <div className="text-xs text-gray-500 mt-1">{`${item.source} | ${
                  item.type === 'news' ? item.date.slice(0, 10) : item.date.slice(0, 4)
                }`}</div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">관련 {type === 'news' ? '기사' : '논문'}가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
