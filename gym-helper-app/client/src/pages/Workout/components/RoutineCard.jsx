import React from 'react';
import { FiEdit } from 'react-icons/fi';

export default function RoutineCard({ routine, onEdit }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">{routine.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{routine.description}</p>
        </div>
        <button
          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center text-sm"
          onClick={() => onEdit && onEdit(routine)}
        >
          <FiEdit className="mr-2" /> Edit
        </button>
      </div>

      <div className="mt-3">
        <div className="flex gap-2 flex-wrap text-xs text-gray-600 dark:text-gray-300">
          {routine.exercises?.slice(0, 4).map((ex, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded"
            >
              {ex}
            </span>
          ))}
          {routine.exercises && routine.exercises.length > 4 ? (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">...</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
