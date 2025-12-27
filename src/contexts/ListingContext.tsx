import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  ListingData, 
  ScoreData, 
  QuickWin,
  MockListingExplanations
} from '@/types/listing';
import {
  initialListing,
  improvedListing,
  initialScores,
  improvedScores,
  initialQuickWins,
  scoreExplanations
} from '@/data/mockData';
import { DemoListing } from '@/data/demoListings';

type FixType = 'photos' | 'title' | 'description' | 'price';

// Default explanations matching the new structure
const defaultExplanations: MockListingExplanations = {
  photos: {
    issues_found: scoreExplanations.photos.whatWeNoticed,
    why_it_matters: scoreExplanations.photos.whyItMatters,
    recommended_actions: scoreExplanations.photos.whatToFix
  },
  title: {
    issues_found: scoreExplanations.title.whatWeNoticed,
    why_it_matters: scoreExplanations.title.whyItMatters,
    recommended_actions: scoreExplanations.title.whatToFix
  },
  description: {
    issues_found: scoreExplanations.description.whatWeNoticed,
    why_it_matters: scoreExplanations.description.whyItMatters,
    recommended_actions: scoreExplanations.description.whatToFix
  },
  price: {
    issues_found: scoreExplanations.price.whatWeNoticed,
    why_it_matters: scoreExplanations.price.whyItMatters,
    recommended_actions: scoreExplanations.price.whatToFix
  }
};

interface ListingContextType {
  listing: ListingData;
  scores: ScoreData;
  quickWins: QuickWin[];
  isFullyImproved: boolean;
  completedFixes: Set<FixType>;
  explanations: MockListingExplanations;
  applyFix: (type: FixType) => void;
  resetListing: () => void;
  loadDemoListing: (demo: DemoListing) => void;
}

const ListingContext = createContext<ListingContextType | undefined>(undefined);

// Incremental score improvements for each fix type
const scoreIncrements: Record<FixType, Partial<ScoreData>> = {
  photos: { photos: 85, overall: 62, leadLikelihood: 2.8 },
  title: { title: 88, overall: 68, leadLikelihood: 3.2 },
  description: { description: 79, overall: 74, leadLikelihood: 3.9 },
  price: { price: 76, overall: 82, leadLikelihood: 4.7 }
};

export function ListingProvider({ children }: { children: React.ReactNode }) {
  const [completedFixes, setCompletedFixes] = useState<Set<FixType>>(new Set());
  const [currentScores, setCurrentScores] = useState<ScoreData>(initialScores);
  const [quickWins, setQuickWins] = useState<QuickWin[]>(initialQuickWins);
  const [currentListing, setCurrentListing] = useState<ListingData>(initialListing);
  const [baseScores, setBaseScores] = useState<ScoreData>(initialScores);
  const [targetScores, setTargetScores] = useState<ScoreData>(improvedScores);
  const [explanations, setExplanations] = useState<MockListingExplanations>(defaultExplanations);

  const isFullyImproved = completedFixes.size === 4 || quickWins.every(w => w.completed);

  // Calculate current listing based on completed fixes
  const listing: ListingData = isFullyImproved ? {
    ...currentListing,
    title: improvedListing.title,
    description: improvedListing.description,
    price: improvedListing.price,
    photos: improvedListing.photos,
  } : {
    ...currentListing,
    title: completedFixes.has('title') ? improvedListing.title : currentListing.title,
    description: completedFixes.has('description') ? improvedListing.description : currentListing.description,
    price: completedFixes.has('price') ? improvedListing.price : currentListing.price,
    photos: completedFixes.has('photos') ? improvedListing.photos : currentListing.photos,
  };

  const applyFix = useCallback((type: FixType) => {
    setCompletedFixes(prev => {
      const newSet = new Set(prev);
      newSet.add(type);
      return newSet;
    });

    // Update scores progressively
    setCurrentScores(prev => {
      const increment = scoreIncrements[type];
      const newCompletedCount = completedFixes.size + 1;
      
      // Calculate new overall score based on how many fixes are done
      const progressOverall = baseScores.overall + ((targetScores.overall - baseScores.overall) * (newCompletedCount / 4));
      
      // Calculate new lead likelihood
      const progressLead = baseScores.leadLikelihood + ((targetScores.leadLikelihood - baseScores.leadLikelihood) * (newCompletedCount / 4));

      return {
        ...prev,
        [type]: increment[type as keyof ScoreData] || prev[type as keyof ScoreData],
        overall: Math.round(progressOverall),
        leadLikelihood: Number(progressLead.toFixed(1)),
        confidence: newCompletedCount >= 3 ? 'high' : newCompletedCount >= 2 ? 'medium' : prev.confidence
      };
    });

    // Mark quick win as completed
    setQuickWins(prev => 
      prev.map(win => 
        win.type === type ? { ...win, completed: true } : win
      )
    );
  }, [completedFixes.size, baseScores, targetScores]);

  const resetListing = useCallback(() => {
    setCompletedFixes(new Set());
    setCurrentScores(initialScores);
    setQuickWins(initialQuickWins);
    setCurrentListing(initialListing);
    setBaseScores(initialScores);
    setTargetScores(improvedScores);
    setExplanations(defaultExplanations);
  }, []);

  const loadDemoListing = useCallback((demo: DemoListing) => {
    setCompletedFixes(new Set());
    setCurrentListing(demo.listing);
    setCurrentScores(demo.scores);
    setQuickWins(demo.quickWins);
    setBaseScores(demo.scores);
    setExplanations(demo.explanations);
    // Set target scores based on demo quality level
    const improvedTarget: ScoreData = {
      overall: Math.min(demo.scores.overall + 30, 95),
      photos: Math.min(demo.scores.photos + 35, 95),
      title: Math.min(demo.scores.title + 25, 95),
      description: Math.min(demo.scores.description + 30, 95),
      price: Math.min(demo.scores.price + 25, 95),
      leadLikelihood: Math.min(demo.scores.leadLikelihood + 2.5, 8),
      confidence: 'high'
    };
    setTargetScores(improvedTarget);
  }, []);

  return (
    <ListingContext.Provider value={{
      listing,
      scores: currentScores,
      quickWins,
      isFullyImproved,
      completedFixes,
      explanations,
      applyFix,
      resetListing,
      loadDemoListing
    }}>
      {children}
    </ListingContext.Provider>
  );
}

export function useListing() {
  const context = useContext(ListingContext);
  if (context === undefined) {
    throw new Error('useListing must be used within a ListingProvider');
  }
  return context;
}
