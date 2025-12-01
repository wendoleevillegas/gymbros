// import { HiOutlinePencilAlt } from "react-icons/hi";
// import { IoMdNutrition } from "react-icons/io";
// import { GrScorecard } from "react-icons/gr";
// import { GrGallery } from "react-icons/gr";
// import { LuCalendarFold } from "react-icons/lu";
// import { useAuth, unknownUser } from "../../contexts/theme/AuthContext";
// import { useState } from "react";
// import ImageUploader from "../../components/imageUploader";

// function Profile() {

//   const { user, logout, setUser } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();
//   // popup visibility
//   const [showNutritionModal, setShowNutritionModal] = useState(false);

//   // 2. State for the Form Data
//   const [nutritionForm, setNutritionForm] = useState({
//     calories: user?.dailyLog?.calories || 0,
//     protein: user?.dailyLog?.macros?.protein || 0,
//     carbs: user?.dailyLog?.macros?.carbs || 0,
//     fats: user?.dailyLog?.macros?.fats || 0,
//   });

//   // Handle typing in the form
//   const handleInputChange = (e) => {
//     setNutritionForm({ ...nutritionForm, [e.target.name]: Number(e.target.value) });
//   };

//   // 3. Handle Form Submission
//   const handleSaveNutrition = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/me/nutrition", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(nutritionForm),
//       });

//       if (res.ok) {
//         const json = await res.json();
//         setUser(json.data); // Update global app state immediately
//         setShowNutritionModal(false); // Close popup
//       }
//     } catch (err) {
//       console.error("Failed to save", err);
//     }
//   };

//   // Helper to open the modal
//   const openNutritionModal = () => {
//     // Pre-fill form with current user data
//     setNutritionForm({
//       calories: user?.dailyLog?.calories || 0,
//       protein: user?.dailyLog?.macros?.protein || 0,
//       carbs: user?.dailyLog?.macros?.carbs || 0,
//       fats: user?.dailyLog?.macros?.fats || 0,
//     });
//     setShowNutritionModal(true);
//   };

//   // const navigate = (path) => {
//   //   console.log(`Navigation: ${path}`);
//   // };

//   return (
//     <div className="flex flex-col gap-20 p-6 text-black dark:text-white bg-white dark:bg-black min-h-screen w-full">
//       <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-15 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 relative">
//         <button
//           className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
//           onClick={() => setIsEditing(true)}

//         >
//           <HiOutlinePencilAlt className="w-10 h-10" />
//         </button>
       
//         <img
//           src={user?.profilePicture ?? unknownUser.profilePicture}
//           alt="Profile"
//           className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
//         />

//         <div className="flex flex-col gap-2">
//           <h1 className="text-2xl font-bold">{user?.name ?? unknownUser.name}</h1>
//           <p className="text-gray-600 dark:text-gray-400">{user?.username ?? unknownUser.username}</p>
//         </div>
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold pb-10">Quick Stats</h2>

//         <div className="grid lg:grid-cols-2 gap-20">
//           <button
//             // onClick={() => navigate("/nutrition")}
//             onClick={(openNutritionModal)}
//                 className="flex flex-col border border-gray-200 dark:border-gray-700 items-center justify-center p-20 pl-10 pr-10 bg-white dark:bg-gray-900 hover:bg-purple-50 dark:hover:bg-gray-900 rounded-3xl shadow-md transition-colors cursor-pointer"
//           >
//             <IoMdNutrition className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-2" />
//             <span className="text-sm font-medium text-center">Nutrition</span>
//           </button>

//           <button
//             onClick={() => navigate("/goals")}
//             className="flex flex-col border border-gray-200 dark:border-gray-700 items-center justify-center p-20 pl-10 pr-10 bg-white dark:bg-gray-900 hover:bg-green-50 dark:hover:bg-gray-900 rounded-3xl shadow-md transition-colors cursor-pointer"
//           >
//             <GrScorecard className="w-12 h-12 text-green-600 dark:text-green-400 mb-2" />
//             <span className="text-sm font-medium text-center">Goals</span>
//           </button>

