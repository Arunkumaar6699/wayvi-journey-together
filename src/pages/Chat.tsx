
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import BottomNavigation from '@/components/BottomNavigation';
import { ArrowLeft, Send, MapPin, Clock, Shield } from 'lucide-react';

const Chat = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const chats = [
    {
      id: 1,
      name: 'Priya Sharma',
      avatar: 'P',
      lastMessage: 'See you at 6:30 PM!',
      time: '2 min ago',
      unread: 2,
      ride: {
        from: 'Koramangala',
        to: 'Electronic City',
        date: 'Today, 6:30 PM'
      }
    },
    {
      id: 2,
      name: 'Arun Kumar',
      avatar: 'A',
      lastMessage: 'Thanks for confirming the ride',
      time: '1 hour ago',
      unread: 0,
      ride: {
        from: 'Whitefield',
        to: 'Indiranagar',
        date: 'Tomorrow, 9:00 AM'
      }
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Priya Sharma',
      message: 'Hi! I\'ve confirmed your booking for the ride to Electronic City.',
      time: '6:25 PM',
      isMe: false
    },
    {
      id: 2,
      sender: 'Me',
      message: 'Great! I\'ll be ready at the pickup point.',
      time: '6:26 PM',
      isMe: true
    },
    {
      id: 3,
      sender: 'Priya Sharma',
      message: 'Perfect! I\'ll message you when I\'m nearby.',
      time: '6:27 PM',
      isMe: false
    },
    {
      id: 4,
      sender: 'Priya Sharma',
      message: 'See you at 6:30 PM!',
      time: '6:28 PM',
      isMe: false
    }
  ];

  const sendMessage = () => {
    if (!message.trim()) return;
    // Handle sending message
    setMessage('');
  };

  if (selectedChat) {
    const chat = chats.find(c => c.id === selectedChat);
    
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Chat Header */}
        <div className="gradient-sky p-4 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedChat(null)}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">{chat?.avatar}</span>
            </div>
            <div>
              <h1 className="text-white font-semibold">{chat?.name}</h1>
              <div className="flex items-center gap-1 text-white/80 text-sm">
                <MapPin size={12} />
                <span>{chat?.ride.from} → {chat?.ride.to}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-white/80">
            <Shield size={16} />
            <span className="text-xs">Verified</span>
          </div>
        </div>

        {/* Ride Info Banner */}
        <div className="bg-blue-50 p-3 border-b">
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} className="text-blue-600" />
            <span className="text-blue-800 font-medium">{chat?.ride.date}</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isMe 
                    ? 'bg-primary text-white' 
                    : 'bg-white border'
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <p className={`text-xs mt-1 ${
                  msg.isMe ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage}
              className="gradient-sky text-white"
              size="sm"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="gradient-sky p-6 flex items-center gap-4">
        <div>
          <h1 className="text-white text-lg font-semibold">Messages</h1>
          <p className="text-white/80 text-sm">Chat with your ride partners</p>
        </div>
      </div>

      {/* Chat List */}
      <div className="p-6 space-y-4">
        {chats.map((chat) => (
          <Card 
            key={chat.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedChat(chat.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{chat.avatar}</span>
                  </div>
                  {chat.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{chat.unread}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{chat.lastMessage}</p>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={12} />
                    <span>{chat.ride.from} → {chat.ride.to}</span>
                    <span>•</span>
                    <span>{chat.ride.date}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {chats.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Send size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="font-medium text-gray-800 mb-2">No messages yet</h3>
              <p className="text-gray-600 text-sm">Your conversations will appear here once you book or offer rides</p>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Chat;
