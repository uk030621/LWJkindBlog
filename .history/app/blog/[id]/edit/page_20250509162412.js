// app/blog/[id]/edit/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function EditBlog({ params }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const blogId = params.id;

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`/api/blogs/${blogId}`);
      const data = await res.json();

      if (data.userEmail !== session?.user?.email) {
        router.push("/unauthorized");
        return;
      }

      setBlog(data);
      setTitle(data.title);
      setContent(data.content);
      setLoading(false);
    };

    if (status === "authenticated") fetchBlog();
  }, [status, blogId, session, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`/api/blogs/${blogId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    router.push("/");
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
      });
      router.push("/");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
