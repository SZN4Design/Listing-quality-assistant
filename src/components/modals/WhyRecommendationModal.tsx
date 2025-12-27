import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { AlertCircle, Target, ArrowRight } from 'lucide-react';

export interface RecommendationReason {
  trigger: string;
  buyerImpact: string;
  action: string;
}

export const recommendationReasons: Record<string, RecommendationReason> = {
  photos: {
    trigger: 'Missing interior photos (dashboard, seats, cargo area) and detail shots (odometer, tires)',
    buyerImpact: 'Buyers can\'t visualize the vehicle\'s condition. 78% of buyers say interior photos are "very important" in their decision.',
    action: 'Add at least 4 interior photos: dashboard, front seats, rear seats/cargo, and odometer reading'
  },
  title: {
    trigger: 'Title is missing year, make, model, and trim level. Uses vague language like "nice" and "good".',
    buyerImpact: 'Buyers searching for specific vehicles won\'t find your listing. Unclear titles reduce click-through rates by 40%.',
    action: 'Update title to: "2019 Ford F-150 XLT Crew Cab 4x4" with 1-2 key features'
  },
  description: {
    trigger: 'Description lacks condition details, service history, features list, and call-to-action',
    buyerImpact: 'Incomplete descriptions reduce trust. Buyers move on to listings that answer their questions upfront.',
    action: 'Add vehicle condition, recent maintenance, key features, and contact/financing info'
  },
  price: {
    trigger: 'Your price is 7% above the market average for similar vehicles in your area',
    buyerImpact: 'Price-sensitive buyers filter by price range and may not see your listing. Above-market pricing extends time-to-sale.',
    action: 'Adjust price to $26,900-$27,500 or highlight premium features that justify the higher price'
  }
};

interface WhyRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'photos' | 'title' | 'description' | 'price';
  label: string;
}

export function WhyRecommendationModal({ isOpen, onClose, type, label }: WhyRecommendationModalProps) {
  const reason = recommendationReasons[type];

  const getImpactColor = (type: string) => {
    if (type === 'photos' || type === 'description') return 'text-score-low bg-score-low/10';
    if (type === 'title') return 'text-score-medium bg-score-medium/10';
    return 'text-score-medium bg-score-medium/10';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Why improve {label}?
          </DialogTitle>
          <DialogDescription>
            Understanding this recommendation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Trigger */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-md bg-score-low/10 text-score-low mt-0.5">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">What triggered this</p>
                <p className="text-sm text-muted-foreground">{reason.trigger}</p>
              </div>
            </div>
          </div>

          {/* Buyer Impact */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-md bg-primary/10 text-primary mt-0.5">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Impact on buyers</p>
                <p className="text-sm text-muted-foreground">{reason.buyerImpact}</p>
              </div>
            </div>
          </div>

          {/* Action Required */}
          <div className="p-4 rounded-lg bg-score-excellent/5 border border-score-excellent/20">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-md bg-score-excellent/10 text-score-excellent mt-0.5">
                <ArrowRight className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">What to do</p>
                <p className="text-sm text-muted-foreground">{reason.action}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
