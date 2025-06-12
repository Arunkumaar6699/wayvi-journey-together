
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { User, Car, Camera, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const CompleteProfile = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: '',
    gender: '',
    isDriver: false,
    carModel: '',
    licenseNumber: '',
    preferences: {
      music: 'no-preference',
      smoking: false,
      ac: true
    }
  });
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && (!profile.name || !profile.gender)) {
      toast({
        title: "Please complete all fields",
        variant: "destructive"
      });
      return;
    }
    setStep(step + 1);
  };

  const handleComplete = () => {
    updateProfile({
      name: profile.name,
      isProfileComplete: true,
      isDriver: profile.isDriver,
      preferences: profile.preferences
    });
    navigate('/home');
    toast({
      title: "Profile completed!",
      description: "Welcome to the Wayvi community",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-blue to-light-green p-4">
      <div className="max-w-md mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Step {step} of 3</span>
            <span className="text-sm text-gray-600">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="gradient-sky h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={20} />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <Camera size={24} className="text-gray-500" />
                </div>
                <Button variant="outline" size="sm">Add Photo</Button>
              </div>
              
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  placeholder="Enter your full name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <Label>Gender</Label>
                <RadioGroup
                  value={profile.gender}
                  onValueChange={(value) => setProfile({...profile, gender: value})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Prefer not to say</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button onClick={handleNext} className="w-full gradient-sky text-white">
                Next
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Driver Info */}
        {step === 2 && (
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car size={20} />
                Driver Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">I want to offer rides</h3>
                  <p className="text-sm text-gray-600">Enable if you have a car</p>
                </div>
                <Switch
                  checked={profile.isDriver}
                  onCheckedChange={(checked) => setProfile({...profile, isDriver: checked})}
                />
              </div>

              {profile.isDriver && (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="space-y-2">
                    <Label>Car Model</Label>
                    <Input
                      placeholder="e.g., Honda City, Maruti Swift"
                      value={profile.carModel}
                      onChange={(e) => setProfile({...profile, carModel: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Driving License Number</Label>
                    <Input
                      placeholder="Enter license number"
                      value={profile.licenseNumber}
                      onChange={(e) => setProfile({...profile, licenseNumber: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <Button onClick={handleNext} className="w-full gradient-sky text-white">
                Next
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Preferences */}
        {step === 3 && (
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} />
                Travel Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Music Preference</Label>
                <RadioGroup
                  value={profile.preferences.music}
                  onValueChange={(value) => setProfile({
                    ...profile, 
                    preferences: {...profile.preferences, music: value}
                  })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-music" id="no-music" />
                    <Label htmlFor="no-music">No music</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="soft-music" id="soft-music" />
                    <Label htmlFor="soft-music">Soft music</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-preference" id="no-preference" />
                    <Label htmlFor="no-preference">No preference</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Smoking allowed</h3>
                  <p className="text-sm text-gray-600">Comfortable with smoking</p>
                </div>
                <Switch
                  checked={profile.preferences.smoking}
                  onCheckedChange={(checked) => setProfile({
                    ...profile, 
                    preferences: {...profile.preferences, smoking: checked}
                  })}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">AC preferred</h3>
                  <p className="text-sm text-gray-600">Prefer air conditioning</p>
                </div>
                <Switch
                  checked={profile.preferences.ac}
                  onCheckedChange={(checked) => setProfile({
                    ...profile, 
                    preferences: {...profile.preferences, ac: checked}
                  })}
                />
              </div>

              <Button onClick={handleComplete} className="w-full gradient-sky text-white">
                Complete Profile
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompleteProfile;
