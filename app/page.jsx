'use client';

import { useState } from 'react';

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!file || !title) {
      return setMessage('Please provide a video and title.');
    }

    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', title);

    try {
      const res = await fetch('/api/uploadVideo', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setMessage(data.message || 'Upload complete');
    } catch (err) {
      setMessage(`Upload failed: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <input
        type="file"
        accept="video/mp4"
        onChange={(e) => setFile(e.target.files[0])}
        required
        className="block"
      />
      <input
        type="text"
        placeholder="Video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="block border p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
        Upload to MongoDB
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
};

export default UploadVideo;