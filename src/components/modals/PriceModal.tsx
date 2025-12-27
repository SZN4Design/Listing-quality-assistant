import { cn } from '@/lib/utils';
import { X, Check, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MarketPriceData } from '@/types/listing';

interface PriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  priceData: MarketPriceData;
  onApply: () => void;
}

export function PriceModal({ isOpen, onClose, priceData, onApply }: PriceModalProps) {
  if (!isOpen) return null;

  const pricePosition = ((priceData.yourPrice - priceData.minPrice) / (priceData.maxPrice - priceData.minPrice)) * 100;
  const suggestedPosition = ((priceData.suggestedPrice - priceData.minPrice) / (priceData.maxPrice - priceData.minPrice)) * 100;
  const averagePosition = ((priceData.averagePrice - priceData.minPrice) / (priceData.maxPrice - priceData.minPrice)) * 100;

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
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Price Analysis</h2>
              <p className="text-sm text-muted-foreground">Based on market data</p>
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
          {/* Alert */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-score-medium/10 border border-score-medium/20">
            <AlertCircle className="w-5 h-5 text-score-medium flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Your price is {priceData.percentageFromMarket}% above market
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                This may reduce buyer interest and extend time on market
              </p>
            </div>
          </div>
          
          {/* Price slider visualization */}
          <section>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Market Price Range</h3>
            <div className="relative pt-8 pb-6">
              {/* Range bar */}
              <div className="h-3 bg-muted rounded-full relative">
                {/* Average marker */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-0.5 h-6 bg-muted-foreground/50"
                  style={{ left: `${averagePosition}%` }}
                />
                
                {/* Your price marker */}
                <div 
                  className="absolute -top-6 transform -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${pricePosition}%` }}
                >
                  <span className="text-xs font-medium text-score-medium whitespace-nowrap">
                    Your price
                  </span>
                  <div className="w-4 h-4 rounded-full bg-score-medium border-2 border-card mt-1" />
                </div>
                
                {/* Suggested price marker */}
                <div 
                  className="absolute -bottom-6 transform -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${suggestedPosition}%` }}
                >
                  <div className="w-4 h-4 rounded-full bg-score-excellent border-2 border-card mb-1" />
                  <span className="text-xs font-medium text-score-excellent whitespace-nowrap">
                    Suggested
                  </span>
                </div>
              </div>
              
              {/* Min/Max labels */}
              <div className="flex justify-between mt-8 text-xs text-muted-foreground">
                <span>${priceData.minPrice.toLocaleString()}</span>
                <span className="text-foreground font-medium">
                  Avg: ${priceData.averagePrice.toLocaleString()}
                </span>
                <span>${priceData.maxPrice.toLocaleString()}</span>
              </div>
            </div>
          </section>
          
          {/* Price comparison */}
          <section className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Your Price</p>
              <p className="text-xl font-bold text-foreground">
                ${priceData.yourPrice.toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-score-excellent/5 border border-score-excellent/20">
              <p className="text-xs text-muted-foreground mb-1">Suggested Price</p>
              <p className="text-xl font-bold text-score-excellent">
                ${priceData.suggestedPrice.toLocaleString()}
              </p>
            </div>
          </section>
          
          {/* Impact */}
          <section className="p-4 rounded-xl bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-score-excellent" />
              <span className="text-sm font-medium text-foreground">Expected Impact</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Adjusting to the suggested price could increase lead generation by up to <span className="font-medium text-score-excellent">35%</span> based on similar listings
            </p>
          </section>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-border">
          <Button onClick={onApply} className="w-full" size="lg">
            <Check className="w-4 h-4 mr-2" />
            Apply Recommended Price
          </Button>
        </div>
      </div>
    </div>
  );
}
