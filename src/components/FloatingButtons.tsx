
import { MessageCircle, Crown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const FloatingButtons = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'flea' | 'premium'>('all');

  return (
    <div className="fixed bottom-24 right-6 flex flex-col space-y-3 z-40">
      {/* AI Assistant */}
      <Button
        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        title="AI Music Assistant"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>

      {/* Premium Filter */}
      <Button
        onClick={() => setSelectedFilter(selectedFilter === 'premium' ? 'all' : 'premium')}
        className={`rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          selectedFilter === 'premium' 
            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' 
            : 'bg-slate-700 hover:bg-slate-600 text-white'
        }`}
        title="Premium Albums"
      >
        <Crown className="h-5 w-5" />
        {selectedFilter === 'premium' && (
          <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 rounded-full">
            ✓
          </Badge>
        )}
      </Button>

      {/* Flea Market Filter */}
      <Button
        onClick={() => setSelectedFilter(selectedFilter === 'flea' ? 'all' : 'flea')}
        className={`rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          selectedFilter === 'flea' 
            ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-black' 
            : 'bg-slate-700 hover:bg-slate-600 text-white'
        }`}
        title="Flea Market Albums"
      >
        <ShoppingCart className="h-5 w-5" />
        {selectedFilter === 'flea' && (
          <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 rounded-full">
            ✓
          </Badge>
        )}
      </Button>
    </div>
  );
};

export default FloatingButtons;
