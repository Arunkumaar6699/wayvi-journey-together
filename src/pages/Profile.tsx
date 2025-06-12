
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import BottomNavigation from '@/components/BottomNavigation';
import { 
  User, 
  Car, 
  Settings, 
  Shield, 
  Star, 
  Gift, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Trophy,
  Target
} from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { label: 'Total Rides', value: '23', icon: Car },
    { label: 'Rating', value: '4.8', icon: Star },
    { label: 'Rewards Points', value: '450', icon: Gift }
  ];

  const menuItems = [
    { icon: User, label: 'Edit Profile', action: () => navigate('/complete-profile') },
    { icon: Car, label: 'Vehicle Details', action: () => {} },
    { icon: Shield, label: 'Safety Center', action: () => {} },
    { icon: Bell, label: 'Notifications', action: () => {} },
    { icon: Gift, label: 'Rewards & Offers', action: () => navigate('/rewards') },
    { icon: HelpCircle, label: 'Help & Support', action: () => {} },
    { icon: Settings, label: 'Settings', action: () => {} }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="gradient-sky p-6">
        <div className="text-center text-white">
          <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <User size={40} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">{user?.name || 'User'}</h1>
          <p className="opacity-90">+91 {user?.phone}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Shield size={16} />
            <span className="text-sm">Verified Member</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <stat.icon size={24} className="text-primary mx-auto mb-2" />
                <div className="font-bold text-lg">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Trophy size={20} className="text-yellow-500" />
                Achievements
              </h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-1">
                  <Target size={20} className="text-green-600" />
                </div>
                <span className="text-xs text-center">First Ride</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                  <Star size={20} className="text-blue-600" />
                </div>
                <span className="text-xs text-center">5 Star Rating</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-1">
                  <Gift size={20} className="text-orange-600" />
                </div>
                <span className="text-xs text-center">Reward Hunter</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Driver Status */}
        {user?.isDriver && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Car size={20} className="text-primary" />
                  <div>
                    <h3 className="font-medium">Driver Mode</h3>
                    <p className="text-sm text-gray-600">Available to offer rides</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Menu Items */}
        <Card>
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className="text-gray-600" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button 
          onClick={handleLogout}
          variant="outline"
          className="w-full flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
        >
          <LogOut size={20} />
          Logout
        </Button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
