
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { usePlayer } from "@/contexts/PlayerContext";
import AiAssistant from "./AiAssistant";

const PlayerBar = () => {
  const { currentAlbum, isPlaying, setIsPlaying } = usePlayer();
  const [volume, setVolume] = useState([75]);
  const [progress, setProgress] = useState([70]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Currently Playing */}
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <img 
            src={currentAlbum?.imageUrl || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop"} 
            alt="Now Playing"
            className="w-12 h-12 rounded object-cover"
          />
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">
              {currentAlbum?.title || "Comfortably Numb"}
            </p>
            <p className="text-slate-400 text-xs truncate">
              {currentAlbum?.artist || "Pink Floyd"}
            </p>
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
            <div className="flex-1">
              <style>
                {`
                  .inverted-progress .bg-secondary {
                    background-color: hsl(var(--primary)) !important;
                  }
                  .inverted-progress .bg-primary {
                    background-color: hsl(var(--secondary)) !important;
                  }
                `}
              </style>
              <Slider
                value={progress}
                onValueChange={setProgress}
                max={100}
                step={1}
                className="flex-1 inverted-progress"
              />
            </div>
            <span className="text-xs text-slate-400">4:32</span>
          </div>
        </div>

        {/* Volume and AI Assistant */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4 text-slate-400" />
            <div>
              <style>
                {`
                  .inverted-volume .bg-secondary {
                    background-color: hsl(var(--primary)) !important;
                  }
                  .inverted-volume .bg-primary {
                    background-color: hsl(var(--secondary)) !important;
                  }
                `}
              </style>
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="w-24 inverted-volume"
              />
            </div>
          </div>
          
          {/* AI Assistant positioned at extreme right with more padding */}
          <div className="pr-6">
            <AiAssistant />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
