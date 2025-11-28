import React, { useState } from "react";
import RoutineCard from "./components/RoutineCard";
import ExerciseCard from "./components/ExerciseCard";
import { HiPlus } from "react-icons/hi";

export default function Workout() {
  const [routines, setRoutines] = useState([
    {
      id: 1,
      name: "Legs",
      description: "Heavy compound day",
      exercises: ["Squat", "Romanian Deadlift", "Leg Press", "Leg Curl"],
    },
    { id: 2, name: "Chest", description: "Push-heavy", exercises: ["Bench", "Fly", "Push-Up"] },
    { id: 3, name: "Biceps & Triceps", description: "Arms", exercises: ["Curls", "Skull Crushers"] },
  ]);

  const [exercises] = useState([
    { id: 1, name: "Barbell Squat", muscleGroup: "Legs", duration: "3x8" },
    { id: 2, name: "Dumbbell Bench Press", muscleGroup: "Chest", duration: "3x10" },
    { id: 3, name: "Pull Up", muscleGroup: "Back", duration: "3xMax" },
    { id: 4, name: "Overhead Press", muscleGroup: "Shoulders", duration: "3x6" },
    { id: 5, name: "Tricep Dips", muscleGroup: "Arms", duration: "3x10" },
    { id: 6, name: "Bicep Curl", muscleGroup: "Arms", duration: "3x12" },
  ]);

  const onEditRoutine = (routine) => {
    
    alert(`Edit Routine: ${routine.name}`);
  };

  const onLearnMore = (exercise) => {
    
    alert(`${exercise.name} — Learn more`);
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-black text-black dark:text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Splits</h2>
          </div>

          <div className="overflow-y-auto space-y-4 h-[60vh] pr-2">
            {routines.map((r) => (
              <RoutineCard key={r.id} routine={r} onEdit={onEditRoutine} />
            ))}
          </div>
        </div>

        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Explore</h2>
            <button
              className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
              onClick={() => alert("Create a new routine (placeholder)")}
            >
              <HiPlus className="w-5 h-5" /> New Routine
            </button>
          </div>

       
          <div className="flex items-center space-x-2">
            <input className="flex-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" placeholder="Search exercises..." />
          </div>

          <div className="overflow-y-auto space-y-4 h-[60vh] pr-2">
            {exercises.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} onLearnMore={onLearnMore} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
