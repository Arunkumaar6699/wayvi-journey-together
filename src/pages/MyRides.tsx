
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BottomNavigation from '@/components/BottomNavigation';
import { ArrowLeft, MapPin, Clock, Users, Star, MessageSquare, Phone } from 'lucide-react';

const MyRides = () => {
  const navigate = useNavigate();

  const upcomingRides = [
    {
      id: 1,
      type: 'booked',
      from: 'Koramangala',
      to: 'Electronic City',
      date: 'Today',
      time: '6:30 PM',
      driver: 'Priya Sharma',
      rating: 4.8,
      price: 80,
      status: 'confirmed',
      seats: 1
    },
    {
      id: 2,
      type: 'offered',
      from: 'Whitefield',
      to: 'Indiranagar',
      date: 'Tomorrow',
      time: '9:00 AM',
      riders: ['Arun K.', 'Sneha R.'],
      price: 120,
      status: 'active',
      seatsBooked: 2,
      totalSeats: 4
    }
  ];

  const pastRides = [
    {
      id: 3,
      type: 'booked',
      from: 'HSR Layout',
      to: 'MG Road',
      date: 'Yesterday',
      time: '8:00 AM',
      driver: 'Raj Kumar',
      rating: 4.9,
      price: 60,
      status: 'completed',
      myRating: 5
    },
    {
      id: 4,
      type: 'offered',
      from: 'Jayanagar',
      to: 'Koramangala',
      date: '2 days ago',
      time: '7:30 PM',
      riders: ['Meera S.'],
      price: 40,
      status: 'completed',
      myRating: 4
    }
  ];

  const handleCancelRide = (rideId: number) => {
    // Handle cancellation logic
    console.log('Cancel ride:', rideId);
  };

  const handleRateRide = (rideId: number) => {
    // Handle rating logic
    console.log('Rate ride:', rideId);
  };

  const RideCard = ({ ride, isPast = false }: { ride: any; isPast?: boolean }) => (
    <Card className="animate-fade-in-up">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              ride.type === 'booked' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {ride.type === 'booked' ? 'Booked' : 'Offered'}
            </div>
            {!isPast && (
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                ride.status === 'confirmed' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {ride.status}
              </div>
            )}
          </div>
          <span className="font-bold text-lg">₹{ride.price}</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <MapPin size={16} className="text-gray-500" />
          <span className="text-sm font-medium">{ride.from} → {ride.to}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Clock size={16} className="text-gray-500" />
          <span className="text-sm text-gray-600">{ride.date}, {ride.time}</span>
        </div>

        {ride.type === 'booked' ? (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
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
          </div>
        ) : (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">
                {ride.type === 'offered' && !isPast ? 
                  `${ride.seatsBooked}/${ride.totalSeats} seats booked` :
                  `${ride.riders?.length || 0} riders`
                }
              </span>
            </div>
            {ride.riders && ride.riders.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {ride.riders.map((rider: string, index: number) => (
                  <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {rider}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          {!isPast ? (
            <>
              <Button variant="outline" size="sm" className="flex-1">
                <MessageSquare size={16} className="mr-1" />
                Chat
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Phone size={16} className="mr-1" />
                Call
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleCancelRide(ride.id)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              {!ride.myRating && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleRateRide(ride.id)}
                >
                  Rate Ride
                </Button>
              )}
              <Button variant="outline" size="sm" className="flex-1">
                Book Again
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="gradient-sky p-6 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-white text-lg font-semibold">My Rides</h1>
          <p className="text-white/80 text-sm">Manage your journeys</p>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingRides.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))}
            
            {upcomingRides.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock size={48} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-800 mb-2">No upcoming rides</h3>
                  <p className="text-gray-600 text-sm mb-4">Ready to plan your next journey?</p>
                  <Button 
                    onClick={() => navigate('/home')}
                    className="gradient-sky text-white"
                  >
                    Find a Ride
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {pastRides.map((ride) => (
              <RideCard key={ride.id} ride={ride} isPast={true} />
            ))}
            
            {pastRides.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Star size={48} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-800 mb-2">No ride history</h3>
                  <p className="text-gray-600 text-sm">Your completed rides will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default MyRides;
