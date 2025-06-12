
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import BottomNavigation from '@/components/BottomNavigation';
import { ArrowLeft, MapPin, Clock, Users, DollarSign, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const OfferRide = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchData = location.state || {};
  
  const [rideData, setRideData] = useState({
    from: searchData.from || '',
    to: searchData.to || '',
    date: searchData.date || '',
    time: '',
    seats: '1',
    price: '',
    preferences: '',
    stopovers: []
  });

  const handlePublish = () => {
    if (!rideData.from || !rideData.to || !rideData.date || !rideData.time || !rideData.price) {
      toast({
        title: "Please complete all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate publishing ride
    toast({
      title: "Ride published successfully!",
      description: "You'll get notified when someone books your ride",
    });
    navigate('/my-rides');
  };

  const addStopover = () => {
    setRideData({
      ...rideData,
      stopovers: [...rideData.stopovers, '']
    });
  };

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
          <h1 className="text-white text-lg font-semibold">Offer a Ride</h1>
          <p className="text-white/80 text-sm">Share your journey, earn rewards</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Route Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin size={20} />
              Route Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>From *</Label>
              <Input
                placeholder="Starting location"
                value={rideData.from}
                onChange={(e) => setRideData({...rideData, from: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label>To *</Label>
              <Input
                placeholder="Destination"
                value={rideData.to}
                onChange={(e) => setRideData({...rideData, to: e.target.value})}
              />
            </div>

            {/* Stopovers */}
            {rideData.stopovers.map((stopover, index) => (
              <div key={index} className="space-y-2">
                <Label>Stopover {index + 1}</Label>
                <Input
                  placeholder="Optional stopover"
                  value={stopover}
                  onChange={(e) => {
                    const newStopovers = [...rideData.stopovers];
                    newStopovers[index] = e.target.value;
                    setRideData({...rideData, stopovers: newStopovers});
                  }}
                />
              </div>
            ))}
            
            <Button 
              variant="outline" 
              onClick={addStopover}
              className="w-full"
            >
              <Plus size={16} className="mr-2" />
              Add Stopover
            </Button>
          </CardContent>
        </Card>

        {/* Time & Seats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={20} />
              Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date *</Label>
                <Input
                  type="date"
                  value={rideData.date}
                  onChange={(e) => setRideData({...rideData, date: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Time *</Label>
                <Input
                  type="time"
                  value={rideData.time}
                  onChange={(e) => setRideData({...rideData, time: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Capacity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              Pricing & Capacity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Available Seats *</Label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={rideData.seats}
                  onChange={(e) => setRideData({...rideData, seats: e.target.value})}
                >
                  <option value="1">1 seat</option>
                  <option value="2">2 seats</option>
                  <option value="3">3 seats</option>
                  <option value="4">4 seats</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label>Price per seat *</Label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-3 text-gray-500" />
                  <Input
                    type="number"
                    placeholder="₹"
                    className="pl-8"
                    value={rideData.price}
                    onChange={(e) => setRideData({...rideData, price: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Any preferences or special instructions for riders..."
              value={rideData.preferences}
              onChange={(e) => setRideData({...rideData, preferences: e.target.value})}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Publish Button */}
        <Button 
          onClick={handlePublish}
          className="w-full gradient-sky text-white py-3"
        >
          Publish Ride
        </Button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default OfferRide;
