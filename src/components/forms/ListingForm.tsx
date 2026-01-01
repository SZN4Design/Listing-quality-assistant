import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PhotoUploader } from './PhotoUploader';
import { ListingData } from '@/types/listing';

interface ListingFormProps {
  listing: ListingData;
  isImproved?: boolean;
  className?: string;
}

export function ListingForm({ listing, isImproved = false, className }: ListingFormProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <PhotoUploader photos={listing.photos} isImproved={isImproved} />
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={listing.title}
            className="bg-card"
            readOnly
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={listing.description}
            className="bg-card min-h-[120px] resize-none"
            readOnly
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="price"
                type="text"
                value={listing.price.toLocaleString()}
                className="bg-card pl-7"
                readOnly
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mileage">Mileage</Label>
            <Input
              id="mileage"
              type="text"
              value={listing.mileage.toLocaleString()}
              className="bg-card"
              readOnly
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              value={listing.year}
              className="bg-card"
              readOnly
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="make">Make</Label>
            <Input
              id="make"
              value={listing.make}
              className="bg-card"
              readOnly
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={listing.model}
              className="bg-card"
              readOnly
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trim">Trim</Label>
            <Input
              id="trim"
              value={listing.trim}
              className="bg-card"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
