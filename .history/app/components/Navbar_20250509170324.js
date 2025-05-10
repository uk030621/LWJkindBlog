// components/Navbar.js
"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-slate-300 shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">Community Blog</Link>
      </div>

      <div className="flex items-center gap-4">
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
