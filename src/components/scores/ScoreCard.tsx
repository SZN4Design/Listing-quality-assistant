import { cn } from '@/lib/utils';
import { TrendingUp, ChevronRight } from 'lucide-react';

interface ScoreCardProps {
  label: string;
  score: number;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ScoreCard({ label, score, icon, onClick, className }: ScoreCardProps) {
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
    <button
      onClick={onClick}
      className={cn(
        'group flex items-center justify-between w-full p-4 rounded-xl',
        'bg-card border border-border/50 shadow-soft-sm',
        'hover:shadow-soft-md hover:border-border transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn('p-2.5 rounded-lg', getScoreBg(score))}>
          {icon}
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={cn('text-lg font-bold', getScoreColor(score))}>{score}</span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
    </button>
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
