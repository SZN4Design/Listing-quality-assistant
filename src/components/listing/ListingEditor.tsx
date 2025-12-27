import { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Camera, 
  Type, 
  FileText, 
  DollarSign, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ListingForm } from '@/components/forms/ListingForm';
import { CircularScore } from '@/components/scores/CircularScore';
import { ScoreCard, LeadLikelihood } from '@/components/scores/ScoreCard';
import { QuickWins } from '@/components/scores/QuickWins';
import { ScoreDrawer } from '@/components/drawers/ScoreDrawer';
import { PhotosModal } from '@/components/modals/PhotosModal';
import { TitleModal } from '@/components/modals/TitleModal';
import { DescriptionModal } from '@/components/modals/DescriptionModal';
import { PriceModal } from '@/components/modals/PriceModal';
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
  initialQuickWins,
  scoreExplanations,
  photoChecklist,
  titleSuggestion,
  descriptionAnalysis,
  marketPriceData
} from '@/data/mockData';

type ModalType = 'photos' | 'title' | 'description' | 'price' | null;
type DrawerType = 'photos' | 'title' | 'description' | 'price' | null;

interface ListingEditorProps {
  className?: string;
}

export function ListingEditor({ className }: ListingEditorProps) {
  const [isImproved, setIsImproved] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
  const [quickWins, setQuickWins] = useState<QuickWin[]>(initialQuickWins);

  const listing: ListingData = isImproved ? improvedListing : initialListing;
  const scores: ScoreData = isImproved ? improvedScores : initialScores;

  const handleFixClick = (type: QuickWin['type']) => {
    setActiveModal(type);
  };

  const handleScoreCardClick = (type: DrawerType) => {
    setActiveDrawer(type);
  };

  const handleApplyFix = (type: QuickWin['type']) => {
    setQuickWins(prev => 
      prev.map(win => 
        win.type === type ? { ...win, completed: true } : win
      )
    );
    setActiveModal(null);
    setActiveDrawer(null);
    
    // Check if all wins are completed
    const updatedWins = quickWins.map(win => 
      win.type === type ? { ...win, completed: true } : win
    );
    if (updatedWins.every(win => win.completed)) {
      setTimeout(() => setIsImproved(true), 500);
    }
  };

  const handleImproveListing = () => {
    setIsImproved(true);
    setQuickWins(prev => prev.map(win => ({ ...win, completed: true })));
  };

  return (
    <div className={cn('grid grid-cols-5 gap-8 p-8', className)}>
      {/* Left Column - Edit Listing Form */}
      <div className="col-span-3 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Listing</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {listing.year} {listing.make} {listing.model} {listing.trim}
            </p>
          </div>
          {isImproved && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-score-excellent/10 text-score-excellent text-sm font-medium animate-fade-in-up">
              <CheckCircle2 className="w-4 h-4" />
              Optimized
            </div>
          )}
        </div>
        
        <div className="bg-card rounded-2xl border border-border p-6 shadow-soft-sm">
          <ListingForm listing={listing} isImproved={isImproved} />
        </div>
      </div>
      
      {/* Right Column - Quality Assistant */}
      <div className="col-span-2 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Listing Quality Assistant</h2>
            <p className="text-sm text-muted-foreground">AI-powered optimization</p>
          </div>
        </div>
        
        {/* Overall Score */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-soft-sm">
          <CircularScore 
            score={scores.overall} 
            size="lg" 
            label="Overall Score"
            animate={true}
            key={scores.overall} // Force re-render on score change
          />
        </div>
        
        {/* Sub-scores */}
        <div className="space-y-3">
          <ScoreCard
            label="Photos"
            score={scores.photos}
            icon={<Camera className="w-4 h-4 text-primary" />}
            onClick={() => handleScoreCardClick('photos')}
          />
          <ScoreCard
            label="Title"
            score={scores.title}
            icon={<Type className="w-4 h-4 text-primary" />}
            onClick={() => handleScoreCardClick('title')}
          />
          <ScoreCard
            label="Description"
            score={scores.description}
            icon={<FileText className="w-4 h-4 text-primary" />}
            onClick={() => handleScoreCardClick('description')}
          />
          <ScoreCard
            label="Price"
            score={scores.price}
            icon={<DollarSign className="w-4 h-4 text-primary" />}
            onClick={() => handleScoreCardClick('price')}
          />
        </div>
        
        {/* Lead Likelihood */}
        <LeadLikelihood 
          percentage={scores.leadLikelihood}
          confidence={scores.confidence}
        />
        
        {/* Quick Wins */}
        <QuickWins 
          wins={quickWins}
          onFixClick={handleFixClick}
        />
        
        {/* Primary CTA */}
        {!isImproved && (
          <Button 
            onClick={handleImproveListing}
            className="w-full" 
            size="xl"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Improve Listing
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
        
        {isImproved && (
          <div className="p-4 rounded-xl bg-score-excellent/5 border border-score-excellent/20 text-center">
            <p className="text-sm font-medium text-score-excellent">
              Great job! Your listing is now optimized for maximum leads.
            </p>
          </div>
        )}
      </div>
      
      {/* Score Drawers */}
      <ScoreDrawer
        isOpen={activeDrawer === 'photos'}
        onClose={() => setActiveDrawer(null)}
        title="Photos"
        score={scores.photos}
        explanation={scoreExplanations.photos}
        onFix={() => {
          setActiveDrawer(null);
          setActiveModal('photos');
        }}
      />
      <ScoreDrawer
        isOpen={activeDrawer === 'title'}
        onClose={() => setActiveDrawer(null)}
        title="Title"
        score={scores.title}
        explanation={scoreExplanations.title}
        onFix={() => {
          setActiveDrawer(null);
          setActiveModal('title');
        }}
      />
      <ScoreDrawer
        isOpen={activeDrawer === 'description'}
        onClose={() => setActiveDrawer(null)}
        title="Description"
        score={scores.description}
        explanation={scoreExplanations.description}
        onFix={() => {
          setActiveDrawer(null);
          setActiveModal('description');
        }}
      />
      <ScoreDrawer
        isOpen={activeDrawer === 'price'}
        onClose={() => setActiveDrawer(null)}
        title="Price"
        score={scores.price}
        explanation={scoreExplanations.price}
        onFix={() => {
          setActiveDrawer(null);
          setActiveModal('price');
        }}
      />
      
      {/* Modals */}
      <PhotosModal
        isOpen={activeModal === 'photos'}
        onClose={() => setActiveModal(null)}
        checklist={photoChecklist}
        onMarkAdded={() => handleApplyFix('photos')}
      />
      <TitleModal
        isOpen={activeModal === 'title'}
        onClose={() => setActiveModal(null)}
        suggestion={titleSuggestion}
        onApply={() => handleApplyFix('title')}
        onKeep={() => setActiveModal(null)}
      />
      <DescriptionModal
        isOpen={activeModal === 'description'}
        onClose={() => setActiveModal(null)}
        analysis={descriptionAnalysis}
        originalDescription={initialListing.description}
        onApply={() => handleApplyFix('description')}
        onEdit={() => setActiveModal(null)}
      />
      <PriceModal
        isOpen={activeModal === 'price'}
        onClose={() => setActiveModal(null)}
        priceData={marketPriceData}
        onApply={() => handleApplyFix('price')}
      />
    </div>
  );
}
