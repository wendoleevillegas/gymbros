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

// WENDOLEE'S CODE 

// import React, { useState, useEffect } from "react";
// import DailyCaloriesDoughnut from "./DailyCaloriesDoughnut";
// import { useAuth, unknownUser } from "../../contexts/theme/AuthContext";

// export default function Home() {
//   const { user } = useAuth();

//   // --- Feature 1: Determine Split by Day of Week (Dynamic from LocalStorage) ---
//   const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   const currentDayIndex = new Date().getDay();
//   const currentDayName = daysOfWeek[currentDayIndex];

//   // State to hold the name of today's workout
//   const [todaysWorkoutName, setTodaysWorkoutName] = useState("Rest Day");

//   useEffect(() => {
//     // 1. Get splits from local storage
//     const savedSplits = localStorage.getItem("mySplits");
//     if (savedSplits) {
//       const parsedSplits = JSON.parse(savedSplits);
      
//       // 2. Find a split that includes today's day name
//       // Note: If multiple splits have the same day, this picks the first one found.
//       const foundSplit = parsedSplits.find(split => 
//         split.days && split.days.includes(currentDayName)
//       );

//       if (foundSplit) {
//         setTodaysWorkoutName(foundSplit.name);
//       } else {
//         setTodaysWorkoutName("Rest Day");
//       }
//     }
//   }, [currentDayName]);

//   // --- Feature 3: Connect Real Nutrition Data ---
//   const consumedCals = user?.dailyLog?.calories || 0;
//   const consumedProtein = user?.dailyLog?.macros?.protein || 0;
//   const consumedCarbs = user?.dailyLog?.macros?.carbs || 0;
//   const consumedFats = user?.dailyLog?.macros?.fats || 0;

//   const goalCals = user?.nutrition?.targetCalories || 2500;
//   const goalProtein = 180; 
//   const goalCarbs = 250;
//   const goalFats = 70;

//   const proteinPer = Math.min((consumedProtein / goalProtein) * 100, 100);
//   const carbsPer = Math.min((consumedCarbs / goalCarbs) * 100, 100);
//   const fatsPer = Math.min((consumedFats / goalFats) * 100, 100);

//   // --- Feature 2: Weekly Activity Data ---
//   const [weeklyActivity, setWeeklyActivity] = useState(() => {
//     const savedData = localStorage.getItem("weeklyActivityData");
//     if (savedData) return JSON.parse(savedData);
//     return Array(7).fill(0).map((_, i) => ({ 
//         day: ["S", "M", "T", "W", "Th", "F", "S"][i], 
//         minutes: 0 
//     }));
//   });

//   useEffect(() => {
//     localStorage.setItem("weeklyActivityData", JSON.stringify(weeklyActivity));
//   }, [weeklyActivity]);

//   const [isLogModalOpen, setIsLogModalOpen] = useState(false);
//   const [logMinutes, setLogMinutes] = useState("");

//   const maxMinutes = Math.max(...weeklyActivity.map((d) => d.minutes));
//   const maxBarHeightPx = 100;

//   const handleSaveLog = (e) => {
//     e.preventDefault();
//     const minutes = parseInt(logMinutes) || 0;
//     const updatedActivity = weeklyActivity.map((day, index) => {
//       if (index === currentDayIndex) return { ...day, minutes: minutes };
//       return day;
//     });
//     setWeeklyActivity(updatedActivity);
//     setLogMinutes("");
//     setIsLogModalOpen(false);
//   };

//   const displayUsername = user?.username ?? unknownUser.username;

//   return (
//     <div className="flex flex-col bg-white text-black dark:bg-black dark:text-white p-6 space-y-8 relative">
//       <h1 className="text-3xl font-bold mb-4">Welcome back, {displayUsername}!</h1>

