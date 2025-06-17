
export interface Food {
  id: string;
  name: string;
  category: 'protein' | 'carbs' | 'fats' | 'vegetables' | 'fruits' | 'dairy' | 'snacks';
  calories: number; // per 100g
  protein: number; // grams per 100g
  carbs: number; // grams per 100g
  fat: number; // grams per 100g
  fiber: number; // grams per 100g
  sugar: number; // grams per 100g
  sodium: number; // mg per 100g
}

export interface Meal {
  id: string;
  name: string;
  foods: Array<{
    foodId: string;
    quantity: number; // in grams
  }>;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface MealPlan {
  id: string;
  name: string;
  date: string;
  meals: {
    breakfast?: Meal;
    lunch?: Meal;
    dinner?: Meal;
    snacks?: Meal[];
  };
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
}

export const foodDatabase: Food[] = [
  {
    id: "chicken-breast",
    name: "Chicken Breast",
    category: "protein",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 74
  },
  {
    id: "brown-rice",
    name: "Brown Rice",
    category: "carbs",
    calories: 111,
    protein: 2.6,
    carbs: 22,
    fat: 0.9,
    fiber: 1.8,
    sugar: 0.4,
    sodium: 5
  },
  {
    id: "broccoli",
    name: "Broccoli",
    category: "vegetables",
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    fiber: 2.6,
    sugar: 1.5,
    sodium: 33
  },
  {
    id: "banana",
    name: "Banana",
    category: "fruits",
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    fiber: 2.6,
    sugar: 12,
    sodium: 1
  },
  {
    id: "almonds",
    name: "Almonds",
    category: "fats",
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    fiber: 12,
    sugar: 4,
    sodium: 1
  },
  {
    id: "greek-yogurt",
    name: "Greek Yogurt",
    category: "dairy",
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    fiber: 0,
    sugar: 3.2,
    sodium: 36
  }
];

export const getFoodById = (id: string) => {
  return foodDatabase.find(food => food.id === id);
};

export const getFoodsByCategory = (category: Food['category']) => {
  return foodDatabase.filter(food => food.category === category);
};

export const calculateMealNutrition = (foods: Array<{ foodId: string; quantity: number }>) => {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  foods.forEach(({ foodId, quantity }) => {
    const food = getFoodById(foodId);
    if (food) {
      const multiplier = quantity / 100; // quantity is in grams, nutrition is per 100g
      totalCalories += food.calories * multiplier;
      totalProtein += food.protein * multiplier;
      totalCarbs += food.carbs * multiplier;
      totalFat += food.fat * multiplier;
    }
  });

  return {
    calories: Math.round(totalCalories),
    protein: Math.round(totalProtein * 10) / 10,
    carbs: Math.round(totalCarbs * 10) / 10,
    fat: Math.round(totalFat * 10) / 10
  };
};
