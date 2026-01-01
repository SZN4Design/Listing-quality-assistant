import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Car, 
  MessageSquare, 
  BarChart3, 
  Settings,
  Bell,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <header className="h-14 md:h-16 border-b border-border bg-card px-3 md:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4 md:gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary flex items-center justify-center">
              <Car className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-base md:text-lg text-foreground">AutoDealer</span>
          </div>
          
          {/* Main Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavItem icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" />
            <NavItem icon={<Car className="w-4 h-4" />} label="Inventory" active />
            <NavItem icon={<MessageSquare className="w-4 h-4" />} label="Leads" badge={12} />
            <NavItem icon={<BarChart3 className="w-4 h-4" />} label="Analytics" />
          </nav>
        </div>
        
        <div className="flex items-center gap-1.5 md:gap-3">
          <button className="p-1.5 md:p-2 rounded-lg hover:bg-muted transition-colors relative">
            <Bell className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 md:top-1.5 md:right-1.5 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-destructive" />
          </button>
          <button className="hidden sm:block p-1.5 md:p-2 rounded-lg hover:bg-muted transition-colors">
            <HelpCircle className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
          </button>
          <button className="hidden sm:block p-1.5 md:p-2 rounded-lg hover:bg-muted transition-colors">
            <Settings className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
          </button>
          
          <div className="hidden sm:block h-8 w-px bg-border mx-1 md:mx-2" />
          
          {/* User menu */}
          <button className="flex items-center gap-1.5 md:gap-2 p-1 md:p-1.5 rounded-lg hover:bg-muted transition-colors">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs md:text-sm font-medium text-primary">JD</span>
            </div>
            <span className="text-sm font-medium text-foreground hidden lg:block">John Dealer</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground hidden lg:block" />
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-6 py-4">
        <p className="text-center text-sm text-muted-foreground">
          Listing Quality Assistant — Product Concept by Sabrina Mohammed
        </p>
      </footer>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
}

function NavItem({ icon, label, active, badge }: NavItemProps) {
  return (
    <button 
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        active 
          ? 'bg-primary/10 text-primary' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      )}
    >
      {icon}
      {label}
      {badge && (
        <span className="px-1.5 py-0.5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
          {badge}
        </span>
      )}
    </button>
  );
}
