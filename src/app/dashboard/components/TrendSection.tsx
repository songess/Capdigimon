'use client';

import { useState } from 'react';
import { TrendData, Category } from '@/types/type';
import { TrendingUp, BarChart2, Activity } from 'lucide-react';
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

interface TrendSectionProps {
  trends: TrendData[];
  categories: Category[];
}

export default function TrendSection({ trends }: TrendSectionProps) {
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area');

  const getChartData = () => {
    const sourceData = trends;

    return sourceData.reduce((acc: Array<{ date: string; [key: string]: number | string }>, curr) => {
      const existingDate = acc.find((item) => item.date === curr.record_date);
      if (existingDate) {
        existingDate[curr.group_category] = curr.hits_sum;
      } else {
        const newItem: { date: string; [key: string]: number | string } = { date: curr.record_date };
        newItem[curr.group_category] = curr.hits_sum;
        acc.push(newItem);
      }
      return acc;
    }, []);
  };

  const chartData = getChartData();

  const getKeywordList = () => {
    return [...new Set(trends.map((trend) => trend.group_category))];
  };

  const keywordList = getKeywordList();

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

  const gradients = keywordList.map((keyword, index) => ({
    id: `color${index}`,
    color: getChartColor(index),
  }));

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
          트렌드 분석
        </h2>
        <div className="flex items-center space-x-2">

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

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart() || <div className="h-full w-full flex items-center justify-center">No data available</div>}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
