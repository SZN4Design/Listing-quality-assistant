import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Check, FileText, AlertTriangle, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useListing } from '@/contexts/ListingContext';
import { descriptionAnalysis, initialListing } from '@/data/mockData';

export default function FixDescription() {
  const navigate = useNavigate();
  const { applyFix, completedFixes } = useListing();

  const isAlreadyFixed = completedFixes.has('description');

  const handleApply = () => {
    applyFix('description');
    navigate('/listing-editor');
  };

  const handleEdit = () => {
    navigate('/listing-editor');
  };

  const handleBack = () => {
    navigate('/listing-editor');
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto p-8">
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
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Improve Description</h1>
              <p className="text-sm text-muted-foreground">
                {isAlreadyFixed ? 'Description optimized!' : 'Build trust with buyers'}
              </p>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Trust gaps */}
            {!isAlreadyFixed && (
              <section>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                  <AlertTriangle className="w-4 h-4 text-score-medium" />
                  Trust Gaps Found
                </h3>
                <div className="flex flex-wrap gap-2">
                  {descriptionAnalysis.trustGaps.map((gap, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-score-medium/10 text-score-medium text-sm"
                    >
                      {gap}
                    </span>
                  ))}
                </div>
              </section>
            )}
            
            {/* Original description */}
            <section>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                {isAlreadyFixed ? 'Previous Description' : 'Current Description'}
              </h3>
              <div className="p-4 rounded-xl bg-score-low/5 border border-score-low/20">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {initialListing.description}
                </p>
              </div>
            </section>
            
            {/* Suggested description */}
            <section>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                {isAlreadyFixed ? 'Current Description' : 'AI-Generated Description'}
                <span className="px-2 py-0.5 rounded-full bg-score-excellent/10 text-score-excellent text-xs">
                  {isAlreadyFixed ? 'Applied' : 'Recommended'}
                </span>
              </h3>
              <div className="p-4 rounded-xl bg-score-excellent/5 border border-score-excellent/20">
                <p className="text-sm text-foreground whitespace-pre-wrap">
                  {descriptionAnalysis.suggestedDescription}
                </p>
              </div>
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
                <Button variant="outline" onClick={handleEdit} className="flex-1">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Manually
                </Button>
                <Button onClick={handleApply} className="flex-1">
                  <Check className="w-4 h-4 mr-2" />
                  Apply Improved Version
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
