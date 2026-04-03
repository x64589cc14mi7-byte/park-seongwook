export interface Project {
  id: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  insight: string;
  insightEn: string;
  strategy: string;
  strategyEn: string;
  execution: string;
  executionEn: string;
  result: string;
  resultEn: string;
  reflection: string;
  reflectionEn: string;
  imageUrl: string;
  date: string;
}

export interface Experience {
  id: string;
  title: string;
  titleEn: string;
  role: string;
  roleEn: string;
  period: string;
  description: string;
  descriptionEn: string;
}

export interface Award {
  id: string;
  title: string;
  titleEn: string;
  host: string;
  hostEn: string;
  year: string;
  description: string;
  descriptionEn: string;
}

export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  titleEn: string;
}
