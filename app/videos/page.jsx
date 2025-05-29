'use client';
import { useState, useEffect } from 'react';

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch('/api/uploadVideo/videos');
      const data = await res.json();
      setVideos(data);
    };
    fetchVideos();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Uploaded Videos</h1>
      {videos.map((video) => (
        <div key={video._id} className="border p-4 rounded">
          <h2 className="text-lg font-semibold">{video.title}</h2>
          <video
            src={`/api/uploadVideo/videos/${video._id}`}
            controls
            width="600"
            className="mt-2"
          />
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;