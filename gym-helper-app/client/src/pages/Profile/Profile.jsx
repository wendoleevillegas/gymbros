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
    profilePicture: "/assets/croc-dark.png",
  };

  const logout = () => {
    console.log("Logout clicked");
  };

  const navigate = (path) => {
    console.log(`Navigation: ${path}`);
  };

  return (
    <div className="flex flex-col gap-20 p-6 text-black dark:text-white bg-white dark:bg-black min-h-screen w-full">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-15 p-6 bg-blue-300 dark:bg-gray-800 rounded-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          onClick={() => console.log("editing")}
        >
          <HiOutlinePencilAlt className="w-10 h-10" />
        </button>

        <img
          src={user.profilePicture}
          alt=""
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
        />

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{user.username}</p>
          <p className="text-gray-500 dark:text-gray-500">{user.email}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold pb-10">Quick Stats</h2>

        <div className="grid lg:grid-cols-2 gap-20">
          <button
            onClick={() => navigate("/nutrition")}
            className="flex flex-col border-2 border-black dark:border-white items-center justify-center p-20 pl-10 pr-10 bg-white dark:bg-black hover:bg-blue-100 dark:hover:bg-gray-900 rounded-3xl shadow-md transition-colors cursor-pointer"
          >
            <IoMdNutrition className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-center">Nutrition</span>
          </button>

          <button
            onClick={() => navigate("/goals")}
            className="flex flex-col border-2 border-black dark:border-white items-center justify-center p-20 pl-10 pr-10 bg-white dark:bg-black hover:bg-green-100 dark:hover:bg-gray-900 rounded-3xl shadow-md transition-colors cursor-pointer"
          >
            <GrScorecard className="w-12 h-12 text-green-600 dark:text-green-400 mb-2" />
            <span className="text-sm font-medium text-center">goals</span>
          </button>

          <button
            onClick={() => navigate("/gallery")}
            className="flex flex-col border-2 border-black dark:border-white items-center justify-center p-20 pl-10 pr-10 bg-white dark:bg-black hover:bg-purple-100 dark:hover:bg-gray-900 rounded-3xl shadow-md transition-colors cursor-pointer"
          >
            <GrGallery className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-2" />
            <span className="text-sm font-medium text-center">gallery</span>
          </button>

          <button
            onClick={() => navigate("/calendar")}
            className="flex flex-col border-2 border-black dark:border-white items-center justify-center p-20 pl-10 pr-10 bg-white dark:bg-black hover:bg-yellow-100 dark:hover:bg-gray-900 rounded-3xl shadow-md transition-colors cursor-pointer"
          >
            <LuCalendarFold className="w-12 h-12 text-yellow-600 dark:text-yellow-400 mb-2" />
            <span className="text-sm font-medium text-center">calendar</span>
          </button>
        </div>
      </div>

      <button
        onClick={logout}
        className="w-full py-3 px-4 bg-blue-700 hover:bg-gray-900 border-2 border-black dark:border-white text-white font-medium rounded-lg shadow-md transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
