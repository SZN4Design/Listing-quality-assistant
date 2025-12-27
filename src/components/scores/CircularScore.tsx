import { cn } from '@/lib/utils';

interface CircularScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
  animate?: boolean;
}

export function CircularScore({ 
  score, 
  size = 'md', 
  showLabel = true, 
  label = 'Overall Score',
  className,
  animate = true
}: CircularScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-score-excellent';
    if (score >= 65) return 'text-score-good';
    if (score >= 50) return 'text-score-medium';
    return 'text-score-low';
  };

  const getStrokeColor = (score: number) => {
    if (score >= 80) return 'stroke-score-excellent';
    if (score >= 65) return 'stroke-score-good';
    if (score >= 50) return 'stroke-score-medium';
    return 'stroke-score-low';
  };

  const sizes = {
    sm: { container: 'w-20 h-20', text: 'text-xl', label: 'text-xs', strokeWidth: 6 },
    md: { container: 'w-32 h-32', text: 'text-3xl', label: 'text-sm', strokeWidth: 8 },
    lg: { container: 'w-44 h-44', text: 'text-5xl', label: 'text-base', strokeWidth: 10 }
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className={cn('relative', sizes[size].container)}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            className="stroke-muted"
            strokeWidth={sizes[size].strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            className={cn(getStrokeColor(score), animate && 'animate-score-fill')}
            strokeWidth={sizes[size].strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animate ? undefined : strokeDashoffset}
            style={animate ? { strokeDashoffset } : undefined}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('font-bold', sizes[size].text, getScoreColor(score))}>
            {score}
          </span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>
      {showLabel && (
        <span className={cn('font-medium text-muted-foreground', sizes[size].label)}>
          {label}
        </span>
      )}
    </div>
  );
}
