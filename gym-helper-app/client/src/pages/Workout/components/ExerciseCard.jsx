// import React from 'react';

// export default function ExerciseCard({ exercise, onLearnMore }) {
//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 w-full flex gap-4 items-center">
    
//       <div className="flex-shrink-0 w-28 h-20 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
        
//         <div className="text-gray-500 dark:text-gray-300">Form Video</div>
//       </div>

//       <div className="flex-1">
//         <h4 className="font-semibold text-md">{exercise.name}</h4>
//         <p className="text-sm text-gray-500 dark:text-gray-400">{exercise.muscleGroup}</p>
//       </div>

//       <div className="flex flex-col gap-2 items-end">
//         <button
//           onClick={() => onLearnMore && onLearnMore(exercise)}
//           className="px-4 py-2 bg-white border-2 border-black dark:border-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
//         >
//           Learn More
//         </button>
//         <span className="text-xs text-gray-400">{exercise.duration ?? ''}</span>
//       </div>
//     </div>
//   );
// }

// WENDOLEE'S CODE

// import React from 'react';

// export default function ExerciseCard({ exercise }) {
//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 w-full flex gap-4 items-center">
    
//       {/* Left: Thumbnail / Video Placeholder */}
//       <div className="flex-shrink-0 w-28 h-20 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
//         <div className="text-gray-500 dark:text-gray-300 text-xs">Form Video</div>
//         {/* In the future, you can put an <img /> or <video /> tag here */}
//       </div>

//       {/* Middle: Title & Muscle Group */}
//       <div className="flex-1 flex flex-col items-center justify-center">
//         <h4 className="font-bold text-lg text-center leading-tight">
//           {exercise.name}
//         </h4>
//         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center">
//           {exercise.muscleGroup}
//         </p>
//       </div>

//     </div>
//   );
// }

// import React from 'react';

// export default function ExerciseCard({ exercise }) {
//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 w-full flex gap-4 items-center">
    
//       {/* Left: GIF / Video */}
//       <div className="flex-shrink-0 w-28 h-28 bg-white dark:bg-gray-800 rounded-md overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-700">
//         <img 
//           src={exercise.gifUrl} 
//           alt={exercise.name} 
//           className="w-full h-full object-cover"
//           loading="lazy"
//           referrerPolicy="no-referrer" 
//         />
//       </div>

//       {/* Middle: Title & Muscle Group */}
//       <div className="flex-1 flex flex-col items-center justify-center">
//         <h4 className="font-bold text-lg text-center leading-tight capitalize">
//           {exercise.name}
//         </h4>
//         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center capitalize">
//           {exercise.target}
//         </p>
//       </div>

//     </div>
//   );
// }

// import React from 'react';

// export default function ExerciseCard({ exercise }) {
//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 w-full flex gap-4 items-center">
    
//       {/* Left: GIF / Video */}
//       <div className="flex-shrink-0 w-28 h-28 bg-white dark:bg-gray-800 rounded-md overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-700">
//         <img 
//           src={exercise.gifUrl} 
//           alt={exercise.name} 
//           className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
//           loading="lazy" 
//           referrerPolicy="no-referrer"
//           onError={(e) => {
//              // Fallback if GIF fails to load
//              e.target.onerror = null; 
//              e.target.style.display = 'none'; // Hide broken image
//              e.target.parentNode.innerText = 'No GIF'; // Show text instead
//              e.target.parentNode.className += ' text-xs text-gray-400 flex items-center justify-center';
//           }}
//         />
//       </div>

//       {/* Middle: Title & Muscle Group */}
//       <div className="flex-1 flex flex-col items-center justify-center">
//         <h4 className="font-bold text-lg text-center leading-tight capitalize">
//           {exercise.name}
//         </h4>
//         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center capitalize">
//           {exercise.target}
//         </p>
//       </div>

//     </div>
//   );
// }

import React from 'react';
import AuthenticatedImage from './AuthenticatedImage';

export default function ExerciseCard({ exercise }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 w-full flex gap-4 items-center">
      
      {/* Left: Image Container */}
      <div className="flex-shrink-0 w-24 h-24 bg-white dark:bg-gray-800 rounded-md overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-700">
        <AuthenticatedImage 
            exerciseId={exercise.id} 
            gifUrl={exercise.gifUrl} 
            alt={exercise.name} 
        />
      </div>

      {/* Middle: Title & Muscle Group */}
      <div className="flex-1 flex flex-col justify-center">
        <h4 className="font-bold text-lg leading-tight capitalize mb-1">
          {exercise.name}
        </h4>
        <div className="flex flex-wrap gap-2">
          {/* Target Muscle */}
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full capitalize">
            {exercise.target || "General"}
          </span>
          {/* Body Part */}
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full capitalize">
            {exercise.bodyPart || "Body"}
          </span>
        </div>
      </div>
    </div>
  );
}