import { Project, Experience, Award, Media } from '../types';

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: '2030 보험 가입률 증대 캠페인',
    titleEn: '2030 Insurance Adoption Campaign',
    summary: 'MZ세대의 투자 성향을 분석하여 보험과 주식을 결합한 새로운 마케팅 전략 수립',
    summaryEn: 'Developing a new marketing strategy combining insurance and stocks by analyzing MZ generation investment trends',
    insight: '2030세대의 보험 가입률이 낮은 이유는 당장의 혜택보다 미래의 불확실성에 대한 투자를 선호하기 때문',
    insightEn: 'The low insurance adoption rate among the 2030 generation is due to their preference for investment over immediate benefits',
    strategy: '보험 상품을 단순 보장이 아닌 "내 자산을 지키는 투자"의 관점으로 재정의',
    strategyEn: 'Redefining insurance products as "investments to protect assets" rather than simple protection',
    execution: '보험+주식 결합 포인트 캠페인 및 숏폼 콘텐츠 제작',
    executionEn: 'Insurance+stock combined point campaign and short-form content production',
    result: '타겟 가입률 15% 상승, 캠페인 영상 조회수 50만회 달성',
    resultEn: '15% increase in target adoption rate, 500k views on campaign videos',
    reflection: '데이터 기반의 인사이트가 실제 실행력과 만났을 때의 폭발력을 경험함',
    reflectionEn: 'Experienced the explosive power when data-driven insights meet actual execution',
    imageUrl: 'https://picsum.photos/seed/marketing1/800/600',
    date: '2023.10'
  },
  {
    id: '2',
    title: '친환경 브랜드 리브랜딩 프로젝트',
    titleEn: 'Eco-friendly Brand Rebranding Project',
    summary: '지속 가능한 가치를 추구하는 브랜드의 정체성을 강화하고 팬덤 형성',
    summaryEn: 'Strengthening brand identity and building a fandom for a brand pursuing sustainable values',
    insight: '소비자들은 단순한 친환경 제품보다 브랜드의 진정성 있는 스토리에 반응함',
    insightEn: 'Consumers respond more to a brand\'s authentic story than simple eco-friendly products',
    strategy: '브랜드의 탄생 배경과 제작 과정을 투명하게 공개하는 스토리텔링 강화',
    strategyEn: 'Strengthening storytelling by transparently revealing the brand\'s background and production process',
    execution: '다큐멘터리 형식의 영상 제작 및 오프라인 팝업 스토어 기획',
    executionEn: 'Documentary-style video production and offline pop-up store planning',
    result: '브랜드 인지도 30% 증가, 재구매율 20% 상승',
    resultEn: '30% increase in brand awareness, 20% increase in repurchase rate',
    reflection: '브랜드의 진정성이 마케팅의 가장 강력한 무기임을 깨달음',
    reflectionEn: 'Realized that brand authenticity is the most powerful weapon in marketing',
    imageUrl: 'https://picsum.photos/seed/marketing2/800/600',
    date: '2023.05'
  }
];

const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: '1',
    title: '제 15회 대학생 마케팅 공모전',
    titleEn: '15th University Marketing Competition',
    role: '팀장 / 기획 총괄',
    roleEn: 'Team Leader / Planning Lead',
    period: '2023.07 - 2023.09',
    description: '시장 분석 및 전략 수립, 최종 발표 진행',
    descriptionEn: 'Conducted market analysis, strategy formulation, and final presentation'
  }
];

const INITIAL_AWARDS: Award[] = [
  {
    id: '1',
    title: '대한민국 마케팅 대상 최우수상',
    titleEn: 'Korea Marketing Awards - Grand Prize',
    host: '한국마케팅협회',
    hostEn: 'Korea Marketing Association',
    year: '2023',
    description: '혁신적인 MZ세대 타겟팅 전략으로 높은 평가를 받음',
    descriptionEn: 'Highly evaluated for innovative MZ generation targeting strategy'
  }
];

const INITIAL_MEDIA: Media[] = [
  {
    id: '1',
    type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: '낭만 숏폼 캠페인 #1',
    titleEn: 'Romantic Short-form Campaign #1'
  }
];

export const getProjects = (): Project[] => {
  const data = localStorage.getItem('projects');
  return data ? JSON.parse(data) : INITIAL_PROJECTS;
};

export const saveProjects = (projects: Project[]) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

export const getExperiences = (): Experience[] => {
  const data = localStorage.getItem('experiences');
  return data ? JSON.parse(data) : INITIAL_EXPERIENCES;
};

export const saveExperiences = (experiences: Experience[]) => {
  localStorage.setItem('experiences', JSON.stringify(experiences));
};

export const getAwards = (): Award[] => {
  const data = localStorage.getItem('awards');
  return data ? JSON.parse(data) : INITIAL_AWARDS;
};

export const saveAwards = (awards: Award[]) => {
  localStorage.setItem('awards', JSON.stringify(awards));
};

export const getMedia = (): Media[] => {
  const data = localStorage.getItem('media');
  return data ? JSON.parse(data) : INITIAL_MEDIA;
};

export const saveMedia = (media: Media[]) => {
  localStorage.setItem('media', JSON.stringify(media));
};
