
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import BottomNavigation from '@/components/BottomNavigation';
import { ArrowLeft, Gift, Star, Trophy, Zap, Coffee, ShoppingBag } from 'lucide-react';

const Rewards = () => {
  const navigate = useNavigate();
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [scratchRevealed, setScratchRevealed] = useState(false);

  const userPoints = 450;
  const nextRewardAt = 500;
  const progress = (userPoints / nextRewardAt) * 100;

  const availableRewards = [
    {
      id: 1,
      title: '₹50 Starbucks Voucher',
      points: 200,
      icon: Coffee,
      available: true
    },
    {
      id: 2,
      title: '₹100 Amazon Voucher',
      points: 400,
      available: true
    },
    {
      id: 3,
      title: '₹200 Myntra Voucher',
      points: 800,
      available: false
    },
    {
      id: 4,
      title: 'Free Ride Credit ₹150',
      points: 600,
      available: false
    }
  ];

  const recentRewards = [
    {
      date: '2 days ago',
      title: 'Ride completed',
      points: '+50',
      type: 'earned'
    },
    {
      date: '1 week ago',
      title: 'First ride milestone',
      points: '+100',
      type: 'earned'
    },
    {
      date: '2 weeks ago',
      title: 'Starbucks voucher',
      points: '-200',
      type: 'redeemed'
    }
  ];

  const handleScratchReveal = () => {
    setScratchRevealed(true);
    setTimeout(() => {
      setShowScratchCard(false);
      setScratchRevealed(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="gradient-warm p-6 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-white text-lg font-semibold">Rewards & Offers</h1>
          <p className="text-white/80 text-sm">Earn points, unlock rewards</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Points Overview */}
        <Card className="gradient-sky text-white">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold mb-2">{userPoints}</div>
              <div className="text-white/80">Reward Points</div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Next reward</span>
                <span className="text-sm">{nextRewardAt - userPoints} points to go</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <Button 
              onClick={() => setShowScratchCard(true)}
              className="w-full bg-white/20 hover:bg-white/30 text-white"
            >
              <Gift size={16} className="mr-2" />
              Complete a ride to earn scratch card
            </Button>
          </CardContent>
        </Card>

        {/* Available Rewards */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Available Rewards</h3>
          <div className="grid grid-cols-2 gap-4">
            {availableRewards.map((reward) => (
              <Card key={reward.id} className={!reward.available ? 'opacity-50' : ''}>
                <CardContent className="p-4 text-center">
                  {reward.icon && <reward.icon size={32} className="text-primary mx-auto mb-2" />}
                  {!reward.icon && <ShoppingBag size={32} className="text-primary mx-auto mb-2" />}
                  <h4 className="font-medium text-sm mb-2">{reward.title}</h4>
                  <div className="text-primary font-bold mb-3">{reward.points} points</div>
                  <Button 
                    size="sm" 
                    disabled={!reward.available || userPoints < reward.points}
                    className="w-full"
                  >
                    {reward.available && userPoints >= reward.points ? 'Redeem' : 'Not enough points'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Streak & Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap size={20} className="text-yellow-500" />
              Ride Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-yellow-500 mb-1">7</div>
              <div className="text-sm text-gray-600">Days in a row</div>
            </div>
            <div className="flex justify-center gap-2 mb-4">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              ))}
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-gray-200 rounded-full"></div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600">
              Complete 14 days to unlock exclusive rewards!
            </p>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentRewards.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-gray-600">{activity.date}</p>
                </div>
                <span className={`font-bold ${
                  activity.type === 'earned' ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {activity.points}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Scratch Card Modal */}
      {showScratchCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <Card className="w-full max-w-sm animate-scale-in">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-4">🎉 Scratch & Win!</h3>
              <div 
                className={`w-full h-40 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-500 ${
                  scratchRevealed 
                    ? 'gradient-warm text-white' 
                    : 'bg-gray-300'
                }`}
                onClick={handleScratchReveal}
              >
                {scratchRevealed ? (
                  <div className="text-center">
                    <Gift size={48} className="mx-auto mb-2" />
                    <div className="text-2xl font-bold">+100 Points!</div>
                  </div>
                ) : (
                  <p className="text-gray-600">Tap to scratch</p>
                )}
              </div>
              {scratchRevealed && (
                <p className="mt-4 text-green-600 font-medium">
                  Congratulations! Points added to your account.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default Rewards;
