
import { useState } from "react";
import { MessageCircle, Send, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ChatSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<'general' | 'pink-floyd' | null>('general');
  const [message, setMessage] = useState("");

  const chatRooms = [
    { id: 'general', name: 'General Discussion', members: 342, latest: 'Anyone selling Pink Floyd records?' },
    { id: 'pink-floyd', name: 'Pink Floyd Fans', members: 89, latest: 'Just got The Wall on original pressing!' },
    { id: 'vinyl-care', name: 'Vinyl Care Tips', members: 156, latest: 'Best cleaning solutions?' }
  ];

  const messages = {
    general: [
      { user: 'VinylCollector92', message: 'Anyone selling Pink Floyd records?', time: '2 min ago' },
      { user: 'MusicLover', message: 'Check out my Dark Side listing!', time: '5 min ago' },
      { user: 'RecordHunter', message: 'Looking for rare Beatles pressings', time: '8 min ago' }
    ],
    'pink-floyd': [
      { user: 'FloydFan', message: 'Just got The Wall on original pressing!', time: '1 min ago' },
      { user: 'WishYouWereHere', message: 'Amazing! What condition?', time: '3 min ago' },
      { user: 'ComfortablyNumb', message: 'I have Animals for sale if interested', time: '7 min ago' }
    ]
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage("");
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-6 bg-purple-600 hover:bg-purple-700 rounded-full w-14 h-14 p-0 shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-28 right-6 w-80 h-96 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <h3 className="text-white font-semibold">Community Chat</h3>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4 text-slate-400" />
        </Button>
      </div>

      <div className="flex h-full">
        {/* Chat rooms sidebar */}
        <div className="w-1/3 border-r border-slate-700 p-2">
          <div className="space-y-1">
            {chatRooms.map((room) => (
              <Button
                key={room.id}
                variant={activeChat === room.id ? "default" : "ghost"}
                size="sm"
                className={`w-full justify-start text-xs ${
                  activeChat === room.id ? 'bg-purple-600' : 'text-slate-300'
                }`}
                onClick={() => setActiveChat(room.id as any)}
              >
                <div className="flex flex-col items-start">
                  <span className="truncate">{room.name}</span>
                  <div className="flex items-center space-x-1 text-xs">
                    <Users className="h-3 w-3" />
                    <span>{room.members}</span>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-3 overflow-y-auto">
            <div className="space-y-2">
              {(messages[activeChat as keyof typeof messages] || []).map((msg, index) => (
                <div key={index} className="text-xs">
                  <div className="flex items-center space-x-1 mb-1">
                    <span className="font-medium text-purple-400">{msg.user}</span>
                    <span className="text-slate-500">{msg.time}</span>
                  </div>
                  <p className="text-slate-300">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Message input */}
          <div className="p-3 border-t border-slate-700">
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="bg-slate-700 border-slate-600 text-white text-xs"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;
