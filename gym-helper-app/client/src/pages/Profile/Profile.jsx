import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoMdNutrition } from "react-icons/io";
import { GrScorecard } from "react-icons/gr";
import { GrGallery } from "react-icons/gr";
import { LuCalendarFold } from "react-icons/lu";
import { useAuth, unknownUser } from "../../contexts/theme/AuthContext";
import { useState } from "react";
import ImageUploader from "../../components/imageUploader";

function Profile() {

  const { user, logout, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
 
  const navigate = (path) => {
    console.log(`Navigation: ${path}`);
  };

  return (
    <div className="flex flex-col gap-20 p-6 text-black dark:text-white bg-white dark:bg-black min-h-screen w-full">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-15 p-6 bg-blue-300 dark:bg-gray-800 rounded-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          onClick={() => setIsEditing(true)}

        >
          <HiOutlinePencilAlt className="w-10 h-10" />
        </button>
       
        <img
          src={user?.profilePicture ?? unknownUser.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
        />

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{user?.name ?? unknownUser.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{user?.username ?? unknownUser.username}</p>
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
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form
              onSubmit={ async (e) => {
                e.preventDefault();
                // TODO: handle update logic
                const form = e.target;
                const updatedUser = {
                  name: form[0].value,
                  username: form[1].value, 
                  // avatar will be updated via ImageUploader callback
                };
                //TODO: send updatedUser (name + username) to backend
                try {
                  const res = await fetch("http://localhost:5000/api/auth/me", {
                    method: "PATCH", 
                    headers: {
                      "Content-Type": "application/json", 
                    },
                    credentials: "include", 
                    body: JSON.stringify(updatedUser), 
                  });
                  if(res.ok){
                    const json = await res.json();
                    setUser(json.data);
                    setIsEditing(false);
                  } else{
                    console.error("Failed to update profile");
                  }
                } catch (err) {
                  console.error("Error updating profile:", err);
                }
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                defaultValue={user?.name}
                placeholder="Name"
                className="p-2 border rounded"
              />
              <input
                type="text"
                defaultValue={user?.username}
                placeholder="Username"
                className="p-2 border rounded"
              />
              <label className = "block mb-2">
                Profile Picture
                <ImageUploader
                  multiple={false}
                />
              </label>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
