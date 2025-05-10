import { db } from "@/utils/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const users = await db.collection("users").find().toArray();
  return Response.json(users);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email, name, role } = await req.json();
  await db.collection("users").insertOne({ email, name, role });

  return Response.json({ message: "User added successfully!" });
}
