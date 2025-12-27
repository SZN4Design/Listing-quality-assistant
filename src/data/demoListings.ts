import { ListingData, ScoreData, QuickWin, MockListingData, MockListingExplanations } from '@/types/listing';
import mockListingsJSON from './mockListings.json';

export interface DemoListing {
  id: 'low' | 'medium' | 'high';
  label: string;
  listing: ListingData;
  scores: ScoreData;
  quickWins: QuickWin[];
  explanations: MockListingExplanations;
  rawData: MockListingData;
}

// Helper to convert mock JSON data to app format
function convertToListingData(mock: MockListingData): ListingData {
  const photoTypes = [
    'exterior-front',
    'exterior-side', 
    'exterior-rear',
    'interior-dashboard',
    'interior-seats',
    'odometer',
    'tires',
    'engine'
  ] as const;

  const photos = photoTypes.slice(0, Math.min(mock.photos_count, 8)).map((type, index) => ({
    id: String(index + 1),
    url: '/placeholder.svg',
    type: type,
    quality: mock.missing_photo_angles.includes(type) ? 'low' as const : 
             mock.scores.photos >= 80 ? 'high' as const : 'medium' as const
  }));

  return {
    id: mock.id,
    title: mock.title,
    description: mock.description,
    price: mock.price,
    mileage: mock.mileage_km,
    year: mock.year,
    make: mock.make,
    model: mock.model,
    trim: mock.trim,
    photos
  };
}

// Helper to generate quick wins from explanations
function generateQuickWins(mock: MockListingData): QuickWin[] {
  const wins: QuickWin[] = [];
  const categories = ['photos', 'title', 'description', 'price'] as const;
  
  categories.forEach((category, index) => {
    const explanation = mock.explanations[category];
    const score = mock.scores[category];
    
    // Only add quick wins for scores below 80
    if (score < 80 && explanation.issues_found.length > 0) {
      wins.push({
        id: String(index + 1),
        type: category,
        title: explanation.recommended_actions[0]?.split(' - ')[0] || `Improve ${category}`,
        description: explanation.issues_found[0],
        impact: score < 50 ? 'high' : score < 65 ? 'medium' : 'low',
        completed: false
      });
    }
  });

  return wins.slice(0, 4); // Max 4 quick wins
}

export const demoListings: DemoListing[] = [
  {
    id: 'low',
    label: 'Low Quality',
    listing: convertToListingData(mockListingsJSON.low_quality as MockListingData),
    scores: mockListingsJSON.low_quality.scores as ScoreData,
    quickWins: generateQuickWins(mockListingsJSON.low_quality as MockListingData),
    explanations: mockListingsJSON.low_quality.explanations as MockListingExplanations,
    rawData: mockListingsJSON.low_quality as MockListingData
  },
  {
    id: 'medium',
    label: 'Medium Quality',
    listing: convertToListingData(mockListingsJSON.medium_quality as MockListingData),
    scores: mockListingsJSON.medium_quality.scores as ScoreData,
    quickWins: generateQuickWins(mockListingsJSON.medium_quality as MockListingData),
    explanations: mockListingsJSON.medium_quality.explanations as MockListingExplanations,
    rawData: mockListingsJSON.medium_quality as MockListingData
  },
  {
    id: 'high',
    label: 'High Quality',
    listing: convertToListingData(mockListingsJSON.high_quality as MockListingData),
    scores: mockListingsJSON.high_quality.scores as ScoreData,
    quickWins: generateQuickWins(mockListingsJSON.high_quality as MockListingData),
    explanations: mockListingsJSON.high_quality.explanations as MockListingExplanations,
    rawData: mockListingsJSON.high_quality as MockListingData
  }
];

// Get demo by ID
export function getDemoById(id: 'low' | 'medium' | 'high'): DemoListing | undefined {
  return demoListings.find(demo => demo.id === id);
}
