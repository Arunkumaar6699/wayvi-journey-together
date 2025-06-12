
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen gradient-sky flex items-center justify-center p-6">
      <div className="text-center text-white max-w-md">
        <div className="text-8xl font-bold mb-4 animate-bounce-gentle">404</div>
        <h1 className="text-2xl font-bold mb-4">Oops! Route not found</h1>
        <p className="text-lg opacity-90 mb-8">
          Looks like you've taken a wrong turn. Let's get you back on track!
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/home')}
            className="w-full bg-white text-gray-800 hover:bg-white/90"
          >
            <Home size={20} className="mr-2" />
            Go to Home
          </Button>
          
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full bg-transparent border-white text-white hover:bg-white hover:text-gray-800"
          >
            <ArrowLeft size={20} className="mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
