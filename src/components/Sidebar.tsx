
import { useState } from "react";
import { ChevronDown, ChevronRight, Filter, Crown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useFilters } from "@/contexts/FilterContext";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {
    selectedGenres,
    setSelectedGenres,
    selectedConditions,
    setSelectedConditions,
    selectedDecades,
    setSelectedDecades,
    priceRange,
    setPriceRange,
    categoryFilter,
    setCategoryFilter
  } = useFilters();
  
  const genres = ["Rock", "Jazz", "Blues", "Metal", "Punk", "Alternative", "Classic Rock", "Progressive"];
  const conditions = ["Mint", "Near Mint", "Very Good", "Good", "Fair"];
  const decades = ["2020s", "2010s", "2000s", "1990s", "1980s", "1970s", "1960s"];

  const handleGenreChange = (genre: string, checked: boolean) => {
    if (checked) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    }
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    if (checked) {
      setSelectedConditions([...selectedConditions, condition]);
    } else {
      setSelectedConditions(selectedConditions.filter(c => c !== condition));
    }
  };

  const handleDecadeChange = (decade: string, checked: boolean) => {
    if (checked) {
      setSelectedDecades([...selectedDecades, decade]);
    } else {
      setSelectedDecades(selectedDecades.filter(d => d !== decade));
    }
  };

  if (isCollapsed) {
    return (
      <div className="w-12 bg-slate-900 border-r border-slate-700 p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(false)}
          className="text-white hover:bg-slate-800"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 bg-slate-900 border-r border-slate-700 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(true)}
          className="text-white hover:bg-slate-800"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Special Filters Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white mb-3">Album Categories</h4>
        
        {/* Premium Filter */}
        <Button
          onClick={() => setCategoryFilter(categoryFilter === 'premium' ? 'all' : 'premium')}
          className={`w-full justify-start space-x-3 h-12 ${
            categoryFilter === 'premium' 
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600' 
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'
          }`}
        >
          <Crown className="h-5 w-5" />
          <span className="font-medium">Premium Albums</span>
          {categoryFilter === 'premium' && (
            <Badge className="ml-auto bg-green-500 text-white text-xs">
              ✓
            </Badge>
          )}
        </Button>

        {/* Flea Market Filter */}
        <Button
          onClick={() => setCategoryFilter(categoryFilter === 'flea' ? 'all' : 'flea')}
          className={`w-full justify-start space-x-3 h-12 ${
            categoryFilter === 'flea' 
              ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-black hover:from-green-500 hover:to-emerald-600' 
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="font-medium">Flea Market</span>
          {categoryFilter === 'flea' && (
            <Badge className="ml-auto bg-green-500 text-white text-xs">
              ✓
            </Badge>
          )}
        </Button>
      </div>

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-white hover:text-purple-400">
          <span className="font-medium">Genre</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2 pl-2">
          {genres.map((genre) => (
            <div key={genre} className="flex items-center space-x-2">
              <Checkbox 
                id={genre} 
                checked={selectedGenres.includes(genre)}
                onCheckedChange={(checked) => handleGenreChange(genre, checked as boolean)}
              />
              <label htmlFor={genre} className="text-sm text-slate-300 cursor-pointer">
                {genre}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-white hover:text-purple-400">
          <span className="font-medium">Price Range</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-2 pl-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={500}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-slate-400">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-white hover:text-purple-400">
          <span className="font-medium">Condition</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2 pl-2">
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox 
                id={condition} 
                checked={selectedConditions.includes(condition)}
                onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
              />
              <label htmlFor={condition} className="text-sm text-slate-300 cursor-pointer">
                {condition}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-white hover:text-purple-400">
          <span className="font-medium">Era</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2 pl-2">
          {decades.map((decade) => (
            <div key={decade} className="flex items-center space-x-2">
              <Checkbox 
                id={decade} 
                checked={selectedDecades.includes(decade)}
                onCheckedChange={(checked) => handleDecadeChange(decade, checked as boolean)}
              />
              <label htmlFor={decade} className="text-sm text-slate-300 cursor-pointer">
                {decade}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Sidebar;
