"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { isAdmin } from "@/app/lib/isAdmin"; // adjust path as needed

export default function BlogList({ blogs }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("SESSION STATUS:", status);
    console.log("SESSION DATA:", session);
  }, [session, status]);

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

            {/* Debug info */}
            <p className="text-xs text-gray-400">
              Debug: blog.userEmail = {blog.userEmail}
              <br />
              session.user?.email = {session?.user?.email}
            </p>

            {(session?.user?.email === blog.userEmail ||
              isAdmin(session?.user?.email)) && (
              <div className="flex space-x-4 mt-2">
                <Link
                  href={`/blog/${blog._id}/edit`}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <form action={`/api/blogs/${blog._id}`} method="POST">
                  <input type="hidden" name="_method" value="DELETE" />
                  <button
                    type="button"
                    onClick={async () => {
                      const confirmed = confirm("Are you sure?");
                      if (!confirmed) return;

                      const res = await fetch(`/api/blogs/${blog._id}`, {
                        method: "DELETE",
                      });

                      if (res.ok) {
                        location.reload(); // Refresh to remove deleted post
                      } else {
                        alert("Delete failed");
                      }
                    }}
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
