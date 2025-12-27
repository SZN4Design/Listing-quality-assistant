import { cn } from '@/lib/utils';
import { X, Check, Camera, Sun, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PhotoChecklist } from '@/types/listing';

interface PhotosModalProps {
  isOpen: boolean;
  onClose: () => void;
  checklist: PhotoChecklist[];
  onMarkAdded: () => void;
}

export function PhotosModal({ isOpen, onClose, checklist, onMarkAdded }: PhotosModalProps) {
  if (!isOpen) return null;

  const missingPhotos = checklist.filter(item => !item.present);
  const presentPhotos = checklist.filter(item => item.present);

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
              <Camera className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Improve Photo Coverage</h2>
              <p className="text-sm text-muted-foreground">{missingPhotos.length} angles missing</p>
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
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Missing photos */}
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
          
          {/* Present photos */}
          {presentPhotos.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-score-excellent" />
                Already Added
              </h3>
              <div className="flex flex-wrap gap-2">
                {presentPhotos.map((item) => (
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
          )}
          
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
        
        {/* Footer */}
        <div className="p-6 border-t border-border">
          <Button onClick={onMarkAdded} className="w-full" size="lg">
            <Check className="w-4 h-4 mr-2" />
            Mark as Added
          </Button>
        </div>
      </div>
    </div>
  );
}
