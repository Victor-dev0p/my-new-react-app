import { connectToDB } from '@/lib/mongodb';
import Video from '@/models/Video';

export async function GET(req, { params }) {
  await connectToDB();
  const video = await Video.findById(params.id);

  if (!video) return new Response('Not found', { status: 404 });

  return new Response(video.data, {
    headers: {
      'Content-Type': video.contentType,
      'Content-Length': video.data.length,
    },
  });
}