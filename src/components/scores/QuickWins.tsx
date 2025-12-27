import { cn } from '@/lib/utils';
import { Check, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuickWin } from '@/types/listing';

interface QuickWinsProps {
  wins: QuickWin[];
  onFixClick: (type: QuickWin['type']) => void;
  className?: string;
}

export function QuickWins({ wins, onFixClick, className }: QuickWinsProps) {
  const impactColors = {
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-score-medium/15 text-score-medium',
    high: 'bg-score-excellent/15 text-score-excellent'
  };

  return (
    <div className={cn('rounded-xl bg-card border border-border/50 p-4', className)}>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-primary/10">
          <Lightbulb className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">Top 3 Quick Wins</h3>
      </div>
      
      <div className="space-y-3">
        {wins.map((win, index) => (
          <div
            key={win.id}
            className={cn(
              'flex items-start gap-3 p-3 rounded-lg transition-all duration-200',
              win.completed ? 'bg-score-excellent/5' : 'bg-muted/50 hover:bg-muted'
            )}
          >
            <div className={cn(
              'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
              win.completed 
                ? 'bg-score-excellent text-primary-foreground' 
                : 'bg-muted-foreground/20 text-muted-foreground'
            )}>
              {win.completed ? <Check className="w-3.5 h-3.5" /> : index + 1}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className={cn(
                  'text-sm font-medium',
                  win.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                )}>
                  {win.title}
                </p>
                <span className={cn('text-xs px-1.5 py-0.5 rounded-full capitalize', impactColors[win.impact])}>
                  {win.impact}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{win.description}</p>
            </div>
            
            {!win.completed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFixClick(win.type)}
                className="flex-shrink-0 h-8 px-2"
              >
                Fix
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
