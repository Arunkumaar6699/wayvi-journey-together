
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Phone, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStep('otp');
      setIsLoading(false);
      toast({
        title: "OTP Sent!",
        description: "Enter 1234 to continue (demo)",
      });
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 4-digit OTP",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await login(phone, otp);
      navigate('/complete-profile');
      toast({
        title: "Welcome to Wayvi!",
        description: "Let's complete your profile",
      });
    } catch (error) {
      toast({
        title: "Invalid OTP",
        description: "Please check your OTP and try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-blue to-light-green flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 gradient-sky rounded-full flex items-center justify-center">
            <Car size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome to Wayvi</h1>
          <p className="text-gray-600">Join the smart travel community</p>
        </div>

        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 'phone' ? <Phone size={20} /> : <Lock size={20} />}
              {step === 'phone' ? 'Enter Phone Number' : 'Verify OTP'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 'phone' ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mobile Number</label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={10}
                  />
                </div>
                <Button 
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className="w-full gradient-sky text-white"
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Enter OTP</label>
                  <p className="text-sm text-gray-600">
                    Code sent to +91 {phone}
                  </p>
                  <Input
                    type="text"
                    placeholder="Enter 4-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={4}
                    className="text-center text-lg tracking-widest"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setStep('phone')}
                    className="flex-1"
                  >
                    Change Number
                  </Button>
                  <Button 
                    onClick={handleVerifyOTP}
                    disabled={isLoading}
                    className="flex-1 gradient-sky text-white"
                  >
                    {isLoading ? 'Verifying...' : 'Verify'}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Auth;
