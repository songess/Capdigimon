import React from 'react';
import { BookOpen } from 'lucide-react';
import { KeywordSearchResponse } from '@/types/type';

export default function EntityCard({ keyword, contexts }: KeywordSearchResponse) {
  return (
    <div className={`p-4 rounded-lg border bg-yellow-50 border-yellow-200`}>
      <div className="flex items-center mb-3">
        <BookOpen className="h-5 w-5 text-yellow-500" />
        <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded bg-yellow-100 text-yellow-800`}>키워드</span>
      </div>

      <h3 className="font-medium text-lg mb-2">{keyword}</h3>
      <p className="text-gray-700 text-sm">{contexts}</p>
    </div>
  );
}