//       {/* Feature 1: Dynamic Split & Log Button */}
//       <div className="bg-gray-100 dark:bg-gray-800 rounded shadow-md p-6 flex flex-col items-center space-y-4 w-full">
//         <h2 className="text-2xl font-semibold text-center">
//           Today's Workout ({currentDayName}): <span className="text-blue-600 dark:text-blue-400">{todaysWorkoutName}</span>
//         </h2>
        
//         <button 
//           onClick={() => setIsLogModalOpen(true)}
//           className="w-full bg-white dark:bg-black dark:text-white py-2 rounded font-semibold text-xl border hover:bg-gray-50 dark:hover:bg-gray-900 transition"
//         >
//           LOG WORKOUT
//         </button>
//       </div>

//       {/* Feature 2: Weekly Activity */}
//       <div className="bg-gray-100 dark:bg-gray-800 rounded shadow-md p-6 w-full max-h-full ">
//         <h2 className="text-2xl font-semibold text-center mb-2">
//           Weekly Activity (Minutes)
//         </h2>
//         <div className="flex justify-between mt-4 mb-2 items-end h-32">
//           {weeklyActivity.map((d, x) => {
//             const heightPx = maxMinutes > 0 ? (d.minutes / maxMinutes) * maxBarHeightPx : 0;
//             return (
//               <div key={x} className="flex flex-col items-center justify-end group relative w-full h-full">
//                 <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
//                   {d.minutes} minutes
//                 </div>
//                 <div
//                   className={`w-6 rounded-t transition-all duration-500 ${
//                     x === currentDayIndex ? "bg-green-500" : "bg-blue-400 hover:bg-blue-500"
//                   }`}
//                   style={{ height: `${heightPx}px`, minHeight: d.minutes > 0 ? "4px" : "0px" }} 
//                 />
//                 <h6 className="mt-2 text-sm">{d.day}</h6>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Feature 3: Nutrition */}
//       <div className="flex flex-row gap-8 w-full">
//         <div className="bg-gray-100 dark:bg-gray-800 rounded shadow p-6 space-y-2 flex-1 flex flex-col items-center">
//           <h3 className="text-lg font-semibold mb-2">Daily Calories</h3>
//           <div className="text-4xl font-bold mb-2">
//             {Math.round(consumedCals)} / <span className="text-xl text-gray-500">{goalCals}</span>
//           </div>
//           <DailyCaloriesDoughnut calories={consumedCals} goal={goalCals} />
//         </div>

//         <div className="flex flex-col bg-gray-100 dark:bg-gray-800 rounded shadow p-6 flex-1">
//           <h3 className="text-lg font-semibold mb-2">Nutrition</h3>
//           <div className="mt-2 mb-2 space-y-4">
//             <div>
//                 <div className="flex justify-between text-xs mb-1">
//                   <span>Protein</span><span>{consumedProtein}g / {goalProtein}g</span>
//                 </div>
//                 <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-full overflow-hidden">
//                   <div className="bg-purple-500 h-4 rounded transition-all duration-500" style={{ width: `${proteinPer}%` }} />
//                 </div>
//             </div>
//             <div>
//                 <div className="flex justify-between text-xs mb-1">
//                   <span>Carbs</span><span>{consumedCarbs}g / {goalCarbs}g</span>
//                 </div>
//                 <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-full overflow-hidden">
//                   <div className="bg-blue-500 h-4 rounded transition-all duration-500" style={{ width: `${carbsPer}%` }} />
//                 </div>
//             </div>
//             <div>
//                 <div className="flex justify-between text-xs mb-1">
//                   <span>Fats</span><span>{consumedFats}g / {goalFats}g</span>
//                 </div>
//                 <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-full overflow-hidden">
//                   <div className="bg-yellow-500 h-4 rounded transition-all duration-500" style={{ width: `${fatsPer}%` }} />
//                 </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Log Workout Modal */}
//       {isLogModalOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
//             <h2 className="text-xl font-bold mb-4 text-center">Log Workout</h2>
//             <form onSubmit={handleSaveLog} className="flex flex-col gap-4">
//               <div className="flex flex-col gap-2">
//                 <label className="font-medium text-sm">How many minutes did you workout today?</label>
//                 <input
//                   type="number"
//                   placeholder="e.g. 45"
//                   value={logMinutes}
//                   onChange={(e) => setLogMinutes(e.target.value)}
//                   className="p-2 border rounded border-gray-300 dark:border-gray-700 dark:bg-black dark:text-white"
//                   autoFocus
//                 />
//               </div>
//               <div className="flex justify-end gap-2 mt-2">
//                 <button type="button" onClick={() => setIsLogModalOpen(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition">Cancel</button>
//                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Save Log</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import DailyCaloriesDoughnut from "./DailyCaloriesDoughnut";
import { useAuth, unknownUser } from "../../contexts/theme/AuthContext";

