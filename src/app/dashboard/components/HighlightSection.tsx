interface HighlightSectionProps {
  highlights: { title: string; summary: string }[];
}

export default function HighlightSection({ highlights }: HighlightSectionProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">산업별 뉴스 하이라이트</h2>
      <div className="space-y-4">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className={`border-l-4 ${
              index === 0 ? 'border-blue-500' : index === 1 ? 'border-green-500' : 'border-purple-500'
            } pl-4 py-2`}
          >
            <h3 className="font-medium text-gray-900">{highlight.title}</h3>
            <p className="text-sm text-gray-600">{highlight.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
