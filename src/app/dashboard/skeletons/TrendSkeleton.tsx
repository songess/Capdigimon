export default function TrendSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 bg-gray-200 rounded w-48"></div>
        <div className="flex space-x-2">
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-8"></div>
        </div>
      </div>
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>
  );
}
