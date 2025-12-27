import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  ListingData, 
  ScoreData, 
  QuickWin 
} from '@/types/listing';
import {
  initialListing,
  improvedListing,
  initialScores,
  improvedScores,
  initialQuickWins
} from '@/data/mockData';

type FixType = 'photos' | 'title' | 'description' | 'price';

interface ListingContextType {
  listing: ListingData;
  scores: ScoreData;
  quickWins: QuickWin[];
  isFullyImproved: boolean;
  completedFixes: Set<FixType>;
  applyFix: (type: FixType) => void;
  resetListing: () => void;
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

  const isFullyImproved = completedFixes.size === 4;

  // Calculate current listing based on completed fixes
  const listing: ListingData = isFullyImproved ? improvedListing : {
    ...initialListing,
    title: completedFixes.has('title') ? improvedListing.title : initialListing.title,
    description: completedFixes.has('description') ? improvedListing.description : initialListing.description,
    price: completedFixes.has('price') ? improvedListing.price : initialListing.price,
    photos: completedFixes.has('photos') ? improvedListing.photos : initialListing.photos,
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
      const baseOverall = initialScores.overall;
      const targetOverall = improvedScores.overall;
      const progressOverall = baseOverall + ((targetOverall - baseOverall) * (newCompletedCount / 4));
      
      // Calculate new lead likelihood
      const baseLead = initialScores.leadLikelihood;
      const targetLead = improvedScores.leadLikelihood;
      const progressLead = baseLead + ((targetLead - baseLead) * (newCompletedCount / 4));

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
  }, [completedFixes.size]);

  const resetListing = useCallback(() => {
    setCompletedFixes(new Set());
    setCurrentScores(initialScores);
    setQuickWins(initialQuickWins);
  }, []);

  return (
    <ListingContext.Provider value={{
      listing,
      scores: currentScores,
      quickWins,
      isFullyImproved,
      completedFixes,
      applyFix,
      resetListing
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
