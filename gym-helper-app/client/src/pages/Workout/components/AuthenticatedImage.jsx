import React, { useState, useEffect } from 'react';

export default function AuthenticatedImage({ exerciseId, gifUrl, alt }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let objectUrl = null;

    const fetchSecureImage = async () => {
      try {
        setLoading(true);
        
        // This is the endpoint you found. We use 360 resolution to be faster.
        // You can change '360' to '1080' if you want high res (but it's slower).
        const url = `https://exercisedb.p.rapidapi.com/image?resolution=360&exerciseId=${exerciseId}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
          }
        });

        if (!response.ok) {
            throw new Error("API Image fetch failed");
        }

        // Convert the response to a Blob (file data)
        const blob = await response.blob();
        
        // Create a local URL for that data
        objectUrl = URL.createObjectURL(blob);
        
        if (isMounted) {
            setImageSrc(objectUrl);
            setLoading(false);
        }

      } catch (err) {
        console.error("Image fetch error:", err);
        // Fallback: If API fails (e.g. quota exceeded), try the standard GIF URL
        if (isMounted) {
            if (gifUrl) {
                setImageSrc(gifUrl);
            } else {
                setError(true);
            }
            setLoading(false);
        }
      }
    };

    fetchSecureImage();

    // Cleanup memory when component unmounts
    return () => {
      isMounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [exerciseId, gifUrl]);

  if (loading) {
    return <div className="w-full h-full bg-gray-200 animate-pulse" />;
  }

  if (error || !imageSrc) {
    return (
      <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-400 p-2 text-center">
        <span className="text-[10px]">No Image</span>
      </div>
    );
  }

  return (
    <img 
      src={imageSrc} 
      alt={alt} 
      className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}