
import { useState } from 'react';
import { Crown, Star, Zap, Users, Brain, Shield, Check, X } from 'lucide-react';

interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
}

interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  premium: boolean;
}

const PremiumFeatures = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [currentPlan, setCurrentPlan] = useState<string>('free');

  const plans: PremiumPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      features: [
        'Basic workout tracking',
        'Limited exercise library',
        'Basic progress tracking',
        'Community access'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 9.99,
      period: 'month',
      popular: true,
      features: [
        'Advanced analytics',
        'AI personalization',
        'Unlimited workouts',
        'Nutrition tracking',
        'Wearable integrations',
        'Priority support'
      ]
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 19.99,
      period: 'month',
      features: [
        'Everything in Pro',
        'Personal trainer access',
        'Custom meal plans',
        'Advanced recovery tracking',
        'Group challenges',
        'Exclusive content',
        '1-on-1 coaching sessions'
      ]
    }
  ];

  const premiumFeatures: PremiumFeature[] = [
    {
      id: 'ai-coaching',
      name: 'AI Personal Coaching',
      description: 'Get personalized workout recommendations based on your progress and goals',
      icon: <Brain className="h-6 w-6" />,
      premium: true
    },
    {
      id: 'advanced-analytics',
      name: 'Advanced Analytics',
      description: 'Detailed insights into your fitness journey with predictive analytics',
      icon: <Star className="h-6 w-6" />,
      premium: true
    },
    {
      id: 'nutrition-ai',
      name: 'Smart Nutrition Tracking',
      description: 'AI-powered meal planning and macro optimization',
      icon: <Zap className="h-6 w-6" />,
      premium: true
    },
    {
      id: 'trainer-access',
      name: 'Personal Trainer Access',
      description: 'Connect with certified trainers for personalized guidance',
      icon: <Users className="h-6 w-6" />,
      premium: true
    },
    {
      id: 'priority-support',
      name: 'Priority Support',
      description: '24/7 priority customer support with faster response times',
      icon: <Shield className="h-6 w-6" />,
      premium: true
    }
  ];

  const handleUpgrade = (planId: string) => {
    setCurrentPlan(planId);
    // Here you would integrate with Stripe or your payment processor
    console.log(`Upgrading to ${planId} plan`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Premium Features</h2>
        <p className="text-xl text-gray-300">Unlock the full potential of your fitness journey</p>
      </div>

      {/* Current Plan Status */}
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-2xl p-8 border border-slate-600/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white capitalize">{currentPlan} Plan</h3>
              <p className="text-gray-400">
                {currentPlan === 'free' ? 'Enjoy basic features' : 'You have access to premium features'}
              </p>
            </div>
          </div>
          {currentPlan === 'free' && (
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300">
              Upgrade Now
            </button>
          )}
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-white text-center">Choose Your Plan</h3>
        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-orange-500/50 ring-2 ring-orange-500/20' 
                  : 'border-slate-700/50'
              } ${selectedPlan === plan.id ? 'ring-2 ring-blue-500/50' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">{plan.name}</h4>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={currentPlan === plan.id}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  currentPlan === plan.id
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                {currentPlan === plan.id ? 'Current Plan' : `Choose ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-xl font-semibold text-white mb-6">Premium Features</h3>
        <div className="grid lg:grid-cols-2 gap-6">
          {premiumFeatures.map((feature) => (
            <div
              key={feature.id}
              className="flex items-start space-x-4 p-4 bg-slate-700/30 rounded-lg"
            >
              <div className={`p-3 rounded-lg ${feature.premium ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-500/20 text-gray-400'}`}>
                {feature.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-white font-medium">{feature.name}</h4>
                  {feature.premium && (
                    <Crown className="h-4 w-4 text-orange-400" />
                  )}
                </div>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
              {feature.premium && currentPlan === 'free' && (
                <div className="text-orange-400 text-sm font-medium">Pro</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade CTA */}
      {currentPlan === 'free' && (
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-8 border border-orange-500/30 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Fitness?</h3>
          <p className="text-gray-300 mb-6">Join thousands of users who have achieved their goals with premium features</p>
          <button 
            onClick={() => handleUpgrade('pro')}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 text-lg"
          >
            Start Your Premium Journey
          </button>
        </div>
      )}
    </div>
  );
};

export default PremiumFeatures;
