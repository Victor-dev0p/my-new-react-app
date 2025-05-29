import { connectToDB } from '@/lib/mongodb';
import Video from '@/models/Video';

export async function GET() {
  try {
    await connectToDB();
    const videos = await Video.find().sort({ createdAt: -1 });
    return Response.json(videos);
  } catch (err) {
    console.error('Video fetch error:', err);
    return new Response('Failed to fetch videos', { status: 500 });
  }
}