// import React from "react";
// import DailyCaloriesDoughnut from "./DailyCaloriesDoughnut"; // Adjust path if needed
// import { useAuth, unknownUser } from "../../contexts/theme/AuthContext";

// export default function Home() {
//   const { user } = useAuth();
//   const calories = 1500;
//   const goal = 3000;

//   const displayUsername = user?.username ?? unknownUser.name;

//   return (
//     <div className="flex flex-col bg-white text-black dark:bg-black dark:text-white p-6 space-y-8">
//       <h1 className="text-3xl font-bold mb-4">Welcome back, {displayUsername}!</h1>

//       <div className="bg-gray-100 dark:bg-gray-800 rounded shadow-md p-6 flex flex-col items-center space-y-4 w-full">
//         <h2 className="text-2xl font-semibold text-center">
//           Today's Workout: [Workout Title]
//         </h2>
//         <button className="w-full bg-white dark:bg-black dark:text-white py-2 rounded font-semibold text-xl">
//           START WORKOUT
//         </button>
//       </div>

//       <div className="bg-gray-100 dark:bg-gray-800 rounded shadow-md p-6 w-full max-h-full ">
//         <h2 className="text-2xl font-semibold text-center mb-2">
//           Weekly Activity
//         </h2>
//         <div className="flex justify-between mt-4 mb-2">
    
//           {["S", "S", "M", "T", "W", "Th", "F"].map((d, x) => (
//             <div key={x} className="flex flex-col items-center">
//               <h6 className="mt-2 text-sm">{d}</h6>
//               <div
//                 className="w-6 bg-blue-400 rounded"
//                 style={{ height: `${Math.min((100 * Math.random() + 10), 100)}px` }}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

      
//       <div className="flex flex-row gap-8 w-full">
        
//         <div className="bg-gray-100 dark:bg-gray-800 rounded shadow p-6 space-y-2 flex-1 flex flex-col items-center">
//           <h3 className="text-lg font-semibold mb-2">Daily Calories</h3>
//           <div className="text-4xl font-bold mb-2">
//             {goal ? Math.round((calories / goal) * 100) : 0}%
//           </div>
//           <DailyCaloriesDoughnut calories={calories} goal={goal} />
//         </div>

       
//         <div className="flex flex-col bg-gray-100 dark:bg-gray-800 rounded shadow p-6 flex-1">
//           <h3 className="text-lg font-semibold mb-2">Nutrition</h3>
//           <div className="text-xs">Carbs 10% | Fat 26% | Protein 50%</div>
//           <div className="mt-2 mb-2">
//             {[
//               { name: "Carbs", per: 10 },
//               { name: "Fat", per: 26 },
//               { name: "Protein", per: 50 },
//             ].map((item, idx) => (
//               <div key={item.name} className="mb-1">
//                 <div className="flex justify-between text-xs">
//                   <span>{item.name}</span>
//                   <span>{item.per}%</span>
//                 </div>
//                 <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-full">
//                   <div
//                     className="bg-purple-500 h-4 rounded"
//                     style={{ width: `${item.per}%` }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import DailyCaloriesDoughnut from "./DailyCaloriesDoughnut";
import { useAuth, unknownUser } from "../../contexts/theme/AuthContext";

