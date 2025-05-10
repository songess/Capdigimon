import React from 'react';
import { Entity } from '@/utils/entityExtractor';
import { Info, MapPin, User, Building, Cpu, BookOpen } from 'lucide-react';

interface EntityCardProps {
  entity: Entity;
}

export default function EntityCard({ entity }: EntityCardProps) {
  // Get the appropriate icon based on entity type
  const getEntityIcon = () => {
    switch (entity.type) {
      case 'person':
        return <User className="h-5 w-5 text-blue-500" />;
      case 'place':
        return <MapPin className="h-5 w-5 text-green-500" />;
      case 'organization':
        return <Building className="h-5 w-5 text-purple-500" />;
      case 'technology':
        return <Cpu className="h-5 w-5 text-red-500" />;
      case 'concept':
        return <BookOpen className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get background color based on entity type
  const getBackgroundColor = () => {
    switch (entity.type) {
      case 'person':
        return 'bg-blue-50 border-blue-200';
      case 'place':
        return 'bg-green-50 border-green-200';
      case 'organization':
        return 'bg-purple-50 border-purple-200';
      case 'technology':
        return 'bg-red-50 border-red-200';
      case 'concept':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  // Get badge color based on entity type
  const getBadgeColor = () => {
    switch (entity.type) {
      case 'person':
        return 'bg-blue-100 text-blue-800';
      case 'place':
        return 'bg-green-100 text-green-800';
      case 'organization':
        return 'bg-purple-100 text-purple-800';
      case 'technology':
        return 'bg-red-100 text-red-800';
      case 'concept':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get Korean entity type name
  const getEntityTypeName = () => {
    switch (entity.type) {
      case 'person':
        return '인물';
      case 'place':
        return '장소';
      case 'organization':
        return '조직';
      case 'technology':
        return '기술';
      case 'concept':
        return '개념';
      default:
        return '정보';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getBackgroundColor()}`}>
      <div className="flex items-center mb-3">
        {getEntityIcon()}
        <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded ${getBadgeColor()}`}>
          {getEntityTypeName()}
        </span>
      </div>
      
      <h3 className="font-medium text-lg mb-2">{entity.name}</h3>
      <p className="text-gray-700 text-sm">{entity.description}</p>
      
      {entity.type === 'person' && (
        <p className="mt-2 text-sm text-gray-600">
          해당 인물은 관련 분야에서 중요한 역할을 하고 있으며, 
          다양한 혁신적인 아이디어와 프로젝트를 이끌고 있습니다.
        </p>
      )}
      
      {entity.type === 'place' && (
        <p className="mt-2 text-sm text-gray-600">
          이 지역은 독특한 특성과 중요성을 가지고 있으며, 
          관련 산업 및 기술 발전에 중요한 역할을 하고 있습니다.
        </p>
      )}
      
      {entity.type === 'organization' && (
        <p className="mt-2 text-sm text-gray-600">
          이 조직은 해당 분야에서 선도적인 위치를 차지하고 있으며, 
          혁신적인 제품과 서비스를 제공하고 있습니다.
        </p>
      )}
      
      {entity.type === 'technology' && (
        <p className="mt-2 text-sm text-gray-600">
          이 기술은 현재 급속도로 발전하고 있으며, 
          다양한 산업 분야에 혁신적인 변화를 가져오고 있습니다.
        </p>
      )}
      
      {entity.type === 'concept' && (
        <p className="mt-2 text-sm text-gray-600">
          이 개념은 현대 기술 및 산업 발전에 중요한 역할을 하고 있으며, 
          다양한 응용 분야에서 활용되고 있습니다.
        </p>
      )}
    </div>
  );
}
