import { cn } from '@/lib/utils';
import { X, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScoreExplanation } from '@/types/listing';

interface ScoreDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  score: number;
  explanation: ScoreExplanation;
  onFix: () => void;
}

export function ScoreDrawer({ isOpen, onClose, title, score, explanation, onFix }: ScoreDrawerProps) {
  if (!isOpen) return null;

  const impactColors = {
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-score-medium/15 text-score-medium',
    high: 'bg-score-excellent/15 text-score-excellent'
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-score-excellent';
    if (score >= 65) return 'text-score-good';
    if (score >= 50) return 'text-score-medium';
    return 'text-score-low';
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-soft-xl z-50 animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-lg font-semibold text-foreground">{title} Score</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn('text-2xl font-bold', getScoreColor(score))}>{score}</span>
                <span className="text-sm text-muted-foreground">/100</span>
                <span className={cn('text-xs px-2 py-0.5 rounded-full ml-2 capitalize', impactColors[explanation.estimatedImpact])}>
                  {explanation.estimatedImpact} impact
                </span>
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
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* What we noticed */}
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                <AlertCircle className="w-4 h-4 text-score-medium" />
                What we noticed
              </h3>
              <ul className="space-y-2">
                {explanation.whatWeNoticed.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            
            {/* Why it matters */}
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Why this matters for buyers
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-4 rounded-lg">
                {explanation.whyItMatters}
              </p>
            </section>
            
            {/* What to fix */}
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                <CheckCircle2 className="w-4 h-4 text-score-excellent" />
                What to fix
              </h3>
              <ul className="space-y-2">
                {explanation.whatToFix.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-score-excellent mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t border-border">
            <Button onClick={onFix} className="w-full" size="lg">
              Fix {title}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
