
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingButtons = () => {
  return (
    <Button
      className="fixed bottom-28 right-6 bg-blue-600 hover:bg-blue-700 rounded-full w-16 h-16 p-0 shadow-lg z-50"
      onClick={() => console.log('AI Assistant clicked')}
    >
      <MessageSquare className="h-8 w-8" />
    </Button>
  );
};

export default FloatingButtons;
