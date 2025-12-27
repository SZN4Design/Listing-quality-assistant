import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { 
  Camera, 
  Type, 
  FileText, 
  DollarSign,
  BarChart3,
  TrendingUp,
  Brain,
  Target
} from 'lucide-react';

interface HowAIWorksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowAIWorksDrawer({ isOpen, onClose }: HowAIWorksDrawerProps) {
  const signals = [
    {
      icon: <Camera className="w-4 h-4" />,
      label: 'Photos',
      weight: '30%',
      description: 'We analyze image count, variety (interior, exterior, details), lighting quality, and resolution.'
    },
    {
      icon: <FileText className="w-4 h-4" />,
      label: 'Description',
      weight: '30%',
      description: 'We check for completeness, trust signals (service history, condition notes), features, and call-to-action.'
    },
    {
      icon: <Type className="w-4 h-4" />,
      label: 'Title',
      weight: '20%',
      description: 'We verify year, make, model, trim presence and check for clarity and searchability.'
    },
    {
      icon: <DollarSign className="w-4 h-4" />,
      label: 'Price',
      weight: '20%',
      description: 'We compare your price against similar listings in your area to gauge competitiveness.'
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            How AI Recommendations Work
          </SheetTitle>
          <SheetDescription>
            Understanding how we analyze and score your listings
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8">
          {/* Section 1: What We Measure */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground">What Signals We Measure</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Our AI analyzes four key areas of your listing that research shows matter most to buyers:
            </p>
            <div className="space-y-3">
              {signals.map((signal, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg bg-muted/50 border border-border/50"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">{signal.icon}</span>
                      <span className="font-medium text-foreground text-sm">{signal.label}</span>
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {signal.weight}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{signal.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Why Each Signal Matters */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground">Why These Signals Matter</h3>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="p-3 rounded-lg bg-score-excellent/5 border border-score-excellent/20">
                <p className="font-medium text-foreground mb-1">Photos (30%)</p>
                <p>Listings with 10+ quality photos get 2.5x more inquiries. Interior photos are the #2 most viewed after the main exterior.</p>
              </div>
              <div className="p-3 rounded-lg bg-score-good/5 border border-score-good/20">
                <p className="font-medium text-foreground mb-1">Description (30%)</p>
                <p>Detailed descriptions build trust. Mentioning service history increases contact rates by 35%.</p>
              </div>
              <div className="p-3 rounded-lg bg-score-medium/5 border border-score-medium/20">
                <p className="font-medium text-foreground mb-1">Title (20%)</p>
                <p>Complete year/make/model/trim titles get 40% more clicks. Buyers filter by trim level.</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <p className="font-medium text-foreground mb-1">Price (20%)</p>
                <p>Competitively priced listings sell 2x faster. Buyers compare 8+ listings before contacting.</p>
              </div>
            </div>
          </section>

          {/* Section 3: How We Calculate Scores */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground">How Scoring Works</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Each signal is scored from 0-100 based on specific criteria. Your Overall Score is calculated using weighted averages:
            </p>
            <div className="p-4 rounded-lg bg-muted/50 border border-border font-mono text-sm">
              <p className="text-foreground">
                Overall = (Photos × 0.30) + (Description × 0.30) + (Title × 0.20) + (Price × 0.20)
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              For example, if your Photos score is 80, Description is 70, Title is 90, and Price is 75:
              <br />
              <span className="font-medium">Overall = (80×0.30) + (70×0.30) + (90×0.20) + (75×0.20) = 78</span>
            </p>
          </section>

          {/* Section 4: Lead Likelihood */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground">Lead Likelihood Explained</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Lead Likelihood predicts what percentage of viewers will contact you based on your Overall Score and historical data from similar listings.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-muted-foreground">Score 0-50</span>
                <span className="text-sm font-medium text-score-low">~1-2% contact rate</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-muted-foreground">Score 51-70</span>
                <span className="text-sm font-medium text-score-medium">~2-4% contact rate</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-muted-foreground">Score 71-85</span>
                <span className="text-sm font-medium text-score-good">~4-6% contact rate</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-muted-foreground">Score 86-100</span>
                <span className="text-sm font-medium text-score-excellent">~6-8% contact rate</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Confidence level indicates how much data we have for similar vehicles. Higher confidence means more accurate predictions.
            </p>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
