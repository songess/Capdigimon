'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/type';
import {
  fetchCategories,
  fetchCategoryToggle,
  fetchSelectedCategories,
  fetchMyAlarm,
  patchAlarmEmailOn,
  patchAlarmFrequency,
  patchAlarmDayOfMonth,
  patchAlarmDayOfWeek,
  patchAlarmReceiveTime,
  patchChangeEmail,
} from '@/app/api/newsApi';
import { Check, ChevronRight, ChevronDown, Mail, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { dayOfMonthEnum, dayOfWeekEnum, receiveTimeEnum } from '@/types/type';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const dayMappingKorToEng: { [key: string]: dayOfWeekEnum } = {
  월: 'monday',
  화: 'tuesday',
  수: 'wednesday',
  목: 'thursday',
  금: 'friday',
  토: 'saturday',
  일: 'sunday',
};

const dayMappingEngToKor: { [key: string]: string } = {
  monday: '월',
  tuesday: '화',
  wednesday: '수',
  thursday: '목',
  friday: '금',
  saturday: '토',
  sunday: '일',
};

export default function BriefingSettings() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [emailNotification, setEmailNotification] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<'news' | 'paper'>('news');
  const [briefingFrequency, setBriefingFrequency] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [selectedTime, setSelectedTime] = useState<string>('09:00');
  const [selectedDays, setSelectedDays] = useState<string>('월');
  const [selectedDate, setSelectedDate] = useState<number>(1);
  const [email, setEmail] = useState<string>('please fill email');
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        const selectedSubCategories = await fetchSelectedCategories();
        setSelectedSubCategories(selectedSubCategories);
        setExpandedCategories(['ARTIFICIAL_INTELLIGENCE_ROBOTICS']);
      } catch (error) {
        console.error('카테고리 로드 중 오류 발생:', error);
        toast.error('카테고리 로드 중 오류가 발생했습니다.');
      }
    };

    const loadAlarmSettings = async () => {
      try {
        const alarmData = await fetchMyAlarm();
        console.log('alarmData', alarmData);
        setEmailNotification(alarmData.email_on);
        setBriefingFrequency(alarmData.frequency);
        setSelectedTime(alarmData.receive_time);
        setEmail(alarmData.email || 'please fill email');

        if (alarmData.frequency === 'weekly') {
          setSelectedDays(dayMappingEngToKor[alarmData.day_of_week]);
        } else if (alarmData.frequency === 'monthly') {
          setSelectedDate(alarmData.day_of_month);
        }
      } catch (error) {
        console.error('알림 설정 로드 중 오류 발생:', error);
        toast.error('알림 설정 로드 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
    loadAlarmSettings();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

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

  // 카테고리 필터링 함수
  const getFilteredCategories = () => {
    if (selectedTab === 'news') {
      return categories.filter((category) => category.name === 'IT 기업');
    } else {
      return categories.filter((category) => category.name === '컴퓨터 공학' || category.name === '전기/전자 공학');
    }
  };

  const handleEmailToggle = async () => {
    try {
      await patchAlarmEmailOn();
      setEmailNotification(!emailNotification);
      toast.success('이메일 알림 설정이 변경되었습니다.');
    } catch (error) {
      console.error('이메일 알림 설정 변경 중 오류 발생:', error);
      toast.error('이메일 알림 설정 변경 중 오류가 발생했습니다.');
    }
  };

  const handleEmailChange = async () => {
    try {
      await patchChangeEmail(email);
      setIsEditingEmail(false);
      toast.success('이메일이 변경되었습니다.');
    } catch (error) {
      console.error('이메일 변경 중 오류 발생:', error);
      toast.error('이메일 변경 중 오류가 발생했습니다.');
    }
  };

  const handleFrequencyChange = async (frequency: 'daily' | 'weekly' | 'monthly') => {
    try {
      await patchAlarmFrequency(frequency);
      setBriefingFrequency(frequency);
      toast.success('브리핑 주기가 변경되었습니다.');
    } catch (error) {
      console.error('브리핑 주기 변경 중 오류 발생:', error);
      toast.error('브리핑 주기 변경 중 오류가 발생했습니다.');
    }
  };

  const handleDayOfWeekChange = async (day: string) => {
    try {
      await patchAlarmDayOfWeek(dayMappingKorToEng[day]);
      setSelectedDays(day);
      toast.success('요일이 변경되었습니다.');
    } catch (error) {
      console.error('요일 변경 중 오류 발생:', error);
      toast.error('요일 변경 중 오류가 발생했습니다.');
    }
  };

  const handleDayOfMonthChange = async (date: number) => {
    try {
      await patchAlarmDayOfMonth(date as dayOfMonthEnum);
      setSelectedDate(date);
      toast.success('날짜가 변경되었습니다.');
    } catch (error) {
      console.error('날짜 변경 중 오류 발생:', error);
      toast.error('날짜 변경 중 오류가 발생했습니다.');
    }
  };

  const handleTimeChange = async (time: string) => {
    try {
      await patchAlarmReceiveTime(time as receiveTimeEnum);
      setSelectedTime(time);
      toast.success('시간이 변경되었습니다.');
    } catch (error) {
      console.error('시간 변경 중 오류 발생:', error);
      toast.error('시간 변경 중 오류가 발생했습니다.');
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
                IT 기업
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  selectedTab === 'paper' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedTab('paper')}
              >
                컴퓨터 및 전자공학
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
                    onChange={handleEmailToggle}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {emailNotification && (
                <div className="ml-7 transition-all duration-300 ease-in-out">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="이메일 주소"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isEditingEmail}
                    />
                    <Button
                      onClick={() => (isEditingEmail ? handleEmailChange() : setIsEditingEmail(true))}
                      className={`whitespace-nowrap ${
                        isEditingEmail
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                    >
                      {isEditingEmail ? '저장' : '변경'}
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-gray-500 mr-2" />
                  <span>Slack 알림 설정</span>
                </div>
              </div>

              <div className="ml-7 transition-all duration-300 ease-in-out">
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-gray-600">Newseeker Slack 팀에 참여하여 브리핑을 받아보세요.</p>
                  <Button
                    onClick={() =>
                      window.open(
                        'https://join.slack.com/t/newseeker/shared_invite/zt-361rfskgm-xhKyTeKH26FnWcLNS6CdhQ',
                        '_blank',
                      )
                    }
                    className="flex items-center gap-2 bg-[#4A154B] hover:bg-[#3a1039] text-white cursor-pointer"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523-2.521 2.528 2.528 0 0 1 2.523-2.52 2.528 2.528 0 0 1 2.521 2.52V2.522A2.528 2.528 0 0 1 17.688 0a2.528 2.528 0 0 1-2.521 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.521 2.522A2.528 2.528 0 0 1 15.165 24a2.528 2.528 0 0 1-2.522-2.522v-2.522h2.522zM15.165 17.688a2.528 2.528 0 0 1-2.522 2.523 2.528 2.528 0 0 1-2.521-2.523v-6.313a2.528 2.528 0 0 1 2.521-2.521 2.528 2.528 0 0 1 2.522 2.521v6.313z" />
                    </svg>
                    Newseeker Slack 팀 참여하기
                  </Button>
                </div>
              </div>
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
                onClick={() => handleFrequencyChange('daily')}
              >
                <span className="font-medium">매일</span>
              </div>
              <div
                className={`flex items-center justify-center p-3 rounded-md cursor-pointer transition-all duration-200 ${
                  briefingFrequency === 'weekly' ? 'bg-blue-50 shadow-sm text-blue-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleFrequencyChange('weekly')}
              >
                <span className="font-medium">주간</span>
              </div>
              <div
                className={`flex items-center justify-center p-3 rounded-md cursor-pointer transition-all duration-200 ${
                  briefingFrequency === 'monthly' ? 'bg-blue-50 shadow-sm text-blue-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleFrequencyChange('monthly')}
              >
                <span className="font-medium">월간</span>
              </div>
            </div>

            {/* 시간 선택 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">시간 선택</label>
              <select
                value={selectedTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = i.toString().padStart(2, '0');
                  return (
                    <option key={hour} value={`${hour}:00:00`}>
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
                      onClick={() => handleDayOfWeekChange(day)}
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
                      onClick={() => handleDayOfMonthChange(date)}
                    >
                      {date}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
