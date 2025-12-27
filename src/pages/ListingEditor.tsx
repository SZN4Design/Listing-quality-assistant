import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Camera, 
  Type, 
  FileText, 
  DollarSign, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ListingForm } from '@/components/forms/ListingForm';
import { CircularScore } from '@/components/scores/CircularScore';
import { ScoreCard, LeadLikelihood } from '@/components/scores/ScoreCard';
import { QuickWins } from '@/components/scores/QuickWins';
import { useListing } from '@/contexts/ListingContext';

export default function ListingEditor() {
  const navigate = useNavigate();
  const { listing, scores, quickWins, isFullyImproved, completedFixes } = useListing();

  const handleScoreCardClick = (type: 'photos' | 'title' | 'description' | 'price') => {
    navigate(`/fix-${type}`);
  };

  const handleFixClick = (type: 'photos' | 'title' | 'description' | 'price') => {
    navigate(`/fix-${type}`);
  };

  const handleImproveListing = () => {
    navigate('/fix-photos');
  };

  const handlePublish = () => {
    navigate('/post-publish-dashboard');
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-5 gap-8 p-8">
        {/* Left Column - Edit Listing Form */}
        <div className="col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Edit Listing</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {listing.year} {listing.make} {listing.model} {listing.trim}
              </p>
            </div>
            {isFullyImproved && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-score-excellent/10 text-score-excellent text-sm font-medium animate-fade-in-up">
                <CheckCircle2 className="w-4 h-4" />
                Optimized
              </div>
            )}
          </div>
          
          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft-sm">
            <ListingForm listing={listing} isImproved={isFullyImproved} />
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
              key={scores.overall}
            />
          </div>
          
          {/* Sub-scores */}
          <div className="space-y-3">
            <ScoreCard
              label="Photos"
              score={scores.photos}
              icon={<Camera className="w-4 h-4 text-primary" />}
              onClick={() => handleScoreCardClick('photos')}
              completed={completedFixes.has('photos')}
            />
            <ScoreCard
              label="Title"
              score={scores.title}
              icon={<Type className="w-4 h-4 text-primary" />}
              onClick={() => handleScoreCardClick('title')}
              completed={completedFixes.has('title')}
            />
            <ScoreCard
              label="Description"
              score={scores.description}
              icon={<FileText className="w-4 h-4 text-primary" />}
              onClick={() => handleScoreCardClick('description')}
              completed={completedFixes.has('description')}
            />
            <ScoreCard
              label="Price"
              score={scores.price}
              icon={<DollarSign className="w-4 h-4 text-primary" />}
              onClick={() => handleScoreCardClick('price')}
              completed={completedFixes.has('price')}
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
          
          {/* Primary CTAs */}
          {!isFullyImproved && (
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
          
          {isFullyImproved && (
            <>
              <div className="p-4 rounded-xl bg-score-excellent/5 border border-score-excellent/20 text-center">
                <p className="text-sm font-medium text-score-excellent">
                  Great job! Your listing is now optimized for maximum leads.
                </p>
              </div>
              <Button 
                onClick={handlePublish}
                className="w-full" 
                size="xl"
                variant="success"
              >
                <Send className="w-4 h-4 mr-2" />
                Publish Listing
              </Button>
            </>
          )}
          
          {/* Show Publish button even if not fully improved */}
          {!isFullyImproved && completedFixes.size > 0 && (
            <Button 
              onClick={handlePublish}
              className="w-full" 
              size="lg"
              variant="outline"
            >
              <Send className="w-4 h-4 mr-2" />
              Publish Without All Fixes
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
