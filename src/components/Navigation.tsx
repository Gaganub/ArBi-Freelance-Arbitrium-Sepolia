import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WalletButton } from "./WalletButton";
import { Code, Users } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative">
            <Code className="h-8 w-8 text-primary" />
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent"></div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ArbiFreelance
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/jobs" 
            className={`transition-colors hover:text-primary ${
              isActive('/jobs') ? 'text-primary font-medium' : 'text-muted-foreground'
            }`}
          >
            Browse Jobs
          </Link>
          <Link 
            to="/dashboard" 
            className={`transition-colors hover:text-primary ${
              isActive('/dashboard') ? 'text-primary font-medium' : 'text-muted-foreground'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/disputes" 
            className={`transition-colors hover:text-primary ${
              isActive('/disputes') ? 'text-primary font-medium' : 'text-muted-foreground'
            }`}
          >
            Disputes
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          <WalletButton />
          <Button size="sm">
            <Users className="mr-2 h-4 w-4" />
            Post Job
          </Button>
        </div>
      </div>
    </nav>
  );
};