export interface ListingData {
  id: string;
  title: string;
  description: string;
  price: number;
  mileage: number;
  year: number;
  make: string;
  model: string;
  trim: string;
  photos: Photo[];
}

export interface Photo {
  id: string;
  url: string;
  type: PhotoType;
  quality: 'low' | 'medium' | 'high';
}

export type PhotoType = 
  | 'exterior-front'
  | 'exterior-rear'
  | 'exterior-side'
  | 'interior-dashboard'
  | 'interior-seats'
  | 'odometer'
  | 'tires'
  | 'engine'
  | 'other';

export interface ScoreData {
  overall: number;
  photos: number;
  title: number;
  description: number;
  price: number;
  leadLikelihood: number;
  confidence: 'low' | 'medium' | 'high';
}

export interface QuickWin {
  id: string;
  type: 'photos' | 'title' | 'description' | 'price';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  completed: boolean;
}

export interface ScoreExplanation {
  whatWeNoticed: string[];
  whyItMatters: string;
  whatToFix: string[];
  estimatedImpact: 'low' | 'medium' | 'high';
}

export interface MarketPriceData {
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  yourPrice: number;
  percentageFromMarket: number;
  suggestedPrice: number;
}

export interface TitleSuggestion {
  original: string;
  suggested: string;
  changes: { original: string; suggested: string }[];
}

export interface DescriptionAnalysis {
  trustGaps: string[];
  suggestedDescription: string;
}

export interface PhotoChecklist {
  angle: string;
  label: string;
  required: boolean;
  present: boolean;
}
