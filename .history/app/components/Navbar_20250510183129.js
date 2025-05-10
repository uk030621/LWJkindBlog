"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // optional: hamburger icons

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

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="bg-slate-200 shadow-md px-6 py-4 relative">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">
          <Link href="/">Community Blog</Link>
        </div>

        {/* Hamburger Button (Mobile only) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
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
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px] py-4" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6">
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
      </div>
    </nav>
  );
}
