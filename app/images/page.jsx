"use client";
import { useEffect, useState } from "react";

const ImagesPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/images");
        const data = await res.json();
        if (data.success) {
          setImages(data.images);
        }
      } catch (err) {
        console.error("Failed to fetch images:", err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((img) => (
        <div key={img._id} className="shadow rounded overflow-hidden">
          <img src={img.url} alt="Uploaded" className="w-full object-cover" />
          <p className="text-sm text-center mt-1">
            {new Date(img.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ImagesPage;