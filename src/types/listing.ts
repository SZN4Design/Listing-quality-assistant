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

// New types for JSON mock data
export interface CategoryExplanation {
  issues_found: string[];
  why_it_matters: string;
  recommended_actions: string[];
}

export interface MockListingExplanations {
  photos: CategoryExplanation;
  title: CategoryExplanation;
  description: CategoryExplanation;
  price: CategoryExplanation;
}

export interface MockListingData {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  mileage_km: number;
  price: number;
  market_min: number;
  market_max: number;
  photos_count: number;
  missing_photo_angles: string[];
  title: string;
  description: string;
  listing_age_days: number;
  scores: ScoreData;
  explanations: MockListingExplanations;
}

export interface MockListingsJSON {
  low_quality: MockListingData;
  medium_quality: MockListingData;
  high_quality: MockListingData;
}
