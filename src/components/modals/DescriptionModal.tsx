import { cn } from '@/lib/utils';
import { X, Check, FileText, AlertTriangle, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DescriptionAnalysis } from '@/types/listing';

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: DescriptionAnalysis;
  originalDescription: string;
  onApply: () => void;
  onEdit: () => void;
}

export function DescriptionModal({ 
  isOpen, 
  onClose, 
  analysis, 
  originalDescription,
  onApply, 
  onEdit 
}: DescriptionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-card rounded-2xl shadow-soft-xl border border-border animate-fade-in-up max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Improve Description</h2>
              <p className="text-sm text-muted-foreground">Build trust with buyers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Trust gaps */}
          <section>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
              <AlertTriangle className="w-4 h-4 text-score-medium" />
              Trust Gaps Found
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.trustGaps.map((gap, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-score-medium/10 text-score-medium text-sm"
                >
                  {gap}
                </span>
              ))}
            </div>
          </section>
          
          {/* Original description */}
          <section>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Current Description</h3>
            <div className="p-4 rounded-xl bg-score-low/5 border border-score-low/20">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{originalDescription}</p>
            </div>
          </section>
          
          {/* Suggested description */}
          <section>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              AI-Generated Description
              <span className="px-2 py-0.5 rounded-full bg-score-excellent/10 text-score-excellent text-xs">
                Recommended
              </span>
            </h3>
            <div className="p-4 rounded-xl bg-score-excellent/5 border border-score-excellent/20">
              <p className="text-sm text-foreground whitespace-pre-wrap">{analysis.suggestedDescription}</p>
            </div>
          </section>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-border flex gap-3 flex-shrink-0">
          <Button variant="outline" onClick={onEdit} className="flex-1">
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Manually
          </Button>
          <Button onClick={onApply} className="flex-1">
            <Check className="w-4 h-4 mr-2" />
            Apply Improved Version
          </Button>
        </div>
      </div>
    </div>
  );
}
