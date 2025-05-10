// Entity types that can be extracted from content
export type EntityType = 'person' | 'place' | 'organization' | 'technology' | 'concept';

export interface Entity {
  type: EntityType;
  name: string;
  description: string;
}

// Mock function to extract important entities from content
// In a real application, this would use NLP or AI services
export function extractEntities(content: string, keywords: string[]): Entity[] {
  // This is a simplified mock implementation
  // In a real app, you would use NLP or AI services to extract entities
  
  const entities: Entity[] = [];
  
  // Use keywords as a starting point for entity extraction
  keywords.forEach(keyword => {
    if (content.toLowerCase().includes(keyword.toLowerCase())) {
      // Determine entity type based on keyword patterns
      // This is very simplified - real implementation would use NLP
      if (keyword.includes('AI') || keyword.includes('인공지능') || keyword.includes('머신러닝')) {
        entities.push({
          type: 'technology',
          name: keyword,
          description: `${keyword}은(는) 컴퓨터가 인간처럼 학습하고 문제를 해결하는 기술입니다.`
        });
      } else if (keyword.includes('블록체인') || keyword.includes('5G') || keyword.includes('IoT')) {
        entities.push({
          type: 'technology',
          name: keyword,
          description: `${keyword}은(는) 혁신적인 기술로 다양한 산업 분야에 적용되고 있습니다.`
        });
      } else if (keyword.includes('서울') || keyword.includes('뉴욕') || keyword.includes('실리콘밸리')) {
        entities.push({
          type: 'place',
          name: keyword,
          description: `${keyword}은(는) 중요한 경제 및 기술 중심지입니다.`
        });
      }
    }
  });
  
  // Add mock entities based on content analysis
  // In a real application, this would use more sophisticated NLP
  
  // Check for people names (very simplified)
  const peoplePatterns = [
    { regex: /(\w+) CEO/, type: 'person' },
    { regex: /(\w+) 대표/, type: 'person' },
    { regex: /(\w+) 박사/, type: 'person' },
    { regex: /(\w+) 교수/, type: 'person' },
  ];
  
  peoplePatterns.forEach(pattern => {
    const matches = content.match(pattern.regex);
    if (matches && matches[1]) {
      entities.push({
        type: 'person',
        name: matches[0],
        description: `${matches[0]}은(는) 해당 분야의 전문가입니다.`
      });
    }
  });
  
  // If no entities were found, create a default one based on the category
  if (entities.length === 0 && keywords.length > 0) {
    entities.push({
      type: 'concept',
      name: keywords[0],
      description: `${keywords[0]}은(는) 현대 기술 및 산업에서 중요한 개념입니다.`
    });
  }
  
  return entities.slice(0, 2); // Return at most 2 entities
}

// Get entity information with predefined templates based on entity type
export function getEntityInfo(entity: Entity): string {
  switch (entity.type) {
    case 'person':
      return `
        <div class="entity-info">
          <h3 class="font-medium text-lg">${entity.name}</h3>
          <p>${entity.description}</p>
          <p class="mt-2 text-sm">해당 인물은 관련 분야에서 중요한 역할을 하고 있으며, 
          다양한 혁신적인 아이디어와 프로젝트를 이끌고 있습니다.</p>
        </div>
      `;
    
    case 'place':
      return `
        <div class="entity-info">
          <h3 class="font-medium text-lg">${entity.name}</h3>
          <p>${entity.description}</p>
          <p class="mt-2 text-sm">이 지역은 독특한 특성과 중요성을 가지고 있으며, 
          관련 산업 및 기술 발전에 중요한 역할을 하고 있습니다.</p>
        </div>
      `;
    
    case 'organization':
      return `
        <div class="entity-info">
          <h3 class="font-medium text-lg">${entity.name}</h3>
          <p>${entity.description}</p>
          <p class="mt-2 text-sm">이 조직은 해당 분야에서 선도적인 위치를 차지하고 있으며, 
          혁신적인 제품과 서비스를 제공하고 있습니다.</p>
        </div>
      `;
    
    case 'technology':
      return `
        <div class="entity-info">
          <h3 class="font-medium text-lg">${entity.name}</h3>
          <p>${entity.description}</p>
          <p class="mt-2 text-sm">이 기술은 현재 급속도로 발전하고 있으며, 
          다양한 산업 분야에 혁신적인 변화를 가져오고 있습니다.</p>
        </div>
      `;
    
    case 'concept':
      return `
        <div class="entity-info">
          <h3 class="font-medium text-lg">${entity.name}</h3>
          <p>${entity.description}</p>
          <p class="mt-2 text-sm">이 개념은 현대 기술 및 산업 발전에 중요한 역할을 하고 있으며, 
          다양한 응용 분야에서 활용되고 있습니다.</p>
        </div>
      `;
    
    default:
      return `
        <div class="entity-info">
          <h3 class="font-medium text-lg">${entity.name}</h3>
          <p>${entity.description}</p>
        </div>
      `;
  }
}
