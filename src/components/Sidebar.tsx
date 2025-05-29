
import { useState } from "react";
import { ChevronDown, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  
  const genres = ["Rock", "Jazz", "Blues", "Metal", "Punk", "Alternative", "Classic Rock", "Progressive"];
  const conditions = ["Mint", "Near Mint", "Very Good", "Good", "Fair"];
  const decades = ["2020s", "2010s", "2000s", "1990s", "1980s", "1970s", "1960s"];

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
    <div className="w-80 bg-slate-900 border-r border-slate-700 p-4 space-y-6">
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

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-white hover:text-purple-400">
          <span className="font-medium">Genre</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2">
          {genres.map((genre) => (
            <div key={genre} className="flex items-center space-x-2">
              <Checkbox id={genre} />
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
        <CollapsibleContent className="space-y-4 mt-2">
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
        <CollapsibleContent className="space-y-2 mt-2">
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox id={condition} />
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
        <CollapsibleContent className="space-y-2 mt-2">
          {decades.map((decade) => (
            <div key={decade} className="flex items-center space-x-2">
              <Checkbox id={decade} />
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
