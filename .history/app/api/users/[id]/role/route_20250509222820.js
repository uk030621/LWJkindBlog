import { connectToDB } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

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