//           <button
//             onClick={() => navigate("/gallery")}
//             className="flex flex-col border border-gray-200 dark:border-gray-700 items-center justify-center p-20 pl-10 pr-10 bg-white dark:bg-gray-900 hover:bg-purple-50 dark:hover:bg-gray-900 rounded-3xl shadow-md transition-colors cursor-pointer"
//           >
//             <GrGallery className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-2" />
//             <span className="text-sm font-medium text-center">Gallery</span>
//           </button>

//           <button
//             onClick={() => navigate("/calendar")}
//             className="flex flex-col border border-gray-200 dark:border-gray-700 items-center justify-center p-20 pl-10 pr-10 bg-white dark:bg-gray-900 hover:bg-yellow-50 dark:hover:bg-gray-900 rounded-3xl shadow-md transition-colors cursor-pointer"
//           >
//             <LuCalendarFold className="w-12 h-12 text-yellow-600 dark:text-yellow-400 mb-2" />
//             <span className="text-sm font-medium text-center">Calendar</span>
//           </button>
//         </div>
//       </div>

//       <button
//         onClick={logout}
//         className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors"
//       >
//         Logout
//       </button>
//       {isEditing && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
//             <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
//             <form
//               onSubmit={ async (e) => {
//                 e.preventDefault();
//                 // TODO: handle update logic
//                 const form = e.target;
//                 const updatedUser = {
//                   name: form[0].value,
//                   username: form[1].value, 
//                   // avatar will be updated via ImageUploader callback
//                 };
//                 //TODO: send updatedUser (name + username) to backend
//                 try {
//                   const res = await fetch("http://localhost:5000/api/auth/me", {
//                     method: "PATCH", 
//                     headers: {
//                       "Content-Type": "application/json", 
//                     },
//                     credentials: "include", 
//                     body: JSON.stringify(updatedUser), 
//                   });
//                   if(res.ok){
//                     const json = await res.json();
//                     setUser(json.data);
//                     setIsEditing(false);
//                   } else{
//                     console.error("Failed to update profile");
//                   }
//                 } catch (err) {
//                   console.error("Error updating profile:", err);
//                 }
//               }}
//               className="flex flex-col gap-4"
//             >
//               <input
//                 type="text"
//                 defaultValue={user?.name}
//                 placeholder="Name"
//                 className="p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 defaultValue={user?.username}
//                 placeholder="Username"
//                 className="p-2 border rounded"
//               />
//               <label className = "block mb-2">
//                 Profile Picture
//                 <ImageUploader
//                   multiple={false}
//                 />
//               </label>
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(false)}
//                   className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// WENDOLEE'S CODE

import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoMdNutrition } from "react-icons/io";
import { GrScorecard } from "react-icons/gr";
import { GrGallery } from "react-icons/gr";
import { LuCalendarFold } from "react-icons/lu";
import { useAuth, unknownUser } from "../../contexts/theme/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import ImageUploader from "../../components/imageUploader";

