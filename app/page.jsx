'use client';

import { useEffect, useState } from 'react';

const MediaGallery = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [media, setMedia] = useState([]);

  // Fetch media on component mount
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch('/api/media');
        const data = await res.json();

        if (Array.isArray(data)) {
          setMedia(data);
        } else if (Array.isArray(data.media)) {
          setMedia(data.media);
        } else {
          console.error('Unexpected media response:', data);
          setMedia([]);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setMedia([]);
      }
    };

    fetchMedia();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!file || !title) {
      return setMessage('Please provide a file and title.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setMessage('Upload successful');
      setTitle('');
      setFile(null);
      setMedia((prev) => [data, ...prev]); // prepend the newly uploaded media
    } catch (err) {
      setMessage(`Upload failed: ${err.message}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
        <p className={`text-sm mt-2 ${message.includes('successful') ? 'text-green-600' : 'text-red-500'}`}>
         {message}
        </p>

      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
        {Array.isArray(media) &&
          media.map((item) => (
            <div key={item._id} className="border p-2 rounded">
              <p className="text-sm font-bold">{item.title}</p>
              {item.contentType?.startsWith('image') ? (
                <img
                  src={`/api/media/${item._id}`}
                  alt={item.title}
                  className="w-full h-48 object-cover mt-2"
                />
              ) : (
                <video controls className="w-full h-48 mt-2">
                  <source
                    src={`/api/media/${item._id}`}
                    type={item.contentType}
                  />
                </video>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MediaGallery;