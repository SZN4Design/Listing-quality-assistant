import { cn } from '@/lib/utils';
import { X, Check, Type, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TitleSuggestion } from '@/types/listing';

interface TitleModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestion: TitleSuggestion;
  onApply: () => void;
  onKeep: () => void;
}

export function TitleModal({ isOpen, onClose, suggestion, onApply, onKeep }: TitleModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-soft-xl border border-border animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Type className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Improve Your Title</h2>
              <p className="text-sm text-muted-foreground">AI-suggested optimization</p>
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
        <div className="p-6 space-y-6">
          {/* Original title */}
          <section>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Original Title</h3>
            <div className="p-4 rounded-xl bg-score-low/5 border border-score-low/20">
              <p className="text-foreground">{suggestion.original}</p>
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
              Suggested Title
              <span className="px-2 py-0.5 rounded-full bg-score-excellent/10 text-score-excellent text-xs">
                Recommended
              </span>
            </h3>
            <div className="p-4 rounded-xl bg-score-excellent/5 border border-score-excellent/20">
              <p className="text-foreground font-medium">{suggestion.suggested}</p>
            </div>
          </section>
          
          {/* Changes breakdown */}
          <section className="bg-muted/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Key Changes</h3>
            <ul className="space-y-2">
              {suggestion.changes.map((change, i) => (
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
        
        {/* Footer */}
        <div className="p-6 border-t border-border flex gap-3">
          <Button variant="outline" onClick={onKeep} className="flex-1">
            Keep Mine
          </Button>
          <Button onClick={onApply} className="flex-1">
            <Check className="w-4 h-4 mr-2" />
            Apply Suggestion
          </Button>
        </div>
      </div>
    </div>
  );
}