function Profile() {
  const { user, logout, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // --- Nutrition Modal State ---
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [nutritionForm, setNutritionForm] = useState({
    calories: 0, protein: 0, carbs: 0, fats: 0,
  });

  // --- Goals Modal State ---
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [goalsForm, setGoalsForm] = useState({
    targetCalories: 0, protein: 0, carbs: 0, fats: 0,
  });

  // Helper to open Nutrition modal
  const openNutritionModal = () => {
    setNutritionForm({
      calories: user?.dailyLog?.calories || 0,
      protein: user?.dailyLog?.macros?.protein || 0,
      carbs: user?.dailyLog?.macros?.carbs || 0,
      fats: user?.dailyLog?.macros?.fats || 0,
    });
    setShowNutritionModal(true);
  };

  // Helper to open Goals modal
  const openGoalsModal = () => {
    setGoalsForm({
      targetCalories: user?.nutrition?.targetCalories || 0,
      protein: user?.nutrition?.macros?.protein || 0,
      carbs: user?.nutrition?.macros?.carbs || 0,
      fats: user?.nutrition?.macros?.fats || 0,
    });
    setShowGoalsModal(true);
  };

  // Handle Input Changes
  const handleNutritionChange = (e) => {
    setNutritionForm({ ...nutritionForm, [e.target.name]: Number(e.target.value) });
  };

  const handleGoalsChange = (e) => {
    setGoalsForm({ ...goalsForm, [e.target.name]: Number(e.target.value) });
  };

  // Handle Save Nutrition
  const handleSaveNutrition = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/me/nutrition", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(nutritionForm),
      });
      if (res.ok) {
        const json = await res.json();
        setUser(json.data);
        setShowNutritionModal(false);
      }
    } catch (err) {
      console.error("Failed to save nutrition", err);
    }
  };

  // Handle Save Goals
  const handleSaveGoals = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/me/goals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(goalsForm),
      });
      if (res.ok) {
        const json = await res.json();
        setUser(json.data);
        setShowGoalsModal(false);
      }
    } catch (err) {
      console.error("Failed to save goals", err);
    }
  };

  return (
    // MAIN CONTAINER: h-screen to fill viewport, overflow-hidden to prevent scroll
    <div className="h-screen flex flex-col items-center justify-center p-4 md:p-8 text-black dark:text-white bg-white dark:bg-black w-full overflow-hidden">
      
      {/* Content Wrapper - constrained width for cleaner look */}
      <div className="w-full max-w-4xl flex flex-col gap-6 md:gap-8">
        
        {/* --- Header Section --- */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 relative">
          <button
            className="absolute top-4 right-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
            onClick={() => setIsEditing(true)}
          >
            <HiOutlinePencilAlt className="w-6 h-6 text-black dark:text-white" />
          </button>

          <img
            src={user?.profilePicture ?? unknownUser.profilePicture}
            alt="Profile"
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
          />

          <div className="flex flex-col gap-1">
            <h1 className="text-xl md:text-2xl font-bold">{user?.name ?? unknownUser.name}</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              {user?.username ?? unknownUser.username}
            </p>
          </div>
        </div>

        {/* --- Stats Buttons (2x2 Grid) --- */}
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-4 ml-2">Quick Stats</h2>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={openNutritionModal}
              className="flex flex-col border border-gray-200 dark:border-gray-700 items-center justify-center p-6 bg-white dark:bg-gray-900 hover:bg-purple-50 dark:hover:bg-gray-800 rounded-3xl shadow-md transition-colors cursor-pointer text-black"
            >
              <IoMdNutrition className="w-8 h-8 md:w-10 md:h-10 text-blue-600 dark:text-blue-400 mb-2" />
              <span className="text-sm font-medium text-center dark:text-white">Nutrition</span>
            </button>

            <button
              // onClick={() => navigate("/goals")}
              onClick={openGoalsModal}
              className="flex flex-col border border-gray-200 dark:border-gray-700 items-center justify-center p-6 bg-white dark:bg-gray-900 hover:bg-green-50 dark:hover:bg-gray-800 rounded-3xl shadow-md transition-colors cursor-pointer text-black"
            >
              <GrScorecard className="w-8 h-8 md:w-10 md:h-10 text-green-600 dark:text-green-400 mb-2" />
              <span className="text-sm font-medium text-center dark:text-white">Goals</span>
            </button>

            <button
              onClick={() => navigate("/gallery")}
              className="flex flex-col border border-gray-200 dark:border-gray-700 items-center justify-center p-6 bg-white dark:bg-gray-900 hover:bg-purple-50 dark:hover:bg-gray-800 rounded-3xl shadow-md transition-colors cursor-pointer text-black"
            >
              <GrGallery className="w-8 h-8 md:w-10 md:h-10 text-purple-600 dark:text-purple-400 mb-2" />
              <span className="text-sm font-medium text-center dark:text-white">Gallery</span>
            </button>

            <button
              onClick={() => navigate("/calendar")}
              className="flex flex-col border border-gray-200 dark:border-gray-700 items-center justify-center p-6 bg-white dark:bg-gray-900 hover:bg-yellow-50 dark:hover:bg-gray-800 rounded-3xl shadow-md transition-colors cursor-pointer text-black"
            >
              <LuCalendarFold className="w-8 h-8 md:w-10 md:h-10 text-yellow-600 dark:text-yellow-400 mb-2" />
              <span className="text-sm font-medium text-center dark:text-white">Calendar</span>
            </button>
          </div>
        </div>

        {/* --- Logout Button --- */}
        <button
          onClick={logout}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-2xl shadow-lg transition-colors text-lg mt-auto"
        >
          Logout
        </button>
      </div>

      {/* --- Edit Profile Modal --- */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Edit Profile</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const updatedUser = {
                  name: form[0].value,
                  username: form[1].value,
                };
                try {
                  const res = await fetch("http://localhost:5000/api/auth/me", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(updatedUser),
                  });
                  if (res.ok) {
                    const json = await res.json();
                    setUser(json.data);
                    setIsEditing(false);
                  }
                } catch (err) { console.error("Error updating profile:", err); }
              }}
              className="flex flex-col gap-4"
            >
              <input type="text" defaultValue={user?.name} placeholder="Name" className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white" />
              <input type="text" defaultValue={user?.username} placeholder="Username" className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white" />
              <label className="block mb-2 text-black dark:text-white">Profile Picture <ImageUploader multiple={false} /></label>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded text-black dark:text-white">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Nutrition Modal --- */}
      {showNutritionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-center text-black dark:text-white">Log Nutrition</h2>
            <form onSubmit={handleSaveNutrition} className="flex flex-col gap-4">
              <label className="flex flex-col">
                <span className="text-sm font-semibold mb-1 text-black dark:text-white">Calories</span>
                <input type="number" name="calories" value={nutritionForm.calories} onChange={handleNutritionChange} className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white" />
              </label>
              <div className="flex justify-between gap-2">
                <label className="flex flex-col w-1/3">
                  <span className="text-xs font-semibold mb-1 text-center text-black dark:text-white">Protein (g)</span>
                  <input type="number" name="protein" value={nutritionForm.protein} onChange={handleNutritionChange} className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 text-center text-black dark:text-white" />
                </label>
                <label className="flex flex-col w-1/3">
                  <span className="text-xs font-semibold mb-1 text-center text-black dark:text-white">Carbs (g)</span>
                  <input type="number" name="carbs" value={nutritionForm.carbs} onChange={handleNutritionChange} className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 text-center text-black dark:text-white" />
                </label>
                <label className="flex flex-col w-1/3">
                  <span className="text-xs font-semibold mb-1 text-center text-black dark:text-white">Fats (g)</span>
                  <input type="number" name="fats" value={nutritionForm.fats} onChange={handleNutritionChange} className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 text-center text-black dark:text-white" />
                </label>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setShowNutritionModal(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded text-black dark:text-white">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Save Log</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Goals Modal --- */}
      {showGoalsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-center text-black dark:text-white">What are your nutrition goals?</h2>
            <form onSubmit={handleSaveGoals} className="flex flex-col gap-4">
              <label className="flex flex-col">
                <span className="text-sm font-semibold mb-1 text-black dark:text-white">Target Calories</span>
                <input type="number" name="targetCalories" value={goalsForm.targetCalories} onChange={handleGoalsChange} className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white" />
              </label>
              <div className="flex justify-between gap-2">
                <label className="flex flex-col w-1/3">
                  <span className="text-xs font-semibold mb-1 text-center text-black dark:text-white">Protein (g)</span>
                  <input type="number" name="protein" value={goalsForm.protein} onChange={handleGoalsChange} className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 text-center text-black dark:text-white" />
                </label>
                <label className="flex flex-col w-1/3">
                  <span className="text-xs font-semibold mb-1 text-center text-black dark:text-white">Carbs (g)</span>
                  <input type="number" name="carbs" value={goalsForm.carbs} onChange={handleGoalsChange} className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 text-center text-black dark:text-white" />
                </label>
                <label className="flex flex-col w-1/3">
                  <span className="text-xs font-semibold mb-1 text-center text-black dark:text-white">Fats (g)</span>
                  <input type="number" name="fats" value={goalsForm.fats} onChange={handleGoalsChange} className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 text-center text-black dark:text-white" />
                </label>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setShowGoalsModal(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded text-black dark:text-white">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Save Goals</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;