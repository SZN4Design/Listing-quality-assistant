import { cn } from '@/lib/utils';
import { TrendingUp, ChevronRight, CheckCircle2, HelpCircle } from 'lucide-react';

interface ScoreCardProps {
  label: string;
  score: number;
  icon: React.ReactNode;
  onClick?: () => void;
  onWhyClick?: () => void;
  className?: string;
  completed?: boolean;
}

export function ScoreCard({ label, score, icon, onClick, onWhyClick, className, completed }: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-score-excellent';
    if (score >= 65) return 'text-score-good';
    if (score >= 50) return 'text-score-medium';
    return 'text-score-low';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-score-excellent/10';
    if (score >= 65) return 'bg-score-good/10';
    if (score >= 50) return 'bg-score-medium/10';
    return 'bg-score-low/10';
  };

  return (
    <div
      className={cn(
        'group flex items-center justify-between w-full p-4 rounded-xl',
        'bg-card border border-border/50 shadow-soft-sm',
        'hover:shadow-soft-md hover:border-border transition-all duration-200',
        completed && 'border-score-excellent/30 bg-score-excellent/5',
        className
      )}
    >
      <button
        onClick={onClick}
        className="flex items-center gap-3 flex-1 text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
      >
        <div className={cn('p-2.5 rounded-lg', getScoreBg(score))}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={cn('text-lg font-bold', getScoreColor(score))}>{score}</span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>
      </button>
      <div className="flex items-center gap-2">
        {onWhyClick && !completed && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWhyClick();
            }}
            className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 px-2 py-1 rounded hover:bg-primary/5"
          >
            <HelpCircle className="w-3 h-3" />
            Why?
          </button>
        )}
        {completed && <CheckCircle2 className="w-4 h-4 text-score-excellent" />}
        <button
          onClick={onClick}
          className="p-1 focus:outline-none focus:ring-2 focus:ring-ring rounded"
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      </div>
    </div>
  );
}

interface LeadLikelihoodProps {
  percentage: number;
  confidence: 'low' | 'medium' | 'high';
  className?: string;
}

export function LeadLikelihood({ percentage, confidence, className }: LeadLikelihoodProps) {
  const confidenceColors = {
    low: 'text-score-low bg-score-low/10',
    medium: 'text-score-medium bg-score-medium/10',
    high: 'text-score-excellent bg-score-excellent/10'
  };

  return (
    <div className={cn('p-4 rounded-xl bg-card border border-border/50', className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Lead Likelihood</span>
        </div>
        <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full capitalize', confidenceColors[confidence])}>
          {confidence} confidence
        </span>
      </div>
      <p className="text-2xl font-bold text-foreground">{percentage}%</p>
      <p className="text-xs text-muted-foreground mt-1">
        Estimated contact rate based on listing quality
      </p>
    </div>
  );
}
