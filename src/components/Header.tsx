
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <h1 className="text-2xl font-bold text-white">RetroSpin</h1>
        </div>
        
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search albums, artists, or genres..."
              className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-end flex-1">
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-800">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