export default function Home() {
  const { user } = useAuth();
  
  // --- Feature 1: Determine Split by Day of Week ---
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayIndex = new Date().getDay();
  const currentDayName = daysOfWeek[currentDayIndex];

  // Hardcoded split logic (You can make this dynamic later)
  const workoutSplits = {
    "Monday": "Push (Chest & Triceps)",
    "Tuesday": "Pull (Back & Biceps)",
    "Wednesday": "Legs & Core",
    "Thursday": "Rest or Active Recovery",
    "Friday": "Upper Body",
    "Saturday": "Lower Body",
    "Sunday": "Rest",
  };
  const todaysWorkout = workoutSplits[currentDayName] || "Rest Day";

  // --- Feature 3: Connect Real Nutrition Data ---
  // Get consumed values (from dailyLog)
  const consumedCals = user?.dailyLog?.calories || 0;
  const consumedProtein = user?.dailyLog?.macros?.protein || 0;
  const consumedCarbs = user?.dailyLog?.macros?.carbs || 0;
  const consumedFats = user?.dailyLog?.macros?.fats || 0;

  // Get Goal values (from nutrition) or defaults
  // In a real app, these should also come from user.nutrition.targetCalories
  const goalCals = user?.nutrition?.targetCalories || 2500;
  const goalProtein = 180; 
  const goalCarbs = 250;
  const goalFats = 70;

  // Calculate percentages for the bars (capped at 100%)
  const proteinPer = Math.min((consumedProtein / goalProtein) * 100, 100);
  const carbsPer = Math.min((consumedCarbs / goalCarbs) * 100, 100);
  const fatsPer = Math.min((consumedFats / goalFats) * 100, 100);

  // --- Feature 2: Weekly Activity Data ---
  // Mock data for now (since we don't have a duration field in DB yet)
  const weeklyActivity = [
    { day: "S", minutes: 0 },
    { day: "M", minutes: 45 },
    { day: "T", minutes: 60 },
    { day: "W", minutes: 30 },
    { day: "Th", minutes: 0 },
    { day: "F", minutes: 50 },
    { day: "S", minutes: 90 },
  ];

  const displayUsername = user?.username ?? unknownUser.username;

  return (
    <div className="flex flex-col bg-white text-black dark:bg-black dark:text-white p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Welcome back, {displayUsername}!</h1>

      {/* Feature 1: Dynamic Split */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded shadow-md p-6 flex flex-col items-center space-y-4 w-full">
        <h2 className="text-2xl font-semibold text-center">
          Today's Workout ({currentDayName}): <span className="text-blue-600 dark:text-blue-400">{todaysWorkout}</span>
        </h2>
        {/* <button className="w-full bg-white dark:bg-black dark:text-white py-2 rounded font-semibold text-xl border hover:bg-gray-50 dark:hover:bg-gray-900 transition">
          START WORKOUT
        </button> */}
      </div>

      {/* Feature 2: Weekly Activity with Hover */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded shadow-md p-6 w-full max-h-full ">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Weekly Activity (Minutes)
        </h2>
        <div className="flex justify-between mt-4 mb-2 items-end h-32">
          {weeklyActivity.map((d, x) => (
            <div key={x} className="flex flex-col items-center group relative w-full">
              {/* Tooltip on Hover */}
              <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                {d.minutes} minutes
              </div>
              
              {/* Bar */}
              <div
                className="w-6 bg-blue-400 rounded transition-all duration-500 hover:bg-blue-500"
                style={{ height: `${Math.min(d.minutes, 100)}%` }}
              />
              <h6 className="mt-2 text-sm">{d.day}</h6>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row gap-8 w-full">
        {/* Daily Calories */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded shadow p-6 space-y-2 flex-1 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Daily Calories</h3>
          <div className="text-4xl font-bold mb-2">
            {Math.round(consumedCals)} / <span className="text-xl text-gray-500">{goalCals}</span>
          </div>
          <DailyCaloriesDoughnut calories={consumedCals} goal={goalCals} />
        </div>

        {/* Feature 3: Nutrition Bars Reflecting Real Data */}
        <div className="flex flex-col bg-gray-100 dark:bg-gray-800 rounded shadow p-6 flex-1">
          <h3 className="text-lg font-semibold mb-2">Nutrition</h3>
          {/* <div className="text-xs text-gray-500 mb-2">Today's Macros</div> */}
          
          <div className="mt-2 mb-2 space-y-4">
            {/* Protein */}
            <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Protein</span>
                  <span>{consumedProtein}g / {goalProtein}g</span>
                </div>
                <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-full overflow-hidden">
                  <div className="bg-purple-500 h-4 rounded transition-all duration-500" style={{ width: `${proteinPer}%` }} />
                </div>
            </div>

            {/* Carbs */}
            <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Carbs</span>
                  <span>{consumedCarbs}g / {goalCarbs}g</span>
                </div>
                <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-full overflow-hidden">
                  <div className="bg-blue-500 h-4 rounded transition-all duration-500" style={{ width: `${carbsPer}%` }} />
                </div>
            </div>

            {/* Fats */}
            <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Fats</span>
                  <span>{consumedFats}g / {goalFats}g</span>
                </div>
                <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-full overflow-hidden">
                  <div className="bg-yellow-500 h-4 rounded transition-all duration-500" style={{ width: `${fatsPer}%` }} />
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}