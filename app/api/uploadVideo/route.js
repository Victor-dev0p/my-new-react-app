import { connectToDB } from '@/lib/mongodb';
import Video from '@/models/Video';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('video');
    const title = formData.get('title');

    if (!file || !title) {
      return Response.json({ error: 'Missing video or title' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await connectToDB();

    const newVideo = await Video.create({
      title,
      data: buffer,
      contentType: file.type || 'video/mp4',
    });

    return Response.json({ message: 'Uploaded to MongoDB', video: { id: newVideo._id, title: newVideo.title } });
  } catch (error) {
    console.error('Upload Error:', error);
    return Response.json({ error: 'Upload failed', details: error.message }, { status: 500 });
  }
}