
import { useState } from "react";
import { Bell, X, Check, Clock, Gavel, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'bid' as const,
      title: 'New Bid on Pink Floyd - The Wall',
      message: 'Someone placed a bid of $45 on your listing',
      time: '2 min ago',
      read: false
    },
    {
      id: 2,
      type: 'sale' as const,
      title: 'Sale Completed',
      message: 'Beatles - Abbey Road sold for $32',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'outbid' as const,
      title: 'You\'ve been outbid',
      message: 'Led Zeppelin IV - Current bid is now $67',
      time: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'message' as const,
      title: 'New Message',
      message: 'VinylCollector92 sent you a message about your listing',
      time: '1 day ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'bid':
      case 'outbid':
        return <Gavel className="h-4 w-4" />;
      case 'sale':
        return <ShoppingCart className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bid':
        return 'text-green-400';
      case 'outbid':
        return 'text-red-400';
      case 'sale':
        return 'text-blue-400';
      default:
        return 'text-purple-400';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-slate-300 hover:text-white hover:bg-slate-800 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center p-0">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute top-16 right-0 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 max-h-96 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h3 className="text-white font-semibold">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Mark all read
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4 text-slate-400" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-slate-400">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="p-2">
                {notifications.map((notification) => (
                  <Card 
                    key={notification.id}
                    className={`mb-2 p-3 cursor-pointer transition-colors ${
                      notification.read 
                        ? 'bg-slate-700/50 border-slate-600' 
                        : 'bg-slate-700 border-slate-600 hover:bg-slate-650'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`mt-1 ${getTypeColor(notification.type)}`}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className={`text-sm font-medium truncate ${
                            notification.read ? 'text-slate-300' : 'text-white'
                          }`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className={`text-xs mt-1 ${
                          notification.read ? 'text-slate-400' : 'text-slate-300'
                        }`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-1 mt-2">
                          <Clock className="h-3 w-3 text-slate-500" />
                          <span className="text-xs text-slate-500">{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationPanel;
