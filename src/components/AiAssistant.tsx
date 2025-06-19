
import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const AiAssistant = () => {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full w-16 h-16 p-0 shadow-lg hover:shadow-xl transition-all duration-300 ml-auto"
          title="AI Music Assistant"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 bg-white rounded-2xl shadow-xl border-2 border-purple-200" 
        side="top" 
        align="end"
        sideOffset={20}
      >
        {/* Comic balloon tail */}
        <div className="absolute -bottom-3 right-8 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-purple-200"></div>
        <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-[13px] border-l-transparent border-r-[13px] border-r-transparent border-t-[13px] border-t-white"></div>
        
        {/* Header with mascot */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🎵</span>
            </div>
            <div className="text-white">
              <h3 className="font-semibold text-lg">RetroSpin AI</h3>
              <p className="text-purple-100 text-sm">Your Music Assistant</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="ml-auto text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Welcome message */}
        <div className="p-4 border-b border-gray-100">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-700 text-sm">
              👋 Welcome to RetroSpin! I'm here to help you discover amazing vinyl records, 
              answer questions about albums, artists, and help you find exactly what you're looking for. 
              How can I assist you today?
            </p>
          </div>
        </div>

        {/* Chat input */}
        <div className="p-4">
          <div className="flex space-x-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about music..."
              className="flex-1 resize-none border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={2}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg px-4 self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AiAssistant;
