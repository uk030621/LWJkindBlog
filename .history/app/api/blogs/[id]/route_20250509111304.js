import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(_req, { params }) {
  const { id } = params;

  try {
    const client = await clientPromise;
    const db = client.db();
    const blog = await db
      .collection("blogs")
      .findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (err) {
    console.error("Failed to fetch blog:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const session = await getServerSession(req, authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const client = await clientPromise;
  const db = client.db();

  const filter =
    session.user.role === "admin"
      ? { _id: new ObjectId(id) }
      : { _id: new ObjectId(id), authorId: session.user.id };

  const result = await db.collection("blogs").deleteOne(filter);

  if (result.deletedCount === 1) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(
      JSON.stringify({ error: "Blog not found or access denied" }),
      {
        status: 404,
      }
    );
  }
}
