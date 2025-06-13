import { NextResponse } from 'next/server';
import { connectToDB } from "@/lib/mongodb";
import Media from "@/models/Media";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const title = formData.get('title');

    if (!file || !title) {
      return NextResponse.json({ error: 'Missing file or title' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    await connectToDB();

    const created = await Media.create({
      title,
      file: buffer,
      contentType: file.type,
    });

    // Return only essential data
    return NextResponse.json({
      _id: created._id,
      title: created.title,
      contentType: created.contentType,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();

    // Include _id so frontend can fetch media
    const media = await Media.find({}, '_id title contentType')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(media);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

