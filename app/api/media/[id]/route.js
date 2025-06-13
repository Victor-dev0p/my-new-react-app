import { NextResponse } from 'next/server';
import { connectToDB } from "@/lib/mongodb";
import Media from "@/models/Media";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const media = await Media.findById(params.id);
    if (!media) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return new Response(media.file.buffer, {
      headers: {
        'Content-Type': media.contentType,
        'Content-Disposition': `inline; filename="${media.title}"`,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
