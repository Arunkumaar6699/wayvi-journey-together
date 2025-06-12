
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import BottomNavigation from '@/components/BottomNavigation';
import { ArrowLeft, MapPin, Clock, Users, Star, Filter, Car } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const FindRide = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchData = location.state || {};
  
  const [filters, setFilters] = useState({
    from: searchData.from || '',
    to: searchData.to || '',
    date: searchData.date || '',
    maxPrice: '',
    timeRange: 'any'
  });

  const availableRides = [
    {
      id: 1,
      driver: {
        name: 'Priya Sharma',
        rating: 4.8,
        trips: 145,
        avatar: 'P'
      },
      from: 'Koramangala',
      to: 'Electronic City',
      time: '6:30 PM',
      date: 'Today',
      price: 80,
      seats: 2,
      car: 'Honda City',
      preferences: ['AC', 'Music OK', 'No Smoking'],
      duration: '35 min'
    },
    {
      id: 2,
      driver: {
        name: 'Arun Kumar',
        rating: 4.9,
        trips: 200,
        avatar: 'A'
      },
      from: 'Koramangala',
      to: 'Electronic City',
      time: '7:00 PM',
      date: 'Today',
      price: 75,
      seats: 1,
      car: 'Maruti Swift',
      preferences: ['AC', 'No Music', 'No Smoking'],
      duration: '40 min'
    },
    {
      id: 3,
      driver: {
        name: 'Sneha Reddy',
        rating: 4.7,
        trips: 89,
        avatar: 'S'
      },
      from: 'Koramangala',
      to: 'Electronic City',
      time: '8:15 PM',
      date: 'Today',
      price: 90,
      seats: 3,
      car: 'Hyundai Verna',
      preferences: ['AC', 'Music OK', 'No Smoking'],
      duration: '30 min'
    }
  ];

  const handleBookRide = (rideId: number) => {
    toast({
      title: "Booking request sent!",
      description: "You'll be notified once the driver confirms",
    });
    navigate('/my-rides');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="gradient-sky p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-white text-lg font-semibold">Find a Ride</h1>
            <p className="text-white/80 text-sm">Choose your perfect match</p>
          </div>
        </div>

        {/* Search Filters */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="From"
                value={filters.from}
                onChange={(e) => setFilters({...filters, from: e.target.value})}
              />
              <Input
                placeholder="To"
                value={filters.to}
                onChange={(e) => setFilters({...filters, to: e.target.value})}
              />
            </div>
            
            <div className="flex gap-2">
              <Input
                type="date"
                className="flex-1"
                value={filters.date}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
              />
              <Button variant="outline" size="sm">
                <Filter size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{availableRides.length} rides available</h3>
          <div className="text-sm text-gray-600">
            Sorted by departure time
          </div>
        </div>

        <div className="space-y-4">
          {availableRides.map((ride) => (
            <Card key={ride.id} className="animate-fade-in-up hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                {/* Driver Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{ride.driver.avatar}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{ride.driver.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-500 fill-current" />
                          <span>{ride.driver.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{ride.driver.trips} trips</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">₹{ride.price}</div>
                    <div className="text-sm text-gray-600">per seat</div>
                  </div>
                </div>

                {/* Route & Time */}
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} className="text-gray-500" />
                  <span className="text-sm font-medium">{ride.from} → {ride.to}</span>
                </div>

                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{ride.time} • {ride.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{ride.seats} seats left</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car size={16} />
                    <span>{ride.car}</span>
                  </div>
                </div>

                {/* Preferences */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {ride.preferences.map((pref, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {pref}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate('/chat')}
                  >
                    Message
                  </Button>
                  <Button 
                    className="flex-1 gradient-sky text-white"
                    onClick={() => handleBookRide(ride.id)}
                  >
                    Book Ride
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {availableRides.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Car size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="font-medium text-gray-800 mb-2">No rides found</h3>
              <p className="text-gray-600 text-sm mb-4">Try adjusting your search criteria</p>
              <Button className="gradient-sky text-white">
                Offer a Ride Instead
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default FindRide;
