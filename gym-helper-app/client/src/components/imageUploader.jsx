import { useState } from "react";
import { useAuth } from "../contexts/theme/AuthContext";

function ImageUploader({ multiple = false, onUpload }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const handleChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];
    let errorMsg = "";

    selectedFiles.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        errorMsg = "Only image files are allowed.";
      } else if (file.size > 2 * 1024 * 1024) {
        errorMsg = "File size must be under 2MB.";
      } else {
        validFiles.push(file);
      }
    });

    if (errorMsg) {
      setError(errorMsg);
      setFiles([]);
      return;
    } 
    setError("");
    setFiles(validFiles);

    const formData = new FormData();
    formData.append("avatar", validFiles[0]);
    
    try {
      const res = await fetch("http://localhost:5000/api/auth/me/avatar", {
        method: "PATCH", 
        body: formData, 
        credentials: "include", 
      });
      const json = await res.json();
      
      if (res.ok && json.data) {
        
        setUser(json.data);
      } 
    } catch (err) {
      setError("Upload failed.");
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleChange}
        className="p-2 border rounded"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-2 flex-wrap mt-2">
        {files.map((file, idx) => (
          <img
            key={idx}
            src={URL.createObjectURL(file)}
            alt={`preview-${idx}`}
            className="w-24 h-24 object-cover rounded border"
          />
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;