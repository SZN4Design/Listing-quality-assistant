import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Check, Camera, Sun, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useListing } from '@/contexts/ListingContext';
import { photoChecklist } from '@/data/mockData';

export default function FixPhotos() {
  const navigate = useNavigate();
  const { applyFix, completedFixes } = useListing();

  const isAlreadyFixed = completedFixes.has('photos');
  const missingPhotos = photoChecklist.filter(item => !item.present);
  const presentPhotos = photoChecklist.filter(item => item.present);

  const handleMarkAdded = () => {
    applyFix('photos');
    navigate('/listing-editor');
  };

  const handleBack = () => {
    navigate('/listing-editor');
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-8">
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
        <div className="bg-card rounded-2xl border border-border shadow-soft-lg overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center gap-3 p-6 border-b border-border">
            <div className="p-2 rounded-lg bg-primary/10">
              <Camera className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Improve Photo Coverage</h1>
              <p className="text-sm text-muted-foreground">
                {isAlreadyFixed ? 'All photos added!' : `${missingPhotos.length} angles missing`}
              </p>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Missing photos */}
            {!isAlreadyFixed && (
              <section>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-score-medium" />
                  Missing Angles
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {missingPhotos.map((item) => (
                    <div
                      key={item.angle}
                      className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-score-medium/30 bg-score-medium/5"
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.required ? 'Required' : 'Recommended'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Present photos */}
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-score-excellent" />
                {isAlreadyFixed ? 'All Photos Complete' : 'Already Added'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(isAlreadyFixed ? photoChecklist : presentPhotos).map((item) => (
                  <span
                    key={item.angle}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-score-excellent/10 text-score-excellent text-sm"
                  >
                    <Check className="w-3.5 h-3.5" />
                    {item.label}
                  </span>
                ))}
              </div>
            </section>
            
            {/* Tips */}
            <section className="bg-muted/50 rounded-xl p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                <Sun className="w-4 h-4 text-score-medium" />
                Photo Tips
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                  Shoot in natural daylight or well-lit areas
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                  Clean the vehicle before photographing
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                  Use landscape orientation for consistency
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                  Avoid reflections and shadows on body panels
                </li>
              </ul>
            </section>
          </div>

          {/* Card Footer */}
          <div className="p-6 border-t border-border">
            {isAlreadyFixed ? (
              <Button onClick={handleBack} className="w-full" size="lg" variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Editor
              </Button>
            ) : (
              <Button onClick={handleMarkAdded} className="w-full" size="lg">
                <Check className="w-4 h-4 mr-2" />
                Mark as Added
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
