// app/blog/page.js
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const session = await getServerSession(authOptions);
  const client = await connectToDB();
  const db = client.db();

  const blogs = await db
    .collection("blogs")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Community Blog</h1>

      {blogs.length === 0 && (
        <p className="text-gray-500 text-center">No blog posts yet.</p>
      )}

      <div className="space-y-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-6 rounded shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {blog.title}
            </h2>
            <p className="text-gray-600 mb-4 whitespace-pre-wrap">
              {blog.content}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              By <span className="font-medium">{blog.userName}</span> on{" "}
              {new Date(blog.createdAt).toLocaleString()}
            </p>

            {session?.user?.email === blog.userEmail && (
              <div className="flex space-x-4">
                <Link
                  href={`/blog/${blog._id}/edit`}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <form action={`/api/blogs/${blog._id}`} method="POST">
                  <input type="hidden" name="_method" value="DELETE" />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
