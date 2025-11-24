import { useState } from "react";

function ImageUploader({ multiple = false, onUpload }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
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
    } else {
      setError("");
      setFiles(validFiles);
      onUpload && onUpload(validFiles);
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
            onError={(e) => {
              e.target.style.display = "none";
              setError("One of the images could not be loaded.");
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;