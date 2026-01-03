import { Gift, Star, TrendingUp, Award, Clock } from 'lucide-react';

export function LoyaltyProgram() {
  const loyaltyData = {
    currentPoints: 2450,
    pointsToNextTier: 550,
    tier: 'Gold',
    lifetimePoints: 5680,
    rewardsEarned: 8,
  };

  const pointsHistory = [
    {
      date: '2024-12-15',
      description: 'Purchase: Premium Cashmere Sweater',
      points: 290,
      type: 'earned',
    },
    {
      date: '2024-12-10',
      description: 'Purchase: Essential Turtleneck',
      points: 160,
      type: 'earned',
    },
    {
      date: '2024-12-05',
      description: 'Redeemed: £10 Discount',
      points: -500,
      type: 'redeemed',
    },
    {
      date: '2024-11-28',
      description: 'Birthday Bonus',
      points: 500,
      type: 'earned',
    },
    {
      date: '2024-11-15',
      description: 'Purchase: Winter Collection Bundle',
      points: 200,
      type: 'earned',
    },
  ];

  const rewards = [
    {
      id: 1,
      name: '£5 Discount',
      points: 250,
      description: 'Save £5 on your next purchase',
      available: true,
    },
    {
      id: 2,
      name: '£10 Discount',
      points: 500,
      description: 'Save £10 on your next purchase',
      available: true,
    },
    {
      id: 3,
      name: '£25 Discount',
      points: 1000,
      description: 'Save £25 on your next purchase',
      available: true,
    },
    {
      id: 4,
      name: 'Free Shipping',
      points: 300,
      description: 'Free shipping on your next order',
      available: true,
    },
    {
      id: 5,
      name: 'Exclusive Gift',
      points: 2000,
      description: 'Receive an exclusive VIBRIVO gift',
      available: true,
    },
    {
      id: 6,
      name: 'VIP Access',
      points: 3000,
      description: 'Early access to new collections',
      available: false,
    },
  ];

  const tiers = [
    { name: 'Bronze', minPoints: 0, color: 'bg-amber-600' },
    { name: 'Silver', minPoints: 1000, color: 'bg-gray-400' },
    { name: 'Gold', minPoints: 2500, color: 'bg-yellow-500' },
    { name: 'Platinum', minPoints: 5000, color: 'bg-purple-600' },
  ];

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (loyaltyData.currentPoints >= reward.points) {
      alert(`Redeeming ${reward.name} for ${reward.points} points!`);
    } else {
      alert(`You need ${reward.points - loyaltyData.currentPoints} more points to redeem this reward.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl text-[#111111] mb-2">Loyalty Program</h1>
        <p className="text-gray-600">Earn points with every purchase and unlock exclusive rewards</p>
      </div>

      {/* Points Summary */}
      <div className="bg-gradient-to-r from-[#C7A14A] to-[#1ED2AF] text-white rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm opacity-90 mb-2">Current Points</p>
            <p className="text-4xl">{loyaltyData.currentPoints}</p>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-2">Current Tier</p>
            <div className="flex items-center gap-2">
              <Award className="w-8 h-8" />
              <p className="text-3xl">{loyaltyData.tier}</p>
            </div>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-2">Lifetime Points</p>
            <p className="text-4xl">{loyaltyData.lifetimePoints}</p>
          </div>
        </div>
        <div className="bg-white/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Progress to Platinum</span>
            <span className="text-sm">{loyaltyData.pointsToNextTier} points to go</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3"
              style={{
                width: `${((loyaltyData.currentPoints - 2500) / (5000 - 2500)) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tier Benefits */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl text-[#111111] mb-4">Membership Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-6 rounded-lg text-white ${tier.color} ${
                tier.name === loyaltyData.tier ? 'ring-4 ring-white shadow-xl' : ''
              }`}
            >
              <h3 className="text-xl mb-2">{tier.name}</h3>
              <p className="text-sm opacity-90">{tier.minPoints}+ points</p>
              {tier.name === loyaltyData.tier && (
                <p className="mt-2 text-sm bg-white/20 px-2 py-1 rounded inline-block">
                  Current Tier
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available Rewards */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl text-[#111111] mb-4">Available Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`p-6 border-2 rounded-lg transition-all ${
                reward.available && loyaltyData.currentPoints >= reward.points
                  ? 'border-[#1ED2AF] hover:shadow-lg'
                  : 'border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <Gift className="w-8 h-8 text-[#1ED2AF]" />
                <span className="bg-[#F5F3EE] px-3 py-1 rounded-full text-sm text-[#111111]">
                  {reward.points} pts
                </span>
              </div>
              <h3 className="text-lg text-[#111111] mb-2">{reward.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
              <button
                onClick={() => handleRedeem(reward)}
                disabled={!reward.available || loyaltyData.currentPoints < reward.points}
                className={`w-full py-2 rounded-lg transition-colors ${
                  reward.available && loyaltyData.currentPoints >= reward.points
                    ? 'bg-[#1ED2AF] text-white hover:bg-[#111111]'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {loyaltyData.currentPoints >= reward.points ? 'Redeem' : 'Not Enough Points'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Points History */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl text-[#111111] mb-4">Points History</h2>
        <div className="space-y-4">
          {pointsHistory.map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-[#F5F3EE] rounded-lg">
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    entry.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  {entry.type === 'earned' ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <Gift className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-[#111111]">{entry.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div
                className={`text-lg ${
                  entry.type === 'earned' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {entry.type === 'earned' ? '+' : ''}
                {entry.points}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Earn Points */}
      <div className="bg-[#F5F3EE] rounded-lg p-6">
        <h3 className="text-lg text-[#111111] mb-4">How to Earn Points</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-[#C7A14A] mt-1" />
            <div>
              <p className="font-semibold">Make a Purchase</p>
              <p className="text-sm">Earn 1 point for every £1 spent</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-[#C7A14A] mt-1" />
            <div>
              <p className="font-semibold">Birthday Bonus</p>
              <p className="text-sm">Get 500 points on your birthday</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-[#C7A14A] mt-1" />
            <div>
              <p className="font-semibold">Write a Review</p>
              <p className="text-sm">Earn 50 points per product review</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-[#C7A14A] mt-1" />
            <div>
              <p className="font-semibold">Refer a Friend</p>
              <p className="text-sm">Get 250 points per referral</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
