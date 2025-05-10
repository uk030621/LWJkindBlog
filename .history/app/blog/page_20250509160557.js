// app/blog/page.js
import Link from "next/link";

async function fetchBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
}

export default async function BlogPage() {
  const blogs = await fetchBlogs();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Blogs</h1>
      {blogs.length === 0 ? (
        <p className="text-gray-600">No blogs found.</p>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-semibold text-blue-600">
                {blog.title}
              </h2>
              <p className="text-gray-700 mt-2">{blog.content}</p>
              <div className="text-sm text-gray-500 mt-4">
                By <strong>{blog.author}</strong> on{" "}
                {new Date(blog.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
