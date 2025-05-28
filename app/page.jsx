"use client";
import { useState } from "react";

const Page = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    // const result = await res.json();
    // if (!res.ok) {
    //  console.error("Upload failed:", result.error);
    // } else {
    //   console.log("Uploaded:", result.data);
    // }

    const data = await res.json();
    if (data.success) {
      setImageUrl(data.data);
    } else {
      alert("Upload failed");
    }
  };

  return (
    <main className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" className="bg-blue-500 text-white p-2">Upload</button>
      </form>

      {imageUrl && (
        <div className="mt-4">
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" className="w-64 h-auto mt-2" />
        </div>
      )}
    </main>
  );
};

export default Page;