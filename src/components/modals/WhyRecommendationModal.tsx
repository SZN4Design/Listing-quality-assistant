import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { AlertCircle, Target, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CategoryExplanation } from '@/types/listing';

interface WhyRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'photos' | 'title' | 'description' | 'price';
  label: string;
  explanation?: CategoryExplanation;
}

export function WhyRecommendationModal({ isOpen, onClose, type, label, explanation }: WhyRecommendationModalProps) {
  // Default explanations if none provided
  const defaultExplanation: CategoryExplanation = {
    issues_found: ['No specific issues detected'],
    why_it_matters: 'Improving this area can help increase buyer engagement.',
    recommended_actions: ['Review and optimize as needed']
  };

  const exp = explanation || defaultExplanation;
  const isPositive = exp.issues_found.length <= 2 && !exp.issues_found[0]?.toLowerCase().includes('missing');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Why improve {label}?
          </DialogTitle>
          <DialogDescription>
            Understanding this recommendation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Issues Found */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
            <div className="flex items-start gap-3">
              <div className={`p-1.5 rounded-md mt-0.5 ${isPositive ? 'bg-score-excellent/10 text-score-excellent' : 'bg-score-low/10 text-score-low'}`}>
                {isPositive ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-2">Issues found</p>
                <ul className="space-y-1.5">
                  {exp.issues_found.map((issue, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-muted-foreground/50 mt-1">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Why It Matters */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-md bg-primary/10 text-primary mt-0.5">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Why it matters</p>
                <p className="text-sm text-muted-foreground">{exp.why_it_matters}</p>
              </div>
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="p-4 rounded-lg bg-score-excellent/5 border border-score-excellent/20">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-md bg-score-excellent/10 text-score-excellent mt-0.5">
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-2">Recommended actions</p>
                <ul className="space-y-1.5">
                  {exp.recommended_actions.map((action, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-score-excellent mt-1">→</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
