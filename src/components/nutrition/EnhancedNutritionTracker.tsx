
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Apple, Zap, Droplets, Target } from 'lucide-react';

interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
}

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

interface MealPlan {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  dinner: FoodItem[];
  snacks: FoodItem[];
}

const EnhancedNutritionTracker = () => {
  const [goals] = useState<NutritionGoals>({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 80,
    water: 8
  });

  const [consumed, setConsumed] = useState({
    calories: 1650,
    protein: 120,
    carbs: 180,
    fat: 65,
    water: 6
  });

  const [mealPlan] = useState<MealPlan>({
    breakfast: [
      { id: '1', name: 'Greek Yogurt with Berries', calories: 150, protein: 15, carbs: 20, fat: 3, serving: '1 cup' },
      { id: '2', name: 'Whole Grain Toast', calories: 100, protein: 4, carbs: 18, fat: 2, serving: '1 slice' }
    ],
    lunch: [
      { id: '3', name: 'Grilled Chicken Salad', calories: 350, protein: 35, carbs: 15, fat: 18, serving: '1 bowl' },
      { id: '4', name: 'Quinoa', calories: 120, protein: 4, carbs: 22, fat: 2, serving: '1/2 cup' }
    ],
    dinner: [
      { id: '5', name: 'Salmon Fillet', calories: 280, protein: 40, carbs: 0, fat: 12, serving: '6 oz' },
      { id: '6', name: 'Roasted Vegetables', calories: 100, protein: 3, carbs: 20, fat: 2, serving: '1 cup' }
    ],
    snacks: [
      { id: '7', name: 'Protein Shake', calories: 150, protein: 25, carbs: 5, fat: 3, serving: '1 scoop' },
      { id: '8', name: 'Mixed Nuts', calories: 160, protein: 6, carbs: 6, fat: 14, serving: '1 oz' }
    ]
  });

  const [waterIntake, setWaterIntake] = useState(6);

  const addWater = () => {
    setWaterIntake(prev => Math.min(prev + 1, goals.water + 2));
    setConsumed(prev => ({ ...prev, water: Math.min(prev.water + 1, goals.water + 2) }));
  };

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const MacroCard = ({ title, current, goal, unit, icon: Icon, color }: {
    title: string;
    current: number;
    goal: number;
    unit: string;
    icon: any;
    color: string;
  }) => (
    <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon className={`h-5 w-5 ${color}`} />
            <span className="text-sm font-medium text-gray-300">{title}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {current}/{goal}{unit}
          </Badge>
        </div>
        <Progress 
          value={(current / goal) * 100} 
          className="h-2"
        />
        <div className="text-xs text-gray-400 mt-1">
          {Math.max(0, goal - current)}{unit} remaining
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Enhanced Nutrition Tracker</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Track your daily nutrition intake, plan meals, and achieve your fitness goals
        </p>
      </div>

      {/* Daily Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MacroCard
          title="Calories"
          current={consumed.calories}
          goal={goals.calories}
          unit=""
          icon={Zap}
          color="text-orange-400"
        />
        <MacroCard
          title="Protein"
          current={consumed.protein}
          goal={goals.protein}
          unit="g"
          icon={Target}
          color="text-red-400"
        />
        <MacroCard
          title="Carbs"
          current={consumed.carbs}
          goal={goals.carbs}
          unit="g"
          icon={Apple}
          color="text-green-400"
        />
        <MacroCard
          title="Fat"
          current={consumed.fat}
          goal={goals.fat}
          unit="g"
          icon={Droplets}
          color="text-yellow-400"
        />
      </div>

      {/* Water Intake */}
      <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Droplets className="h-5 w-5 text-blue-400 mr-2" />
            Water Intake
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              {Array.from({ length: goals.water }).map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-10 rounded-full border-2 ${
                    i < waterIntake 
                      ? 'bg-blue-400 border-blue-400' 
                      : 'border-slate-600'
                  }`}
                />
              ))}
            </div>
            <Button onClick={addWater} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Glass
            </Button>
          </div>
          <p className="text-sm text-gray-400">
            {waterIntake} of {goals.water} glasses completed
          </p>
        </CardContent>
      </Card>

      {/* Meal Planning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Object.entries(mealPlan).map(([mealType, foods]) => (
          <Card key={mealType} className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border-slate-600/30">
            <CardHeader>
              <CardTitle className="text-white capitalize">{mealType}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {foods.map((food) => (
                <div key={food.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">{food.name}</h4>
                    <p className="text-xs text-gray-400">{food.serving}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-orange-400">{food.calories} cal</div>
                    <div className="text-xs text-gray-400">
                      P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-1" />
                Add Food
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnhancedNutritionTracker;
