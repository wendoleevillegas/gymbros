import React from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoMdNutrition } from "react-icons/io";
import { GrScorecard } from "react-icons/gr";
import { GrGallery } from "react-icons/gr";
import { LuCalendarFold } from "react-icons/lu";

function Profile() {
  const user = {
    name: "name",
    username: "@user",
    email: "user@gmail.com",
    profilePicture: "n/a",
  };

  const logout = () => {
    console.log("Logout clicked");
  };

  const navigate = (path) => {
    console.log(`Navigation: ${path}`);
  };

  return (
    <div className="flex flex-col gap-6 p-6 text-black dark:text-white bg-gray-50 dark:bg-black min-h-screen w-full">
      <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md relative">
        <button
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          onClick={() => console.log("editing")}
        >
          <HiOutlinePencilAlt className="w-5 h-5" />
        </button>

        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
        />

        <div className="flex flex-col gap-1 flex-1">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{user.username}</p>
          <p className="text-gray-500 dark:text-gray-500">{user.email}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/nutrition")}
            className="flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg shadow-md transition-colors cursor-pointer"
          >
            <IoMdNutrition className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-center">Nutrition</span>
          </button>

          <button
            onClick={() => navigate("/goals")}
            className="flex flex-col items-center justify-center p-6 bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800 rounded-lg shadow-md transition-colors cursor-pointer"
          >
            <GrScorecard className="w-12 h-12 text-green-600 dark:text-green-400 mb-2" />
            <span className="text-sm font-medium text-center">goals</span>
          </button>

          <button
            onClick={() => navigate("/gallery")}
            className="flex flex-col items-center justify-center p-6 bg-purple-50 dark:bg-purple-900 hover:bg-purple-100 dark:hover:bg-purple-800 rounded-lg shadow-md transition-colors cursor-pointer"
          >
            <GrGallery className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-2" />
            <span className="text-sm font-medium text-center">gallery</span>
          </button>

          <button
            onClick={() => navigate("/calendar")}
            className="flex flex-col items-center justify-center p-6 bg-yellow-50 dark:bg-yellow-900 hover:bg-yellow-100 dark:hover:bg-yellow-800 rounded-lg shadow-md transition-colors cursor-pointer"
          >
            <LuCalendarFold className="w-12 h-12 text-yellow-600 dark:text-yellow-400 mb-2" />
            <span className="text-sm font-medium text-center">calendar</span>
          </button>
        </div>
      </div>

      <button
        onClick={logout}
        className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
