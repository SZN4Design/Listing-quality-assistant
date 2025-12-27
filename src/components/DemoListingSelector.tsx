import { ChevronDown, FileText } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { demoListings, DemoListing } from '@/data/demoListings';

interface DemoListingSelectorProps {
  onSelect: (demo: DemoListing) => void;
}

export function DemoListingSelector({ onSelect }: DemoListingSelectorProps) {
  const getQualityColor = (id: DemoListing['id']) => {
    switch (id) {
      case 'low': return 'text-score-low';
      case 'medium': return 'text-score-medium';
      case 'high': return 'text-score-excellent';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FileText className="w-4 h-4" />
          Load demo listing
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 bg-popover z-50">
        {demoListings.map((demo) => (
          <DropdownMenuItem
            key={demo.id}
            onClick={() => onSelect(demo)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{demo.label}</span>
            <span className={`text-xs font-medium ${getQualityColor(demo.id)}`}>
              {demo.scores.overall}/100
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
