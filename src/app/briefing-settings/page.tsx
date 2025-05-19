'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/type';
import { fetchCategories, fetchCategoryToggle, fetchSelectedCategories } from '@/app/api/newsApi';
import { Check, ChevronRight, ChevronDown, Mail, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BriefingSettings() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [emailNotification, setEmailNotification] = useState<boolean>(true);
  const [kakaoNotification, setKakaoNotification] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<'news' | 'paper'>('news');
  const [briefingFrequency, setBriefingFrequency] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [selectedTime, setSelectedTime] = useState<string>('09:00');
  const [selectedDays, setSelectedDays] = useState<string>('월');
  const [selectedDate, setSelectedDate] = useState<number>(1);
  const [email, setEmail] = useState<string>('user@example.com');
  const [kakao, setKakao] = useState<string>('kakaoid');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        // 기본 선택된 서브 카테고리
        const selectedSubCategories = await fetchSelectedCategories();
        setSelectedSubCategories(selectedSubCategories);
        // 기본 선택된 카테고리 확장
        setExpandedCategories(['ARTIFICIAL_INTELLIGENCE_ROBOTICS']);
      } catch (error) {
        console.error('카테고리 로드 중 오류 발생:', error);
        toast.error('카테고리 로드 중 오류가 발생했습니다.');
      }
    };

    loadCategories();
  }, []);

  // 카테고리에 속한 서브 카테고리 중 하나라도 선택되어 있는지 확인하는 함수
  const hasSelectedSubCategories = (category: Category) => {
    if (!category.subcategories) return false;

    return category.subcategories.some((subCategory) => selectedSubCategories.includes(subCategory.id));
  };

  const handleCategoryToggle = (categoryId: string) => {
    // 확장된 카테고리 목록 복사
    const updatedExpandedCategories = [...expandedCategories];

    if (expandedCategories.includes(categoryId)) {
      // 이미 확장된 카테고리라면 제거 (닫기)
      const index = updatedExpandedCategories.indexOf(categoryId);
      updatedExpandedCategories.splice(index, 1);
    } else {
      // 확장되지 않은 카테고리라면 추가 (열기)
      updatedExpandedCategories.push(categoryId);
    }

    // 서브 카테고리가 선택된 카테고리들은 항상 확장 상태 유지
    categories.forEach((category) => {
      if (hasSelectedSubCategories(category) && !updatedExpandedCategories.includes(category.id)) {
        updatedExpandedCategories.push(category.id);
      }
    });

    setExpandedCategories(updatedExpandedCategories);
  };

  const handleSubCategoryToggle = async (subCategoryName: string, categoryName: string, subCategoryId: string) => {
    await fetchCategoryToggle(subCategoryId).then((res) => {
      console.log('response', res);
    });
    if (selectedSubCategories.includes(subCategoryId)) {
      setSelectedSubCategories(selectedSubCategories.filter((cat) => cat !== subCategoryId));
      toast.success(`${subCategoryName} 서브 카테고리가 제거되었습니다.`, {
        duration: 2000,
        position: 'bottom-center',
      });

      // 해당 카테고리의 모든 서브 카테고리가 선택 해제되었는지 확인
      const category = categories.find((c) => c.id === categoryName);
      if (category && category.subcategories) {
        const stillHasSelected = category.subcategories.some(
          (subCat) => subCat.id !== subCategoryName && selectedSubCategories.includes(subCat.id),
        );

        // 모든 서브 카테고리가 선택 해제되었다면 확장 상태에서 제거할 수 있음
        if (!stillHasSelected) {
          // 여기서는 자동으로 닫지 않고, 사용자가 직접 닫을 수 있게 함
        }
      }
    } else {
      setSelectedSubCategories([...selectedSubCategories, subCategoryId]);
      toast.success(`${subCategoryName} 서브 카테고리가 추가되었습니다.`, {
        duration: 2000,
        position: 'bottom-center',
      });

      // 서브 카테고리가 선택되면 해당 카테고리를 자동으로 확장 상태로 유지
      if (!expandedCategories.includes(categoryName)) {
        setExpandedCategories([...expandedCategories, categoryName]);
      }
    }
  };

  const handleSaveSettings = () => {
    // 실제로는 API를 통해 서버에 저장
    toast.success('설정이 저장되었습니다.', {
      icon: '👍',
      duration: 3000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  // 카테고리 필터링 함수
  const getFilteredCategories = () => {
    if (selectedTab === 'news') {
      return categories.filter((category) => category.name === 'IT 기업');
    } else {
      return categories.filter((category) => category.name === '컴퓨터 공학' || category.name === '전기/전자 공학');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">맞춤형 브리핑 설정</h1>
        <p className="text-gray-600 mt-2">관심 있는 산업 분야를 설정하고 알림 방식을 선택하세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* 관심 카테고리 설정 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">관심 산업 설정</h2>
            <p className="text-gray-600 mb-4">관심 있는 산업 분야와 세부 카테고리를 선택하세요.</p>

            {/* 뉴스/논문 탭 */}
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  selectedTab === 'news' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedTab('news')}
              >
                뉴스
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  selectedTab === 'paper' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedTab('paper')}
              >
                논문
              </button>
            </div>

            <div className="space-y-4">
              {getFilteredCategories().map((category) => {
                const isExpanded = expandedCategories.includes(category.id);

                return (
                  <div
                    key={category.id}
                    className="rounded-md overflow-hidden shadow-sm hover:shadow transition-shadow duration-200"
                  >
                    <div
                      className={`flex items-center p-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200`}
                      onClick={() => handleCategoryToggle(category.id)}
                    >
                      <div className="flex-1">
                        <div className="font-medium">{category.name}</div>
                      </div>
                      <div className="transition-transform duration-200">
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </div>

                    {/* 서브 카테고리 */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="bg-gray-50 p-3 pl-8">
                        <div className="grid grid-cols-2 gap-2">
                          {category.subcategories?.map((subCategory) => (
                            <div
                              key={subCategory.id}
                              className={`flex items-center p-2 rounded-md cursor-pointer border ${
                                selectedSubCategories.includes(subCategory.id)
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              } transition-all duration-200`}
                              onClick={() => handleSubCategoryToggle(subCategory.name, category.name, subCategory.id)}
                            >
                              <div className="flex-1">
                                <div className="font-medium text-sm">{subCategory.name}</div>
                              </div>
                              {selectedSubCategories.includes(subCategory.id) && (
                                <Check className="h-4 w-4 text-blue-500" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* 알림 설정 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">알림 설정</h2>
            <p className="text-gray-600 mb-4">브리핑을 받을 방법을 선택하세요.</p>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-2" />
                  <span>이메일 알림</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={emailNotification}
                    onChange={() => setEmailNotification(!emailNotification)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {emailNotification && (
                <div className="ml-7 transition-all duration-300 ease-in-out">
                  <input
                    type="email"
                    placeholder="이메일 주소"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-gray-500 mr-2" />
                  <span>카카오톡 알림</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={kakaoNotification}
                    onChange={() => setKakaoNotification(!kakaoNotification)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {kakaoNotification && (
                <div className="ml-7 transition-all duration-300 ease-in-out">
                  <input
                    type="text"
                    placeholder="카카오톡 주소"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={kakao}
                    onChange={(e) => setKakao(e.target.value)}
                  />
                </div>
              )}

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-500 mr-2" />
                  <span>Slack 알림</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={slackNotification}
                    onChange={() => setSlackNotification(!slackNotification)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div> */}
            </div>
          </div>

          {/* 브리핑 주기 설정 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">브리핑 주기 설정</h2>
            <p className="text-gray-600 mb-4">브리핑을 받을 주기를 선택하세요.</p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div
                className={`flex items-center justify-center p-3 rounded-md cursor-pointer transition-all duration-200 ${
                  briefingFrequency === 'daily' ? 'bg-blue-50 shadow-sm text-blue-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => setBriefingFrequency('daily')}
              >
                <span className="font-medium">매일</span>
              </div>
              <div
                className={`flex items-center justify-center p-3 rounded-md cursor-pointer transition-all duration-200 ${
                  briefingFrequency === 'weekly' ? 'bg-blue-50 shadow-sm text-blue-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => setBriefingFrequency('weekly')}
              >
                <span className="font-medium">주간</span>
              </div>
              <div
                className={`flex items-center justify-center p-3 rounded-md cursor-pointer transition-all duration-200 ${
                  briefingFrequency === 'monthly' ? 'bg-blue-50 shadow-sm text-blue-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => setBriefingFrequency('monthly')}
              >
                <span className="font-medium">월간</span>
              </div>
            </div>

            {/* 시간 선택 (모든 주기에 공통) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">시간 선택</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = i.toString().padStart(2, '0');
                  return (
                    <option key={hour} value={`${hour}:00`}>
                      {hour}시
                    </option>
                  );
                })}
              </select>
            </div>

            {/* 주간 선택 시 요일 선택 */}
            {briefingFrequency === 'weekly' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">요일 선택</label>
                <div className="grid grid-cols-7 gap-2">
                  {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                    <div
                      key={day}
                      className={`flex items-center justify-center p-2 rounded-md cursor-pointer transition-all duration-200 ${
                        selectedDays.includes(day)
                          ? 'bg-blue-50 text-blue-700 border border-blue-500'
                          : 'border border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => {
                        setSelectedDays(day);
                      }}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 월간 선택 시 날짜 선택 */}
            {briefingFrequency === 'monthly' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">날짜 선택</label>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                    <div
                      key={date}
                      className={`flex items-center justify-center p-2 rounded-md cursor-pointer transition-all duration-200 ${
                        selectedDate === date
                          ? 'bg-blue-50 text-blue-700 border border-blue-500'
                          : 'border border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedDate(date)}
                    >
                      {date}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 저장 버튼 */}
          <div className="flex justify-end">
            <Button
              className="px-6 py-6 text-base transition-all duration-200 hover:shadow-lg"
              onClick={handleSaveSettings}
            >
              설정 저장
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
