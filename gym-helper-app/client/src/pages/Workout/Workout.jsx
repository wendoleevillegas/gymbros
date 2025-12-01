// import React, { useState } from "react";
// import RoutineCard from "./components/RoutineCard";
// import ExerciseCard from "./components/ExerciseCard";
// import { HiPlus } from "react-icons/hi";

// export default function Workout() {
//   const [routines, setRoutines] = useState([
//     {
//       id: 1,
//       name: "Legs",
//       description: "Heavy compound day",
//       exercises: ["Squat", "Romanian Deadlift", "Leg Press", "Leg Curl"],
//     },
//     { id: 2, name: "Chest", description: "Push-heavy", exercises: ["Bench", "Fly", "Push-Up"] },
//     { id: 3, name: "Biceps & Triceps", description: "Arms", exercises: ["Curls", "Skull Crushers"] },
//   ]);

//   const [exercises] = useState([
//     { id: 1, name: "Barbell Squat", muscleGroup: "Legs", duration: "3x8" },
//     { id: 2, name: "Dumbbell Bench Press", muscleGroup: "Chest", duration: "3x10" },
//     { id: 3, name: "Pull Up", muscleGroup: "Back", duration: "3xMax" },
//     { id: 4, name: "Overhead Press", muscleGroup: "Shoulders", duration: "3x6" },
//     { id: 5, name: "Tricep Dips", muscleGroup: "Arms", duration: "3x10" },
//     { id: 6, name: "Bicep Curl", muscleGroup: "Arms", duration: "3x12" },
//   ]);

//   const onEditRoutine = (routine) => {
    
//     alert(`Edit Routine: ${routine.name}`);
//   };

//   const onLearnMore = (exercise) => {
    
//     alert(`${exercise.name} — Learn more`);
//   };

//   return (
//     <div className="min-h-screen p-6 bg-white dark:bg-black text-black dark:text-white">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
//         <div className="flex flex-col gap-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold">My Splits</h2>
//           </div>

//           <div className="overflow-y-auto space-y-4 h-[60vh] pr-2">
//             {routines.map((r) => (
//               <RoutineCard key={r.id} routine={r} onEdit={onEditRoutine} />
//             ))}
//           </div>
//         </div>

        
//         <div className="flex flex-col gap-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold">Explore</h2>
//             <button
//               className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
//               onClick={() => alert("Create a new routine (placeholder)")}
//             >
//               <HiPlus className="w-5 h-5" /> New Routine
//             </button>
//           </div>

       
//           <div className="flex items-center space-x-2">
//             <input className="flex-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" placeholder="Search exercises..." />
//           </div>

//           <div className="overflow-y-auto space-y-4 h-[60vh] pr-2">
//             {exercises.map((ex) => (
//               <ExerciseCard key={ex.id} exercise={ex} onLearnMore={onLearnMore} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// WENDOLEE'S CODE

import React, { useState, useEffect } from "react";
import RoutineCard from "./components/RoutineCard";
import ExerciseCard from "./components/ExerciseCard";
import { HiPlus, HiX, HiRefresh } from "react-icons/hi";

