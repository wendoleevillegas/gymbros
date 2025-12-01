import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/theme/AuthContext";
import { IoArrowBack } from "react-icons/io5";
import { FiPlus, FiTrash2 } from "react-icons/fi"; // Icon for upload
import { useNavigate } from "react-router-dom";

export default function Gallery() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  // Handle File Selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/auth/me/gallery", {
        method: "POST", // Note: We use POST for adding new items
        credentials: "include",
        body: formData,
      });

      if (res.ok) {
        const json = await res.json();
        setUser(json.data); // Update global user state with new gallery data
      } else {
        console.error("Failed to upload image");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageId) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/auth/me/gallery/${imageId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        const json = await res.json();
        setUser(json.data); // Update UI immediately
      } else {
        console.error("Failed to delete image");
      }
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  // Sort gallery by date (newest first)
  const sortedGallery = user?.gallery?.slice().sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  ) || [];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6 pb-24">
      {/* --- Header --- */}
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-2 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/profile")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <IoArrowBack className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Progress Gallery</h1>
        </div>

        {/* Upload Button */}
        <div>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
            />
            <button
                onClick={() => fileInputRef.current.click()}
                disabled={isUploading}
                className="flex items-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-4 py-2 rounded-full font-medium transition-colors disabled:opacity-50 shadow-lg"
                >
                {isUploading ? (
                    <span className="animate-pulse">Uploading...</span>
                ) : (
                    <>
                        <FiPlus className="w-5 h-5" />
                        <span>Add Photo</span>
                    </>
                )}
            </button>
        </div>
      </div>

      {/* --- Gallery Grid --- */}
      {sortedGallery.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500 dark:text-gray-400">
            <p className="text-lg">No progress pictures yet.</p>
            <p className="text-sm">Upload one to start your journey!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedGallery.map((item, index) => (
            <div key={index} className="group relative break-inside-avoid">
              <div className="overflow-hidden rounded-2xl shadow-md bg-gray-100 dark:bg-gray-900 aspect-[3/4]">
                <img
                  src={item.url}
                  alt={`Progress ${index}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pt-10 rounded-b-2xl">
                <p className="text-white text-sm font-medium">
                  {new Date(item.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}