import { 
  ListingData, 
  ScoreData, 
  QuickWin, 
  MarketPriceData,
  TitleSuggestion,
  DescriptionAnalysis,
  PhotoChecklist,
  ScoreExplanation
} from '@/types/listing';

export const initialListing: ListingData = {
  id: '1',
  title: 'Nice truck for sale runs good',
  description: 'Good truck, runs and drives. Has some miles on it but still good. Call me for more info.',
  price: 28500,
  mileage: 87450,
  year: 2019,
  make: 'Ford',
  model: 'F-150',
  trim: 'XLT',
  photos: [
    { id: '1', url: '/placeholder.svg', type: 'exterior-front', quality: 'low' },
    { id: '2', url: '/placeholder.svg', type: 'exterior-side', quality: 'low' },
    { id: '3', url: '/placeholder.svg', type: 'exterior-rear', quality: 'medium' },
    { id: '4', url: '/placeholder.svg', type: 'other', quality: 'low' },
    { id: '5', url: '/placeholder.svg', type: 'other', quality: 'low' },
    { id: '6', url: '/placeholder.svg', type: 'other', quality: 'low' },
  ]
};

export const initialScores: ScoreData = {
  overall: 54,
  photos: 48,
  title: 62,
  description: 51,
  price: 56,
  leadLikelihood: 2.1,
  confidence: 'medium'
};

export const improvedScores: ScoreData = {
  overall: 82,
  photos: 85,
  title: 88,
  description: 79,
  price: 76,
  leadLikelihood: 4.7,
  confidence: 'high'
};

export const initialQuickWins: QuickWin[] = [
  {
    id: '1',
    type: 'photos',
    title: 'Add interior photos',
    description: 'Buyers want to see dashboard, seats, and interior condition',
    impact: 'high',
    completed: false
  },
  {
    id: '2',
    type: 'title',
    title: 'Clarify trim in title',
    description: 'Include XLT trim level to attract serious buyers',
    impact: 'medium',
    completed: false
  },
  {
    id: '3',
    type: 'price',
    title: 'Adjust price closer to market',
    description: 'Your price is 7% above similar listings',
    impact: 'high',
    completed: false
  }
];

export const scoreExplanations: Record<string, ScoreExplanation> = {
  photos: {
    whatWeNoticed: [
      'Missing interior photos (dashboard, seats)',
      'No odometer or tire condition shots',
      'Some images appear dark or blurry',
      'Missing rear ¾ view angle'
    ],
    whyItMatters: 'Listings with 10+ quality photos receive 2.5x more inquiries on average. Interior photos are the #2 most viewed images after the main exterior shot.',
    whatToFix: [
      'Add clear interior dashboard photo',
      'Include seats and cargo area shots',
      'Take odometer and tire condition photos',
      'Retake exterior shots in better lighting'
    ],
    estimatedImpact: 'high'
  },
  title: {
    whatWeNoticed: [
      'Missing year, make, model format',
      'No trim level specified (XLT)',
      'Generic language ("nice", "good")',
      'No key features highlighted'
    ],
    whyItMatters: 'Titles with complete year/make/model/trim get 40% more clicks in search results. Buyers filter by trim level.',
    whatToFix: [
      'Start with year make model trim',
      'Include 1-2 key features (crew cab, 4x4)',
      'Remove vague descriptors',
      'Keep under 60 characters'
    ],
    estimatedImpact: 'medium'
  },
  description: {
    whatWeNoticed: [
      'No vehicle condition details',
      'Missing service/maintenance history',
      'No features or options listed',
      'No call-to-action for buyers'
    ],
    whyItMatters: 'Detailed descriptions build trust. Listings mentioning service history see 35% higher contact rates.',
    whatToFix: [
      'Add condition notes (interior, exterior)',
      'Mention recent maintenance or repairs',
      'List key features and options',
      'Include financing availability or trade info'
    ],
    estimatedImpact: 'high'
  },
  price: {
    whatWeNoticed: [
      'Priced 7% above market average',
      'Similar vehicles selling for $26,500-$27,800',
      'May deter price-sensitive buyers',
      'Could extend time on market'
    ],
    whyItMatters: 'Competitively priced listings sell 2x faster. Buyers compare 8+ listings before contacting a dealer.',
    whatToFix: [
      'Consider adjusting to $26,900-$27,500',
      'Or highlight premium features to justify price',
      'Add "price reduced" tag if lowering'
    ],
    estimatedImpact: 'high'
  }
};

export const marketPriceData: MarketPriceData = {
  minPrice: 24500,
  maxPrice: 29500,
  averagePrice: 26800,
  yourPrice: 28500,
  percentageFromMarket: 7,
  suggestedPrice: 26900
};

export const titleSuggestion: TitleSuggestion = {
  original: 'Nice truck for sale runs good',
  suggested: '2019 Ford F-150 XLT Crew Cab 4x4 - Well Maintained',
  changes: [
    { original: 'Nice truck', suggested: '2019 Ford F-150 XLT' },
    { original: 'for sale', suggested: 'Crew Cab 4x4' },
    { original: 'runs good', suggested: 'Well Maintained' }
  ]
};

export const descriptionAnalysis: DescriptionAnalysis = {
  trustGaps: [
    'Missing condition notes',
    'No service history mentioned',
    'No specific features listed',
    'No call-to-action'
  ],
  suggestedDescription: `2019 Ford F-150 XLT Crew Cab 4x4 with 87,450 miles in excellent condition.

**Highlights:**
• 5.0L V8 Engine - Proven reliability
• 4x4 with electronic shift-on-the-fly
• SYNC 3 with Apple CarPlay/Android Auto
• Spray-in bedliner included

**Condition:**
Clean interior with no rips or stains. Exterior has minor wear consistent with use. Recent oil change and tire rotation completed.

**Included:**
• 2 keys and all original manuals
• Clean vehicle history report available

Ready for immediate delivery. Financing available with competitive rates. Trade-ins welcome!

Contact us today to schedule a test drive.`
};

export const photoChecklist: PhotoChecklist[] = [
  { angle: 'exterior-front', label: 'Front ¾ view', required: true, present: true },
  { angle: 'exterior-rear', label: 'Rear ¾ view', required: true, present: false },
  { angle: 'exterior-side', label: 'Side profile', required: true, present: true },
  { angle: 'interior-dashboard', label: 'Interior dashboard', required: true, present: false },
  { angle: 'interior-seats', label: 'Front seats', required: true, present: false },
  { angle: 'odometer', label: 'Odometer reading', required: true, present: false },
  { angle: 'tires', label: 'Tire condition', required: false, present: false },
  { angle: 'engine', label: 'Engine bay', required: false, present: false }
];

export const improvedListing: ListingData = {
  id: '1',
  title: '2019 Ford F-150 XLT Crew Cab 4x4 - Well Maintained',
  description: descriptionAnalysis.suggestedDescription,
  price: 26900,
  mileage: 87450,
  year: 2019,
  make: 'Ford',
  model: 'F-150',
  trim: 'XLT',
  photos: [
    { id: '1', url: '/placeholder.svg', type: 'exterior-front', quality: 'high' },
    { id: '2', url: '/placeholder.svg', type: 'exterior-side', quality: 'high' },
    { id: '3', url: '/placeholder.svg', type: 'exterior-rear', quality: 'high' },
    { id: '4', url: '/placeholder.svg', type: 'interior-dashboard', quality: 'high' },
    { id: '5', url: '/placeholder.svg', type: 'interior-seats', quality: 'high' },
    { id: '6', url: '/placeholder.svg', type: 'odometer', quality: 'high' },
  ]
};
