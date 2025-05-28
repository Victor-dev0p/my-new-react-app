import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "uploads" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }).end(buffer);
    });

    const client = await clientPromise;
    const db = client.db("mydatabase");
    const collection = db.collection("images");

    await collection.insertOne({
      url: result.secure_url,
      public_id: result.public_id,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, data: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}