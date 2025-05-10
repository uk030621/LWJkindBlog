import { connectToDB } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return Response.json({ role: null }, { status: 401 });

  const client = await connectToDB();
  const db = client.db();

  const user = await db
    .collection("users")
    .findOne({ email: session.user.email });
  const role = user?.role || "user";

  return Response.json({ role });
}

export async function POST(req, { params }) {
  const { id } = params;
  const formData = await req.formData();
  const role = formData.get("role");

  const client = await connectToDB();
  const db = client.db();

  await db
    .collection("users")
    .updateOne({ _id: new ObjectId(id) }, { $set: { role } });

  return new Response("Role updated", { status: 200 });
}