export default function Home() {
  const { user } = useAuth();

  // --- Feature 1: Determine Split by Day of Week (Dynamic from LocalStorage) ---
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayIndex = new Date().getDay();
  const currentDayName = daysOfWeek[currentDayIndex];

  const [todaysWorkoutName, setTodaysWorkoutName] = useState("Rest Day");

  useEffect(() => {
    const savedSplits = localStorage.getItem("mySplits");
    if (savedSplits) {
      const parsedSplits = JSON.parse(savedSplits);
      const foundSplit = parsedSplits.find(split => 
        split.days && split.days.includes(currentDayName)
      );
      if (foundSplit) {
        setTodaysWorkoutName(foundSplit.name);
      } else {
        setTodaysWorkoutName("Rest Day");
      }
    }
  }, [currentDayName]);

  // --- Feature 3: Connect Real Nutrition Data ---
  // Data logged for today
  const consumedCals = user?.dailyLog?.calories || 0;
  const consumedProtein = user?.dailyLog?.macros?.protein || 0;
  const consumedCarbs = user?.dailyLog?.macros?.carbs || 0;
  const consumedFats = user?.dailyLog?.macros?.fats || 0;

  // GOALS: Use values from user profile or fallback to defaults
  const goalCals = user?.nutrition?.targetCalories || 2500;
  const goalProtein = user?.nutrition?.macros?.protein || 180;
  const goalCarbs = user?.nutrition?.macros?.carbs || 250;
  const goalFats = user?.nutrition?.macros?.fats || 70;

  // Calculate percentages (capped at 100%)
  const proteinPer = goalProtein > 0 ? Math.min((consumedProtein / goalProtein) * 100, 100) : 0;
  const carbsPer = goalCarbs > 0 ? Math.min((consumedCarbs / goalCarbs) * 100, 100) : 0;
  const fatsPer = goalFats > 0 ? Math.min((consumedFats / goalFats) * 100, 100) : 0;

  // --- Feature 2: Weekly Activity Data ---
  const [weeklyActivity, setWeeklyActivity] = useState(() => {
    const savedData = localStorage.getItem("weeklyActivityData");
    if (savedData) return JSON.parse(savedData);
    return Array(7).fill(0).map((_, i) => ({ 
        day: ["S", "M", "T", "W", "Th", "F", "S"][i], 
        minutes: 0 
    }));
  });

  useEffect(() => {
    localStorage.setItem("weeklyActivityData", JSON.stringify(weeklyActivity));
  }, [weeklyActivity]);

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logMinutes, setLogMinutes] = useState("");

  const maxMinutes = Math.max(...weeklyActivity.map((d) => d.minutes));
  const maxBarHeightPx = 100;

  const handleSaveLog = (e) => {
    e.preventDefault();
    const minutes = parseInt(logMinutes) || 0;
    const updatedActivity = weeklyActivity.map((day, index) => {
      if (index === currentDayIndex) return { ...day, minutes: minutes };
      return day;
    });
    setWeeklyActivity(updatedActivity);
    setLogMinutes("");
    setIsLogModalOpen(false);
  };

  const displayUsername = user?.username ?? unknownUser.username;

  return (
    <div className="flex flex-col bg-white text-black dark:bg-black dark:text-white p-6 space-y-8 relative">
      <h1 className="text-3xl font-bold mb-4">Welcome back, {displayUsername}!</h1>

      {/* Dynamic Split & Log Button */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded shadow-md p-6 flex flex-col items-center space-y-4 w-full">
        <h2 className="text-2xl font-semibold text-center">
          Today's Workout ({currentDayName}): <span className="text-blue-600 dark:text-blue-400">{todaysWorkoutName}</span>
        </h2>
        
        <button 
          onClick={() => setIsLogModalOpen(true)}
          className="w-full bg-white dark:bg-black dark:text-white py-2 rounded font-semibold text-xl border hover:bg-gray-50 dark:hover:bg-gray-900 transition"
        >
          LOG WORKOUT
        </button>
      </div>

      {/* Weekly Activity */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded shadow-md p-6 w-full max-h-full ">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Weekly Activity (Minutes)
        </h2>
        <div className="flex justify-between mt-4 mb-2 items-end h-32">
          {weeklyActivity.map((d, x) => {
            const heightPx = maxMinutes > 0 ? (d.minutes / maxMinutes) * maxBarHeightPx : 0;
            return (
              <div key={x} className="flex flex-col items-center justify-end group relative w-full h-full">
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                  {d.minutes} minutes
                </div>
                <div
                  className={`w-6 rounded-t transition-all duration-500 ${
                    x === currentDayIndex ? "bg-green-500" : "bg-blue-400 hover:bg-blue-500"
                  }`}
                  style={{ height: `${heightPx}px`, minHeight: d.minutes > 0 ? "4px" : "0px" }} 
                />
                <h6 className="mt-2 text-sm">{d.day}</h6>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nutrition Section (Updated with Goal Data) */}
      <div className="flex flex-row gap-8 w-full">
        <div className="bg-gray-100 dark:bg-gray-800 rounded shadow p-6 space-y-2 flex-1 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Daily Calories</h3>
          <div className="text-4xl font-bold mb-2">
            {Math.round(consumedCals)} / <span className="text-xl text-gray-500">{goalCals}</span>
          </div>
          <DailyCaloriesDoughnut calories={consumedCals} goal={goalCals} />
        </div>

        <div className="flex flex-col bg-gray-100 dark:bg-gray-800 rounded shadow p-6 flex-1">
          <h3 className="text-lg font-semibold mb-2">Nutrition</h3>
          <div className="mt-2 mb-2 space-y-4">
            <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Protein</span><span>{consumedProtein}g / {goalProtein}g</span>
                </div>
                <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-full overflow-hidden">
                  <div className="bg-purple-500 h-4 rounded transition-all duration-500" style={{ width: `${proteinPer}%` }} />
                </div>
            </div>
            <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Carbs</span><span>{consumedCarbs}g / {goalCarbs}g</span>
                </div>
                <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-full overflow-hidden">
                  <div className="bg-blue-500 h-4 rounded transition-all duration-500" style={{ width: `${carbsPer}%` }} />
                </div>
            </div>
            <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Fats</span><span>{consumedFats}g / {goalFats}g</span>
                </div>
                <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-full overflow-hidden">
                  <div className="bg-yellow-500 h-4 rounded transition-all duration-500" style={{ width: `${fatsPer}%` }} />
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Log Workout Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-center">Log Workout</h2>
            <form onSubmit={handleSaveLog} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm">How many minutes did you workout today?</label>
                <input
                  type="number"
                  placeholder="e.g. 45"
                  value={logMinutes}
                  onChange={(e) => setLogMinutes(e.target.value)}
                  className="p-2 border rounded border-gray-300 dark:border-gray-700 dark:bg-black dark:text-white"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setIsLogModalOpen(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Save Log</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}