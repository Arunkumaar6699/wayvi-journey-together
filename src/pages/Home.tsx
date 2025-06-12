import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import BottomNavigation from '@/components/BottomNavigation';
import { Search, MapPin, Calendar, Bell, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: ''
  });

  const handleContinue = () => {
    if (!searchData.from || !searchData.to || !searchData.date) {
      return;
    }
    navigate('/find-ride', { state: searchData });
  };

  const upcomingRides = [
    {
      id: 1,
      from: 'Koramangala',
      to: 'Electronic City',
      date: 'Today, 6:30 PM',
      driver: 'Priya S.',
      rating: 4.8,
      price: '₹80',
      type: 'booked'
    },
    {
      id: 2,
      from: 'Whitefield',
      to: 'Indiranagar',
      date: 'Tomorrow, 9:00 AM',
      driver: 'Arun K.',
      rating: 4.9,
      price: '₹120',
      type: 'offered'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="gradient-sky p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white text-lg font-medium">
              Hi {user?.name || 'there'}! 👋
            </h1>
            <p className="text-white/80 text-sm">Ready for your next ride?</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Bell className="text-white" size={20} />
          </div>
        </div>

        {/* Search Card */}
        <Card className="animate-scale-in">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Search size={20} className="text-gray-500" />
              <h2 className="font-semibold">Where to?</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <Input
                  placeholder="From"
                  value={searchData.from}
                  onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <Input
                  placeholder="To"
                  value={searchData.to}
                  onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500 ml-1" />
                <Input
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            
            <Button 
              onClick={handleContinue}
              disabled={!searchData.from || !searchData.to || !searchData.date}
              className="w-full gradient-sky text-white"
            >
              Continue
            </Button>
            
            <div className="flex gap-2 pt-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate('/find-ride', { state: searchData })}
              >
                Find a Ride
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate('/offer-ride', { state: searchData })}
              >
                Offer a Ride
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Rides */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Upcoming Rides</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/my-rides')}>
            View All <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>

        <div className="space-y-3">
          {upcomingRides.map((ride) => (
            <Card key={ride.id} className="animate-fade-in-up">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ride.type === 'booked' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {ride.type === 'booked' ? 'Booked' : 'Offered'}
                    </div>
                    <span className="text-sm text-gray-600">{ride.date}</span>
                  </div>
                  <span className="font-semibold text-lg">{ride.price}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-gray-500" />
                  <span className="text-sm">{ride.from} → {ride.to}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {ride.driver.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{ride.driver}</p>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600">{ride.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {upcomingRides.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="font-medium text-gray-800 mb-2">No upcoming rides</h3>
              <p className="text-gray-600 text-sm mb-4">Start by finding or offering a ride</p>
              <Button onClick={() => navigate('/find-ride')} className="gradient-sky text-white">
                Find a Ride
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;
