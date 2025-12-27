import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ListingEditor } from '@/components/listing/ListingEditor';
import { OptimizationDashboard } from '@/components/dashboard/OptimizationDashboard';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const Index = () => {
  const [view, setView] = useState<'editor' | 'optimization'>('editor');

  return (
    <DashboardLayout>
      {/* View Toggle */}
      <div className="sticky top-16 z-20 bg-background/80 backdrop-blur-sm border-b border-border px-8 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant={view === 'editor' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setView('editor')}
          >
            Listing Editor
          </Button>
          <Button
            variant={view === 'optimization' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setView('optimization')}
          >
            Post-Publish Dashboard
          </Button>
          
          <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            {view === 'editor' ? (
              <button
                onClick={() => setView('optimization')}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                View post-publish dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setView('editor')}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to editor
              </button>
            )}
          </div>
        </div>
      </div>
      
      {view === 'editor' ? <ListingEditor /> : <OptimizationDashboard />}
    </DashboardLayout>
  );
};

export default Index;