export default function Workout() {
  const [routines, setRoutines] = useState(() => {
    const saved = localStorage.getItem("mySplits");
    return saved ? JSON.parse(saved) : [{ id: 1, name: "Legs", description: "Heavy compound day", exercises: ["Squat", "Leg Press"], days: ["Wednesday"] }];
  });

  useEffect(() => { localStorage.setItem("mySplits", JSON.stringify(routines)); }, [routines]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formExercises, setFormExercises] = useState([]);
  const [exerciseInput, setExerciseInput] = useState("");
  const [formDays, setFormDays] = useState([]);

  // Explore State
  const [searchTerm, setSearchTerm] = useState(""); 
  const [exercises, setExercises] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState(""); 

  const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // --- 1. FETCH ALL DATA (The Fix) ---
  const fetchExercisesData = async (forceRefresh = false) => {
    setLoading(true);
    setStatusMsg("Initializing...");

    // We use a NEW key to ensure we don't load the old '10 item' list
    const CACHE_KEY = 'gymbros_exercises_full_v1'; 
    
    // Clear old cache if user clicked "Refresh"
    if (forceRefresh) sessionStorage.removeItem(CACHE_KEY);

    const cachedData = sessionStorage.getItem(CACHE_KEY);
    
    // Check if we have valid cached data (must be > 100 items to be valid)
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      if (parsed.length > 100) {
          setExercises(parsed);
          setLoading(false);
          setStatusMsg(`Loaded ${parsed.length} exercises from cache.`);
          return;
      }
    }

    // If no cache, fetch from API
    // setStatusMsg("Downloading full database (1300+ items)...");
    
    // limit=1300 gets EVERYTHING so we can search locally
    const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=1300';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
      }
    };

    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) {
         setStatusMsg("API Limit Reached. (Wait 24h or Upgrade Plan)");
         return; 
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        // setStatusMsg(`Success! Loaded ${data.length} exercises.`);
        setExercises(data);
        // Save to storage so we don't hit the API limit again
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
      } else {
        setStatusMsg("Error: Unexpected API response.");
      }
    } catch (error) {
      setStatusMsg(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExercisesData(); }, []);

  // --- 2. SMART SEARCH LOGIC ---
  const filteredExercises = exercises.filter((ex) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true; 

    // Mapping: User types "Quads" -> We search "Quadriceps"
    const muscleMap = {
        "quads": "quadriceps",
        "abs": "waist",
        "arms": "biceps", 
        "glutes": "gluteus",
        "lats": "latissimus",
        "back": "back",
        "chest": "pectorals",
        "legs": "upper legs"
    };

    const effectiveTerm = muscleMap[term] || term;

    // Search matches Name, Target Muscle, or Body Part
    return (
      (ex.name || "").toLowerCase().includes(term) ||
      (ex.target || "").toLowerCase().includes(effectiveTerm) ||    
      (ex.bodyPart || "").toLowerCase().includes(effectiveTerm)
    );
  });

  // --- Handlers ---
  const openCreateModal = () => { setEditingId(null); setFormName(""); setFormDesc(""); setFormExercises([]); setFormDays([]); setIsModalOpen(true); };
  const openEditModal = (r) => { setEditingId(r.id); setFormName(r.name); setFormDesc(r.description); setFormExercises(r.exercises || []); setFormDays(r.days || []); setIsModalOpen(true); };
  const handleDelete = (id) => { if (window.confirm("Delete split?")) setRoutines(routines.filter((r) => r.id !== id)); };
  const handleAddExerciseTag = (e) => { if (e.key === "Enter" && exerciseInput.trim()) { if (!formExercises.includes(exerciseInput.trim())) setFormExercises([...formExercises, exerciseInput.trim()]); setExerciseInput(""); } };
  const removeExerciseTag = (tag) => { setFormExercises(formExercises.filter((t) => t !== tag)); };
  const toggleDayTag = (day) => { if (formDays.includes(day)) setFormDays(formDays.filter((d) => d !== day)); else setFormDays([...formDays, day]); };
  
  const handleSave = (e) => {
    e.preventDefault();
    const newRoutine = { id: editingId || Date.now(), name: formName, description: formDesc, exercises: formExercises, days: formDays };
    if (editingId) setRoutines(routines.map((r) => (r.id === editingId ? newRoutine : r)));
    else setRoutines([...routines, newRoutine]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-black text-black dark:text-white relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* MY SPLITS */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Splits</h2>
            <button onClick={openCreateModal} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 transition"><HiPlus className="w-6 h-6" /></button>
          </div>
          <div className="overflow-y-auto space-y-4 h-[75vh] pr-2 pb-20">
            {routines.map((r) => <RoutineCard key={r.id} routine={r} onEdit={openEditModal} onDelete={handleDelete} />)}
          </div>
        </div>

        {/* EXPLORE */}
        <div className="flex flex-col gap-4">
          {/* <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Explore</h2>
            <button onClick={() => fetchExercisesData(true)} className="text-xs flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200">
                <HiRefresh /> Force Reload
            </button>
          </div> */}
          
          {/* Debug Message */}
          <div className="text-xs text-gray-500 text-right">{statusMsg}</div>

          {/* Search Bar */}
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="flex-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" 
              placeholder="Search exercises (e.g. Quads, Back)..." 
            />
          </div>

          {/* List of Results */}
          <div className="overflow-y-auto space-y-4 h-[75vh] pr-2 pb-20">
            {loading ? <p className="text-center text-gray-500 mt-10">Loading...</p> : 
             filteredExercises.length > 0 ? (
                // Only render first 50 matches to keep app fast
                filteredExercises.slice(0, 50).map((ex) => <ExerciseCard key={ex.id} exercise={ex} />)
             ) : (
             <p className="text-center text-gray-500 mt-10">No exercises found.</p>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
             <h2 className="text-2xl font-bold mb-6">{editingId ? "Edit Split" : "Create New Split"}</h2>
             <form onSubmit={handleSave} className="flex flex-col gap-4">
               <div className="flex flex-col gap-1"><label className="font-semibold text-sm">Workout Name:</label><input type="text" required value={formName} onChange={(e) => setFormName(e.target.value)} className="p-2 border rounded border-gray-300 dark:border-gray-700 dark:bg-black" /></div>
               <div className="flex flex-col gap-1"><label className="font-semibold text-sm">Description:</label><input type="text" value={formDesc} onChange={(e) => setFormDesc(e.target.value)} className="p-2 border rounded border-gray-300 dark:border-gray-700 dark:bg-black" /></div>
               <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm">Workout Exercises:</label>
                <div className="flex flex-wrap gap-2 mb-2 p-2 border border-gray-300 dark:border-gray-700 rounded min-h-[50px] dark:bg-black">
                  {formExercises.map((ex, idx) => (
                    <span key={idx} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm flex items-center gap-1">
                      {ex}<button type="button" onClick={() => removeExerciseTag(ex)} className="text-red-500 hover:text-red-700"><HiX /></button>
                    </span>
                  ))}
                  <input type="text" placeholder="Type & Press Enter..." value={exerciseInput} onChange={(e) => setExerciseInput(e.target.value)} onKeyDown={handleAddExerciseTag} className="flex-1 bg-transparent outline-none min-w-[120px]" />
                </div>
               </div>
               <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm">Workout Day(s):</label>
                <div className="flex flex-wrap gap-2">
                  {allDays.map((day) => (
                    <button key={day} type="button" onClick={() => toggleDayTag(day)} className={`px-3 py-1 rounded-full text-sm border ${formDays.includes(day) ? "bg-blue-600 text-white" : "border-gray-300 dark:border-gray-600"}`}>{day}</button>
                  ))}
                </div>
               </div>
               <div className="flex justify-end gap-3 mt-4"><button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">Cancel</button><button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button></div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}