"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      const res = await fetch("/api/user/role");
      if (res.ok) {
        const data = await res.json();
        setRole(data.role);
      }
    };

    if (session?.user) {
      fetchRole();
    }
  }, [session]);

  return (
    <nav className="bg-slate-200 shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">Community Blog</Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="w-6 h-6">
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        <Link href="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link href="/blog" className="text-gray-700 hover:text-blue-600">
          Blogs
        </Link>
        {session?.user && (
          <Link
            href="/blog/create"
            className="text-gray-700 hover:text-blue-600"
          >
            Create
          </Link>
        )}
        {role === "admin" && (
          <Link
            href="/admin"
            className="text-gray-700 hover:text-blue-600 font-semibold"
          >
            Admin
          </Link>
        )}
        {session ? (
          <>
            <span className="text-sm text-gray-600 hidden sm:inline">
              {session.user.name}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
