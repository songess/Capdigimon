import { BookOpen, Newspaper } from 'lucide-react';

export default function NewsPaperSkeleton() {
  return (
    <>
      <div className="space-y-8">
        <div className="flex border-b border-gray-200">
          <button className="py-2 px-4 font-medium">
            <div className="flex items-center">
              <Newspaper className="h-5 w-5 mr-2" />
              뉴스
            </div>
          </button>
          <button className="py-2 px-4 font-medium">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              논문
            </div>
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 animate-pulse">
          <div className="mb-4">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="flex justify-between items-start mb-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 animate-pulse">
          <div className="mb-4">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="flex justify-between items-start mb-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 animate-pulse">
          <div className="mb-4">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="flex justify-between items-start mb-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    </>
  );
}
