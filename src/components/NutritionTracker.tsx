
import { useState, useEffect } from 'react';
import { Plus, Apple, BarChart3, Target, Utensils } from 'lucide-react';
import { foodDatabase, getFoodById, calculateMealNutrition, type Food, type MealPlan } from '../data/nutritionDatabase';

interface NutritionEntry {
  id: string;
  foodId: string;
  quantity: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
  date: string;
}

const NutritionTracker = () => {
  const [dailyEntries, setDailyEntries] = useState<NutritionEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddFood, setShowAddFood] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState(100);

  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('nutritionEntries');
    if (savedEntries) {
      setDailyEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage
  const saveEntries = (entries: NutritionEntry[]) => {
    setDailyEntries(entries);
    localStorage.setItem('nutritionEntries', JSON.stringify(entries));
  };

  const todaysEntries = dailyEntries.filter(entry => entry.date === selectedDate);

  const addFoodEntry = () => {
    if (!selectedFood) return;

    const newEntry: NutritionEntry = {
      id: Date.now().toString(),
      foodId: selectedFood.id,
      quantity,
      mealType: selectedMealType,
      date: selectedDate
    };

    saveEntries([...dailyEntries, newEntry]);
    setShowAddFood(false);
    setSelectedFood(null);
    setQuantity(100);
  };

  const removeFoodEntry = (entryId: string) => {
    saveEntries(dailyEntries.filter(entry => entry.id !== entryId));
  };

  const getDailyNutrition = () => {
    const foods = todaysEntries.map(entry => ({
      foodId: entry.foodId,
      quantity: entry.quantity
    }));
    return calculateMealNutrition(foods);
  };

  const getMealNutrition = (mealType: string) => {
    const mealEntries = todaysEntries.filter(entry => entry.mealType === mealType);
    const foods = mealEntries.map(entry => ({
      foodId: entry.foodId,
      quantity: entry.quantity
    }));
    return calculateMealNutrition(foods);
  };

  const dailyNutrition = getDailyNutrition();
  const dailyTargets = { calories: 2000, protein: 150, carbs: 250, fat: 67 };

  const mealTypes = [
    { key: 'breakfast', name: 'Breakfast', icon: '🥞' },
    { key: 'lunch', name: 'Lunch', icon: '🥗' },
    { key: 'dinner', name: 'Dinner', icon: '🍽️' },
    { key: 'snacks', name: 'Snacks', icon: '🍎' }
  ];

  return (
    <div className="space-y-8">
      {/* Date Selector */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Apple className="h-6 w-6 text-green-500 mr-2" />
            Nutrition Tracker
          </h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
          />
        </div>

        {/* Daily Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="text-blue-400 text-sm mb-1">Calories</div>
            <div className="text-2xl font-bold text-white">
              {dailyNutrition.calories}
            </div>
            <div className="text-xs text-gray-400">/ {dailyTargets.calories}</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="text-red-400 text-sm mb-1">Protein</div>
            <div className="text-2xl font-bold text-white">
              {dailyNutrition.protein}g
            </div>
            <div className="text-xs text-gray-400">/ {dailyTargets.protein}g</div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="text-yellow-400 text-sm mb-1">Carbs</div>
            <div className="text-2xl font-bold text-white">
              {dailyNutrition.carbs}g
            </div>
            <div className="text-xs text-gray-400">/ {dailyTargets.carbs}g</div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <div className="text-purple-400 text-sm mb-1">Fat</div>
            <div className="text-2xl font-bold text-white">
              {dailyNutrition.fat}g
            </div>
            <div className="text-xs text-gray-400">/ {dailyTargets.fat}g</div>
          </div>
        </div>
      </div>

      {/* Meals */}
      <div className="space-y-6">
        {mealTypes.map(({ key, name, icon }) => {
          const mealEntries = todaysEntries.filter(entry => entry.mealType === key);
          const mealNutrition = getMealNutrition(key);

          return (
            <div key={key} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <span className="mr-2">{icon}</span>
                  {name}
                </h3>
                <button
                  onClick={() => {
                    setSelectedMealType(key as any);
                    setShowAddFood(true);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center text-sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Food
                </button>
              </div>

              {mealEntries.length > 0 ? (
                <div className="space-y-3">
                  {mealEntries.map(entry => {
                    const food = getFoodById(entry.foodId);
                    if (!food) return null;

                    const entryNutrition = calculateMealNutrition([{
                      foodId: entry.foodId,
                      quantity: entry.quantity
                    }]);

                    return (
                      <div key={entry.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div>
                          <div className="text-white font-medium">{food.name}</div>
                          <div className="text-gray-400 text-sm">
                            {entry.quantity}g • {entryNutrition.calories} cal
                          </div>
                        </div>
                        <button
                          onClick={() => removeFoodEntry(entry.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                  <div className="pt-2 border-t border-slate-600">
                    <div className="text-sm text-gray-400">
                      Total: {mealNutrition.calories} cal • {mealNutrition.protein}g protein • {mealNutrition.carbs}g carbs • {mealNutrition.fat}g fat
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">
                  No foods added to {name.toLowerCase()} yet
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Food Modal */}
      {showAddFood && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">
              Add Food to {mealTypes.find(m => m.key === selectedMealType)?.name}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Select Food</label>
                <select
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
                  value={selectedFood?.id || ''}
                  onChange={(e) => {
                    const food = foodDatabase.find(f => f.id === e.target.value);
                    setSelectedFood(food || null);
                  }}
                >
                  <option value="">Choose a food...</option>
                  {foodDatabase.map(food => (
                    <option key={food.id} value={food.id}>
                      {food.name} ({food.calories} cal/100g)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Quantity (grams)</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
                  min="1"
                />
              </div>

              {selectedFood && (
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-sm text-gray-300">
                    <div>Calories: {Math.round(selectedFood.calories * quantity / 100)}</div>
                    <div>Protein: {Math.round(selectedFood.protein * quantity / 10) / 10}g</div>
                    <div>Carbs: {Math.round(selectedFood.carbs * quantity / 10) / 10}g</div>
                    <div>Fat: {Math.round(selectedFood.fat * quantity / 10) / 10}g</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddFood(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addFoodEntry}
                disabled={!selectedFood}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg"
              >
                Add Food
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionTracker;
