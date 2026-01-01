import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Check, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useListing } from '@/contexts/ListingContext';
import { marketPriceData } from '@/data/mockData';

export default function FixPrice() {
  const navigate = useNavigate();
  const { applyFix, completedFixes } = useListing();

  const isAlreadyFixed = completedFixes.has('price');
  const priceData = marketPriceData;

  const pricePosition = ((priceData.yourPrice - priceData.minPrice) / (priceData.maxPrice - priceData.minPrice)) * 100;
  const suggestedPosition = ((priceData.suggestedPrice - priceData.minPrice) / (priceData.maxPrice - priceData.minPrice)) * 100;
  const averagePosition = ((priceData.averagePrice - priceData.minPrice) / (priceData.maxPrice - priceData.minPrice)) * 100;

  const handleApply = () => {
    applyFix('price');
    navigate('/listing-editor');
  };

  const handleBack = () => {
    navigate('/listing-editor');
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Editor</span>
          </button>
          <button
            onClick={handleBack}
            className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-card rounded-xl md:rounded-2xl border border-border shadow-soft-lg overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center gap-3 p-4 md:p-6 border-b border-border">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Price Analysis</h1>
              <p className="text-sm text-muted-foreground">
                {isAlreadyFixed ? 'Price optimized!' : 'Based on market data'}
              </p>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-4 md:p-6 space-y-6">
            {/* Alert */}
            {!isAlreadyFixed && (
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
            )}

            {isAlreadyFixed && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-score-excellent/10 border border-score-excellent/20">
                <Check className="w-5 h-5 text-score-excellent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Price competitively adjusted
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Your listing is now priced to attract more buyers
                  </p>
                </div>
              </div>
            )}
            
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
                  {!isAlreadyFixed && (
                    <div 
                      className="absolute -top-6 transform -translate-x-1/2 flex flex-col items-center"
                      style={{ left: `${pricePosition}%` }}
                    >
                      <span className="text-xs font-medium text-score-medium whitespace-nowrap">
                        Your price
                      </span>
                      <div className="w-4 h-4 rounded-full bg-score-medium border-2 border-card mt-1" />
                    </div>
                  )}
                  
                  {/* Suggested/Current price marker */}
                  <div 
                    className="absolute -bottom-6 transform -translate-x-1/2 flex flex-col items-center"
                    style={{ left: `${suggestedPosition}%` }}
                  >
                    <div className="w-4 h-4 rounded-full bg-score-excellent border-2 border-card mb-1" />
                    <span className="text-xs font-medium text-score-excellent whitespace-nowrap">
                      {isAlreadyFixed ? 'Your price' : 'Suggested'}
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
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl ${isAlreadyFixed ? 'bg-muted/30' : 'bg-muted/50'} border border-border`}>
                <p className="text-xs text-muted-foreground mb-1">
                  {isAlreadyFixed ? 'Previous Price' : 'Your Price'}
                </p>
                <p className={`text-xl font-bold ${isAlreadyFixed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                  ${priceData.yourPrice.toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-score-excellent/5 border border-score-excellent/20">
                <p className="text-xs text-muted-foreground mb-1">
                  {isAlreadyFixed ? 'Current Price' : 'Suggested Price'}
                </p>
                <p className="text-xl font-bold text-score-excellent">
                  ${priceData.suggestedPrice.toLocaleString()}
                </p>
              </div>
            </section>
            
            {/* Impact */}
            <section className="p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-score-excellent" />
                <span className="text-sm font-medium text-foreground">
                  {isAlreadyFixed ? 'Impact Achieved' : 'Expected Impact'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {isAlreadyFixed 
                  ? <>Your price adjustment has improved competitiveness and increased lead generation potential by up to <span className="font-medium text-score-excellent">35%</span></>
                  : <>Adjusting to the suggested price could increase lead generation by up to <span className="font-medium text-score-excellent">35%</span> based on similar listings</>
                }
              </p>
            </section>
          </div>

          {/* Card Footer */}
          <div className="p-4 md:p-6 border-t border-border">
            {isAlreadyFixed ? (
              <Button onClick={handleBack} className="w-full" size="lg" variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Editor
              </Button>
            ) : (
              <Button onClick={handleApply} className="w-full" size="lg">
                <Check className="w-4 h-4 mr-2" />
                Apply Recommended Price
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
