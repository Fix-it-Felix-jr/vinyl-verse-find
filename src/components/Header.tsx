
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">RS</span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              RetroSpin
            </h1>
          </div>
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
          <Button 
            variant="ghost" 
            size="lg" 
            className="text-white hover:bg-slate-800 p-6"
            onClick={() => navigate('/profile')}
          >
            <User className="h-14 w-14" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
