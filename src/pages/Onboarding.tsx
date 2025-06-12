
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Users, Shield, Gift, MapPin } from 'lucide-react';

const OnboardingSlide = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient 
}: {
  icon: any;
  title: string;
  description: string;
  gradient: string;
}) => (
  <div className={`min-h-screen ${gradient} flex items-center justify-center px-6`}>
    <div className="text-center text-white max-w-md animate-fade-in-up">
      <div className="mb-8">
        <div className="w-32 h-32 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Icon size={64} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold font-nunito mb-4">{title}</h2>
        <p className="text-lg font-light opacity-90 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      icon: MapPin,
      title: "Travel Together, Travel Smarter",
      description: "Save money on your daily commute while reducing pollution. Join a community that cares about the environment and your wallet.",
      gradient: "gradient-sky"
    },
    {
      icon: Users,
      title: "Be a Host or a Rider",
      description: "Offer rides in your car or find comfortable rides with verified community members. It's that simple!",
      gradient: "bg-gradient-to-br from-forest-green to-sky-blue"
    },
    {
      icon: Shield,
      title: "Safety First, Always",
      description: "All our users are verified with ID and phone numbers. Plus, 24/7 support to ensure your peace of mind.",
      gradient: "bg-gradient-to-br from-sky-blue to-purple-500"
    },
    {
      icon: Gift,
      title: "Earn Rewards as You Ride",
      description: "Complete rides to unlock points, badges, and exclusive partner discounts. The more you ride, the more you save!",
      gradient: "gradient-warm"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/auth');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skipToAuth = () => {
    navigate('/auth');
  };

  return (
    <div className="relative">
      <OnboardingSlide {...slides[currentSlide]} />
      
      {/* Navigation */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/20 to-transparent">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="text-white hover:bg-white/20 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </Button>
          
          {/* Dots indicator */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
          
          <Button
            variant="ghost"
            onClick={nextSlide}
            className="text-white hover:bg-white/20"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
        
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={skipToAuth}
            className="flex-1 bg-transparent border-white text-white hover:bg-white hover:text-gray-800"
          >
            Skip
          </Button>
          <Button
            onClick={nextSlide}
            className="flex-1 bg-white text-gray-800 hover:bg-white/90"
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
