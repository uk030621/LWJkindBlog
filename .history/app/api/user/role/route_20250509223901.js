import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/app/lib/mongodb";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ role: null }, { status: 401 });
  }

  const client = await connectToDB();
  const db = client.db();

  const user = await db
    .collection("users")
    .findOne({ email: session.user.email });
  const role = user?.role || "user";

  return Response.json({ role });
}
