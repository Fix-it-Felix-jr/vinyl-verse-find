
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const PlayerBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [progress, setProgress] = useState([30]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Currently Playing */}
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <img 
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop" 
            alt="Now Playing"
            className="w-12 h-12 rounded object-cover"
          />
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">Comfortably Numb</p>
            <p className="text-slate-400 text-xs truncate">Pink Floyd</p>
          </div>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white text-black hover:bg-slate-200 rounded-full w-8 h-8 p-0"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-slate-400">1:23</span>
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-slate-400">4:32</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <Volume2 className="h-4 w-4 text-slate-400" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
