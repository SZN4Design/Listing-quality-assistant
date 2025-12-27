import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Check, Type, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useListing } from '@/contexts/ListingContext';
import { titleSuggestion } from '@/data/mockData';

export default function FixTitle() {
  const navigate = useNavigate();
  const { applyFix, completedFixes } = useListing();

  const isAlreadyFixed = completedFixes.has('title');

  const handleApply = () => {
    applyFix('title');
    navigate('/listing-editor');
  };

  const handleKeep = () => {
    navigate('/listing-editor');
  };

  const handleBack = () => {
    navigate('/listing-editor');
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Editor</span>
          </button>
          <button
            onClick={handleBack}
            className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-card rounded-2xl border border-border shadow-soft-lg overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center gap-3 p-6 border-b border-border">
            <div className="p-2 rounded-lg bg-primary/10">
              <Type className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Improve Your Title</h1>
              <p className="text-sm text-muted-foreground">
                {isAlreadyFixed ? 'Title optimized!' : 'AI-suggested optimization'}
              </p>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 space-y-6">
            {/* Original title */}
            <section>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                {isAlreadyFixed ? 'Previous Title' : 'Original Title'}
              </h3>
              <div className="p-4 rounded-xl bg-score-low/5 border border-score-low/20">
                <p className="text-foreground">{titleSuggestion.original}</p>
              </div>
            </section>
            
            {/* Arrow */}
            <div className="flex justify-center">
              <div className="p-2 rounded-full bg-muted">
                <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
              </div>
            </div>
            
            {/* Suggested title */}
            <section>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                {isAlreadyFixed ? 'Current Title' : 'Suggested Title'}
                <span className="px-2 py-0.5 rounded-full bg-score-excellent/10 text-score-excellent text-xs">
                  {isAlreadyFixed ? 'Applied' : 'Recommended'}
                </span>
              </h3>
              <div className="p-4 rounded-xl bg-score-excellent/5 border border-score-excellent/20">
                <p className="text-foreground font-medium">{titleSuggestion.suggested}</p>
              </div>
            </section>
            
            {/* Changes breakdown */}
            <section className="bg-muted/50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Key Changes</h3>
              <ul className="space-y-2">
                {titleSuggestion.changes.map((change, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="px-2 py-0.5 rounded bg-score-low/10 text-score-low line-through">
                      {change.original}
                    </span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <span className="px-2 py-0.5 rounded bg-score-excellent/10 text-score-excellent">
                      {change.suggested}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Card Footer */}
          <div className="p-6 border-t border-border flex gap-3">
            {isAlreadyFixed ? (
              <Button onClick={handleBack} className="w-full" size="lg" variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Editor
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={handleKeep} className="flex-1">
                  Keep Mine
                </Button>
                <Button onClick={handleApply} className="flex-1">
                  <Check className="w-4 h-4 mr-2" />
                  Apply Suggestion
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
