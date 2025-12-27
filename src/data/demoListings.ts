import { ListingData, ScoreData, QuickWin } from '@/types/listing';

export interface DemoListing {
  id: 'low' | 'medium' | 'high';
  label: string;
  listing: ListingData;
  scores: ScoreData;
  quickWins: QuickWin[];
}

export const demoListings: DemoListing[] = [
  {
    id: 'low',
    label: 'Low Quality',
    listing: {
      id: 'demo-low',
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
    },
    scores: {
      overall: 38,
      photos: 32,
      title: 41,
      description: 35,
      price: 44,
      leadLikelihood: 1.2,
      confidence: 'low'
    },
    quickWins: [
      { id: '1', type: 'photos', title: 'Add interior photos', description: 'Missing dashboard, seats, and cargo area', impact: 'high', completed: false },
      { id: '2', type: 'title', title: 'Add year, make, model', description: 'Title lacks essential vehicle info', impact: 'high', completed: false },
      { id: '3', type: 'description', title: 'Add vehicle details', description: 'Description is too vague', impact: 'high', completed: false },
      { id: '4', type: 'price', title: 'Review pricing', description: 'Price appears above market', impact: 'medium', completed: false }
    ]
  },
  {
    id: 'medium',
    label: 'Medium Quality',
    listing: {
      id: 'demo-medium',
      title: '2019 Ford F-150 XLT - Good Condition',
      description: '2019 Ford F-150 XLT with 87k miles. Runs great, well maintained. 5.0L V8 engine. Clean title. Contact for test drive.',
      price: 27500,
      mileage: 87450,
      year: 2019,
      make: 'Ford',
      model: 'F-150',
      trim: 'XLT',
      photos: [
        { id: '1', url: '/placeholder.svg', type: 'exterior-front', quality: 'high' },
        { id: '2', url: '/placeholder.svg', type: 'exterior-side', quality: 'medium' },
        { id: '3', url: '/placeholder.svg', type: 'exterior-rear', quality: 'medium' },
        { id: '4', url: '/placeholder.svg', type: 'interior-dashboard', quality: 'medium' },
        { id: '5', url: '/placeholder.svg', type: 'other', quality: 'low' },
        { id: '6', url: '/placeholder.svg', type: 'other', quality: 'low' },
      ]
    },
    scores: {
      overall: 62,
      photos: 58,
      title: 72,
      description: 55,
      price: 64,
      leadLikelihood: 2.8,
      confidence: 'medium'
    },
    quickWins: [
      { id: '1', type: 'photos', title: 'Add more interior shots', description: 'Missing seats and cargo photos', impact: 'medium', completed: false },
      { id: '2', type: 'title', title: 'Add key features', description: 'Mention 4x4 or Crew Cab', impact: 'low', completed: false },
      { id: '3', type: 'description', title: 'Add service history', description: 'Buyers want maintenance details', impact: 'medium', completed: false }
    ]
  },
  {
    id: 'high',
    label: 'High Quality',
    listing: {
      id: 'demo-high',
      title: '2019 Ford F-150 XLT Crew Cab 4x4 - Well Maintained',
      description: `2019 Ford F-150 XLT Crew Cab 4x4 with 87,450 miles in excellent condition.

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

Contact us today to schedule a test drive.`,
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
    },
    scores: {
      overall: 88,
      photos: 92,
      title: 90,
      description: 85,
      price: 84,
      leadLikelihood: 5.2,
      confidence: 'high'
    },
    quickWins: [
      { id: '1', type: 'photos', title: 'Add tire condition photo', description: 'Optional but helpful for buyers', impact: 'low', completed: false }
    ]
  }
];
