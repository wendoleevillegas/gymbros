import React from 'react';

export default function ExerciseCard({ exercise, onLearnMore }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 w-full flex gap-4 items-center">
    
      <div className="flex-shrink-0 w-28 h-20 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
        
        <div className="text-gray-500 dark:text-gray-300">Form Video</div>
      </div>

      <div className="flex-1">
        <h4 className="font-semibold text-md">{exercise.name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{exercise.muscleGroup}</p>
      </div>

      <div className="flex flex-col gap-2 items-end">
        <button
          onClick={() => onLearnMore && onLearnMore(exercise)}
          className="px-4 py-2 bg-white border-2 border-black dark:border-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
        >
          Learn More
        </button>
        <span className="text-xs text-gray-400">{exercise.duration ?? ''}</span>
      </div>
    </div>
  );
}
