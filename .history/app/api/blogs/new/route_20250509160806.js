import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, content, author, email } = body;

    if (!title || !content || !author || !email) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const client = await connectToDB();
    const db = client.db();

    const newPost = {
      title,
      content,
      author,
      email,
      createdAt: new Date(),
    };

    await db.collection("blogs").insertOne(newPost);

    return NextResponse.json({ message: "Blog created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
