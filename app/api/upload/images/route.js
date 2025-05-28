import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mydatabase");
    const images = await db.collection("images").find().sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, images });
  } catch (err) {
    console.error("Failed to fetch images:", err);
    return NextResponse.json({ success: false, error: "Error fetching images" }, { status: 500 });
  }
}
