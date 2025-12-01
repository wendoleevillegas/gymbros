// import React from 'react';
// import { FiEdit } from 'react-icons/fi';

// export default function RoutineCard({ routine, onEdit }) {
//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 w-full">
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="font-semibold text-lg">{routine.name}</h3>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{routine.description}</p>
//         </div>
//         <button
//           className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center text-sm"
//           onClick={() => onEdit && onEdit(routine)}
//         >
//           <FiEdit className="mr-2" /> Edit
//         </button>
//       </div>

//       <div className="mt-3">
//         <div className="flex gap-2 flex-wrap text-xs text-gray-600 dark:text-gray-300">
//           {routine.exercises?.slice(0, 4).map((ex, idx) => (
//             <span
//               key={idx}
//               className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded"
//             >
//               {ex}
//             </span>
//           ))}
//           {routine.exercises && routine.exercises.length > 4 ? (
//             <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">...</span>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// }

// GOOD CODE

// import React from 'react';
// import { FiEdit } from 'react-icons/fi';

// export default function RoutineCard({ routine, onEdit }) {
//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700 w-full relative">
      
//       {/* Header Section */}
//       <div className="flex justify-between items-start mb-1">
//         <div>
//           <h3 className="font-bold text-lg">{routine.name}</h3>
//           <p className="text-sm text-gray-500 dark:text-gray-400">{routine.description}</p>
//         </div>
        
//         {/* Edit Button */}
//         <button
//           className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded flex items-center text-xs transition-colors"
//           onClick={() => onEdit && onEdit(routine)}
//         >
//           <FiEdit className="mr-1" /> Edit
//         </button>
//       </div>

//       {/* Days Tags (Optional display, helps user see when it's scheduled) */}
//       {routine.days && routine.days.length > 0 && (
//         <div className="mb-3 flex flex-wrap gap-1">
//             {routine.days.map(day => (
//                 <span key={day} className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 px-1 rounded">
//                     {day.substring(0, 3)}
//                 </span>
//             ))}
//         </div>
//       )}

//       {/* Exercise Tags */}
//       <div className="flex flex-wrap gap-2 mt-2">
//         {routine.exercises?.map((ex, idx) => (
//           <span
//             key={idx}
//             className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm text-gray-700 dark:text-gray-300"
//           >
//             {ex}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

export default function RoutineCard({ routine, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700 w-full relative">
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-1">
        <div>
          <h3 className="font-bold text-lg">{routine.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{routine.description}</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded flex items-center text-xs transition-colors"
            onClick={() => onEdit && onEdit(routine)}
            title="Edit Split"
          >
            <FiEdit className="mr-1" /> Edit
          </button>
          <button
            className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 px-3 py-1 rounded flex items-center text-xs transition-colors"
            onClick={() => onDelete && onDelete(routine.id)}
            title="Delete Split"
          >
            <FiTrash className="mr-1" /> Delete
          </button>
        </div>
      </div>

      {/* Days Tags */}
      {routine.days && routine.days.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
            {routine.days.map(day => (
                <span key={day} className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 px-1 rounded">
                    {day.substring(0, 3)}
                </span>
            ))}
        </div>
      )}

      {/* Exercise Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        {routine.exercises?.map((ex, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm text-gray-700 dark:text-gray-300"
          >
            {ex}
          </span>
        ))}
      </div>
    </div>
  );
}