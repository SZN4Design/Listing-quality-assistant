import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  Eye, 
  MessageSquare, 
  Clock,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Target,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OptimizationDashboardProps {
  className?: string;
}

export function OptimizationDashboard({ className }: OptimizationDashboardProps) {
  const metrics = [
    { label: 'Views', value: '1,247', change: '+23%', icon: Eye, positive: true },
    { label: 'Inquiries', value: '18', change: '+47%', icon: MessageSquare, positive: true },
    { label: 'Avg. Time on Page', value: '2m 34s', change: '+12%', icon: Clock, positive: true },
  ];

  const todoItems = [
    { id: '1', task: 'Add video walkaround', impact: 'High', completed: false },
    { id: '2', task: 'Enable instant messaging', impact: 'Medium', completed: false },
    { id: '3', task: 'Add financing pre-approval link', impact: 'Medium', completed: true },
    { id: '4', task: 'Refresh photos monthly', impact: 'Low', completed: false },
  ];

  const impactColors = {
    Low: 'bg-muted text-muted-foreground',
    Medium: 'bg-score-medium/15 text-score-medium',
    High: 'bg-score-excellent/15 text-score-excellent'
  };

  return (
    <div className={cn('p-8 space-y-8', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Post-Publish Optimization</h1>
          <p className="text-sm text-muted-foreground mt-1">
            2019 Ford F-150 XLT • Listed 3 days ago
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-score-excellent/10 border border-score-excellent/20">
          <Zap className="w-5 h-5 text-score-excellent" />
          <span className="text-sm font-medium text-score-excellent">
            Expected +35% more leads with optimizations
          </span>
        </div>
      </div>

      {/* Performance Snapshot */}
      <section className="bg-card rounded-2xl border border-border p-6 shadow-soft-sm">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Listing Performance</h2>
          <span className="text-xs text-muted-foreground ml-2">Last 7 days</span>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="p-4 rounded-xl bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="w-5 h-5 text-muted-foreground" />
                <span className={cn(
                  'text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1',
                  metric.positive ? 'bg-score-excellent/10 text-score-excellent' : 'bg-score-low/10 text-score-low'
                )}>
                  <ArrowUpRight className="w-3 h-3" />
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-8">
        {/* Next Best Actions */}
        <section className="bg-card rounded-2xl border border-border p-6 shadow-soft-sm">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Next Best Actions</h2>
          </div>
          
          <div className="space-y-4">
            <ActionCard
              title="Add a Video Walkaround"
              description="Listings with video receive 41% more engagement. Consider a 60-second exterior and interior tour."
              impact="High"
              cta="Learn How"
            />
            <ActionCard
              title="Enable Quick Response"
              description="Buyers expect replies within 1 hour. Enable SMS notifications to respond faster."
              impact="Medium"
              cta="Enable"
            />
          </div>
        </section>

        {/* Optimization To-Do List */}
        <section className="bg-card rounded-2xl border border-border p-6 shadow-soft-sm">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Optimization To-Do</h2>
          </div>
          
          <div className="space-y-3">
            {todoItems.map((item) => (
              <div
                key={item.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl transition-all',
                  item.completed ? 'bg-score-excellent/5' : 'bg-muted/50'
                )}
              >
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0',
                  item.completed 
                    ? 'bg-score-excellent text-primary-foreground'
                    : 'border-2 border-muted-foreground/30'
                )}>
                  {item.completed && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className={cn(
                    'text-sm font-medium',
                    item.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                  )}>
                    {item.task}
                  </p>
                </div>
                <span className={cn(
                  'text-xs px-2 py-0.5 rounded-full',
                  impactColors[item.impact as keyof typeof impactColors]
                )}>
                  {item.impact}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

interface ActionCardProps {
  title: string;
  description: string;
  impact: string;
  cta: string;
}

function ActionCard({ title, description, impact, cta }: ActionCardProps) {
  return (
    <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground">{title}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-score-excellent/15 text-score-excellent">
              {impact} Impact
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button variant="outline" size="sm" className="flex-shrink-0">
          {cta}
        </Button>
      </div>
    </div>
  );
}
