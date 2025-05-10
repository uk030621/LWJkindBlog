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
    <nav className="bg-slate-200 shadow-md px-6 py-4 flex justify-between items-center relative">
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">Community Blog</Link>
      </div>

      {/* Hamburger Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="w-8 h-8 sm:hidden flex items-center justify-center transition-all duration-300 ease-in-out"
      >
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

      {/* Navigation Links */}
      <div
        className={`sm:flex sm:items-center sm:gap-4 ${
          menuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-slate-200 p-6 sm:static sm:w-auto sm:bg-transparent shadow-lg sm:shadow-none rounded-md sm:rounded-none transition-all duration-300 ease-in-out`}
      >
        <Link href="/" className="block text-gray-700 hover:text-blue-600 py-2">
          Home
        </Link>
        <Link
          href="/blog"
          className="block text-gray-700 hover:text-blue-600 py-2"
        >
          Blogs
        </Link>
        {session?.user && (
          <Link
            href="/blog/create"
            className="block text-gray-700 hover:text-blue-600 py-2"
          >
            Create
          </Link>
        )}
        {role === "admin" && (
          <Link
            href="/admin"
            className="block text-gray-700 hover:text-blue-600 font-semibold py-2"
          >
            Admin
          </Link>
        )}
        {session ? (
          <>
            <span className="block text-sm text-gray-600 sm:inline sm:mr-4">
              {session.user.name}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm sm:w-auto"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm sm:w-auto"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
