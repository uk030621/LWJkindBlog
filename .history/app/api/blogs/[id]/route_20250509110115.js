import { db } from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const blogId = searchParams.get("id");

  if (blogId) {
    const blog = await db.collection("blogs").findOne({ _id: blogId });
    return Response.json(blog);
  }

  const blogs = await db
    .collection("blogs")
    .find()
    .sort({ date: -1 })
    .toArray();
  return Response.json(blogs);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content } = await req.json();
  const newBlog = {
    title,
    content,
    author: session.user.name,
    date: new Date(),
  };
  await db.collection("blogs").insertOne(newBlog);

  return Response.json(newBlog);
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { blogId } = await req.json();
  await db.collection("blogs").deleteOne({ _id: blogId });

  return Response.json({ message: "Blog deleted!" });
}
