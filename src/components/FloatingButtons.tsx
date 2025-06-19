
import { MessageCircle, Bot, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAIAssist, setShowAIAssist] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAIAssist = () => {
    setShowAIAssist(true);
    // In a real implementation, this would open the AI assistant
    console.log("AI Assistant activated");
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
        {showScrollTop && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={scrollToTop}
                size="lg"
                className="w-14 h-14 rounded-full bg-slate-700 hover:bg-slate-600 text-white shadow-lg border border-slate-600"
              >
                <ArrowUp className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-slate-700 text-white border-slate-600">
              <p>Back to top</p>
            </TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleAIAssist}
              size="lg"
              className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
            >
              <Bot className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-slate-700 text-white border-slate-600 max-w-48">
            <div className="space-y-1">
              <p className="font-semibold">AI Music Assistant</p>
              <p className="text-sm text-slate-300">
                Get personalized recommendations, pricing help, and instant answers about albums and artists
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default FloatingButtons;
