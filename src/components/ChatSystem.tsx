
import { useState } from "react";
import { Users, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ChatSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<'general' | 'pink-floyd' | 'vinyl-care'>('general');
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({
    general: [
      { user: 'VinylCollector92', message: 'Anyone selling Pink Floyd records?', time: '2 min ago' },
      { user: 'MusicLover', message: 'Check out my Dark Side listing!', time: '5 min ago' },
      { user: 'RecordHunter', message: 'Looking for rare Beatles pressings', time: '8 min ago' }
    ],
    'pink-floyd': [
      { user: 'FloydFan', message: 'Just got The Wall on original pressing!', time: '1 min ago' },
      { user: 'WishYouWereHere', message: 'Amazing! What condition?', time: '3 min ago' },
      { user: 'ComfortablyNumb', message: 'I have Animals for sale if interested', time: '7 min ago' }
    ],
    'vinyl-care': [
      { user: 'VinylExpert', message: 'Best cleaning solutions?', time: '4 min ago' },
      { user: 'CarefulCollector', message: 'I use the Audio-Technica AT6012', time: '6 min ago' }
    ]
  });

  const chatRooms = [
    { id: 'general', name: 'General Discussion', members: 342, latest: 'Anyone selling Pink Floyd records?' },
    { id: 'pink-floyd', name: 'Pink Floyd Fans', members: 89, latest: 'Just got The Wall on original pressing!' },
    { id: 'vinyl-care', name: 'Vinyl Care Tips', members: 156, latest: 'Best cleaning solutions?' }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        user: 'You',
        message: message.trim(),
        time: 'now'
      };
      
      setMessages(prev => ({
        ...prev,
        [activeChat]: [newMessage, ...prev[activeChat]]
      }));
      
      setMessage("");
      console.log('Message sent:', newMessage);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-20 bg-purple-600 hover:bg-purple-700 rounded-full w-16 h-16 p-0 shadow-lg z-50"
      >
        <Users className="h-8 w-8" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-28 right-6 w-[480px] h-[600px] bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
        <h3 className="text-white font-semibold text-lg">Community Chat</h3>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          <X className="h-5 w-5 text-slate-400" />
        </Button>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Chat rooms sidebar */}
        <div className="w-2/5 border-r border-slate-700 p-3 flex-shrink-0">
          <div className="space-y-3">
            {chatRooms.map((room) => (
              <Button
                key={room.id}
                variant={activeChat === room.id ? "default" : "ghost"}
                size="sm"
                className={`w-full justify-start text-sm p-3 h-auto ${
                  activeChat === room.id ? 'bg-purple-600' : 'text-slate-300'
                }`}
                onClick={() => setActiveChat(room.id as any)}
              >
                <div className="flex flex-col items-start w-full space-y-1">
                  <span className="truncate font-medium text-left">{room.name}</span>
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
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 p-4 overflow-y-auto min-h-0">
            <div className="space-y-4">
              {messages[activeChat].map((msg, index) => (
                <div key={index} className="text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`font-medium ${msg.user === 'You' ? 'text-green-400' : 'text-purple-400'}`}>
                      {msg.user}
                    </span>
                    <span className="text-slate-500 text-xs">{msg.time}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-1">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Message input */}
          <div className="p-4 border-t border-slate-700 flex-shrink-0">
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="bg-slate-700 border-slate-600 text-white text-sm flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button size="sm" onClick={handleSendMessage} disabled={!message.trim()} className="flex-shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;
