import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  Eye, 
  Users, 
  Phone,
  CheckCircle2,
  Clock,
  Target,
  Sparkles,
  BarChart3,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CircularScore } from '@/components/scores/CircularScore';
import { useListing } from '@/contexts/ListingContext';

export default function PostPublishDashboard() {
  const navigate = useNavigate();
  const { scores, isFullyImproved, completedFixes } = useListing();

  const handleBack = () => {
    navigate('/listing-editor');
  };

  const completedCount = completedFixes.size;

  return (
    <DashboardLayout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Editor</span>
            </button>
            <h1 className="text-2xl font-bold text-foreground">Post-Publish Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              2019 Ford F-150 XLT • Published just now
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isFullyImproved ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-score-excellent/10 text-score-excellent font-medium">
                <CheckCircle2 className="w-5 h-5" />
                Fully Optimized
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-score-medium/10 text-score-medium font-medium">
                <Clock className="w-5 h-5" />
                {4 - completedCount} optimizations remaining
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Today</span>
            </div>
            <p className="text-3xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground mt-1">Views</p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Today</span>
            </div>
            <p className="text-3xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground mt-1">Unique Visitors</p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Today</span>
            </div>
            <p className="text-3xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground mt-1">Leads</p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-score-excellent/10">
                <TrendingUp className="w-5 h-5 text-score-excellent" />
              </div>
              <span className="text-xs text-muted-foreground">Predicted</span>
            </div>
            <p className="text-3xl font-bold text-score-excellent">{scores.leadLikelihood}%</p>
            <p className="text-sm text-muted-foreground mt-1">Lead Likelihood</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Score & Performance */}
          <div className="col-span-1 space-y-6">
            {/* Listing Score */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft-sm">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Listing Quality Score
              </h3>
              <CircularScore 
                score={scores.overall} 
                size="md" 
                label="Overall"
                animate={true}
              />
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Photos</span>
                  <span className="font-medium text-foreground">{scores.photos}/100</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Title</span>
                  <span className="font-medium text-foreground">{scores.title}/100</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Description</span>
                  <span className="font-medium text-foreground">{scores.description}/100</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium text-foreground">{scores.price}/100</span>
                </div>
              </div>
            </div>

            {/* Expected Performance */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-6">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Expected Performance
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your listing quality and market data
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Est. views this week</span>
                  <span className="font-semibold text-foreground">{isFullyImproved ? '120-180' : '45-75'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Est. leads this week</span>
                  <span className="font-semibold text-foreground">{isFullyImproved ? '4-8' : '1-3'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg. time to sell</span>
                  <span className="font-semibold text-foreground">{isFullyImproved ? '12-18 days' : '25-35 days'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Recommendations */}
          <div className="col-span-2 space-y-6">
            {/* Next Best Actions */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                {isFullyImproved ? 'Your Listing is Optimized!' : 'Next Best Actions'}
              </h3>
              
              {isFullyImproved ? (
                <div className="p-6 rounded-xl bg-score-excellent/5 border border-score-excellent/20 text-center">
                  <CheckCircle2 className="w-12 h-12 text-score-excellent mx-auto mb-4" />
                  <p className="text-foreground font-medium mb-2">
                    All optimizations complete!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your listing is now positioned for maximum visibility and lead generation. 
                    Monitor this dashboard for performance insights.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {!completedFixes.has('photos') && (
                    <div 
                      onClick={() => navigate('/fix-photos')}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-score-medium/10">
                          <span className="text-lg">📸</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Add missing photos</p>
                          <p className="text-sm text-muted-foreground">+15% expected lead increase</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  )}
                  
                  {!completedFixes.has('title') && (
                    <div 
                      onClick={() => navigate('/fix-title')}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-score-medium/10">
                          <span className="text-lg">✏️</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Optimize title</p>
                          <p className="text-sm text-muted-foreground">+10% expected click rate</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  )}
                  
                  {!completedFixes.has('description') && (
                    <div 
                      onClick={() => navigate('/fix-description')}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-score-medium/10">
                          <span className="text-lg">📝</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Improve description</p>
                          <p className="text-sm text-muted-foreground">+20% buyer trust score</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  )}
                  
                  {!completedFixes.has('price') && (
                    <div 
                      onClick={() => navigate('/fix-price')}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-score-medium/10">
                          <span className="text-lg">💰</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Adjust pricing</p>
                          <p className="text-sm text-muted-foreground">+35% lead potential</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Expected Lift */}
            <div className="bg-gradient-to-r from-score-excellent/10 to-primary/10 rounded-2xl border border-score-excellent/20 p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-score-excellent/20">
                  <TrendingUp className="w-6 h-6 text-score-excellent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {isFullyImproved ? 'Maximum Performance Achieved' : 'Potential Performance Lift'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {isFullyImproved 
                      ? 'Your listing is performing at its best potential'
                      : 'Complete all optimizations to unlock full potential'
                    }
                  </p>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-3xl font-bold text-score-excellent">
                        {isFullyImproved ? '+124%' : `+${Math.round(124 * (completedCount / 4))}%`}
                      </p>
                      <p className="text-sm text-muted-foreground">Lead increase</p>
                    </div>
                    <div className="w-px h-12 bg-border" />
                    <div>
                      <p className="text-3xl font-bold text-score-excellent">
                        {isFullyImproved ? '2x' : `${(1 + completedCount * 0.25).toFixed(1)}x`}
                      </p>
                      <p className="text-sm text-muted-foreground">Faster sale</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Editor Button */}
            <Button 
              onClick={handleBack} 
              variant="outline" 
              size="lg"
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Listing Editor
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
