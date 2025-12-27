import { cn } from '@/lib/utils';
import { Upload, X } from 'lucide-react';
import { Photo } from '@/types/listing';
import truckExterior1 from '@/assets/truck-exterior-1.jpg';
import truckInterior1 from '@/assets/truck-interior-1.jpg';

interface PhotoUploaderProps {
  photos: Photo[];
  isImproved?: boolean;
  className?: string;
}

// Map photo indices to actual images for demo purposes
const getPhotoImage = (index: number, isImproved: boolean) => {
  if (isImproved) {
    // For improved state, show the good images
    if (index === 0 || index === 1) return truckExterior1;
    if (index === 3 || index === 4) return truckInterior1;
    return truckExterior1;
  }
  // For initial state, show the first image but mark as low quality
  if (index === 0) return truckExterior1;
  if (index === 2) return truckInterior1;
  return null;
};

export function PhotoUploader({ photos, isImproved = false, className }: PhotoUploaderProps) {
  const getQualityBadge = (quality: Photo['quality']) => {
    const styles = {
      low: 'bg-score-low/90 text-primary-foreground',
      medium: 'bg-score-medium/90 text-primary-foreground',
      high: 'bg-score-excellent/90 text-primary-foreground'
    };
    return styles[quality];
  };

  return (
    <div className={cn('space-y-3', className)}>
      <label className="text-sm font-medium text-foreground">
        Photos ({photos.length}/12)
      </label>
      <div className="grid grid-cols-3 gap-3">
        {photos.map((photo, index) => {
          const imageSrc = getPhotoImage(index, isImproved);
          
          return (
            <div
              key={photo.id}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted border border-border group"
            >
              {imageSrc ? (
                <img 
                  src={imageSrc} 
                  alt={`Vehicle photo ${index + 1}`}
                  className={cn(
                    "w-full h-full object-cover",
                    !isImproved && photo.quality === 'low' && "brightness-75 contrast-90"
                  )}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="w-12 h-12 rounded-lg bg-muted-foreground/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              )}
              <div className={cn(
                'absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium capitalize',
                getQualityBadge(photo.quality)
              )}>
                {photo.quality}
              </div>
              <button className="absolute top-2 right-2 p-1.5 rounded-full bg-foreground/60 text-background opacity-0 group-hover:opacity-100 transition-opacity hover:bg-foreground/80">
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
        
        {/* Upload more slot */}
        {photos.length < 12 && (
          <button className="aspect-[4/3] rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-2">
            <Upload className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Add photo</span>
          </button>
        )}
      </div>
    </div>
  );
}
