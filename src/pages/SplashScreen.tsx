
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from 'lucide-react';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen gradient-sky flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white animate-bounce-gentle"></div>
        <div className="absolute top-32 right-16 w-16 h-16 rounded-full bg-white animate-bounce-gentle delay-300"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 rounded-full bg-white animate-bounce-gentle delay-700"></div>
        <div className="absolute bottom-16 right-10 w-12 h-12 rounded-full bg-white animate-bounce-gentle delay-500"></div>
      </div>

      {/* Main content */}
      <div className="text-center text-white z-10">
        <div className="mb-8 animate-bounce-gentle">
          <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Car size={48} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold font-nunito mb-2 tracking-wide">Wayvi</h1>
          <p className="text-xl font-light opacity-90">Travel Together, Travel Smarter</p>
        </div>
        
        <div className="flex justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse delay-200"></div>
            <div className="w-3 h-3 bg-white/50 rounded-full animate-pulse delay-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
