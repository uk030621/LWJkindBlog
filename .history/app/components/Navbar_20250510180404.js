"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

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
  const closeMenu = () => menuOpen && setMenuOpen(false);

  return (
    <nav className="bg-slate-200 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          onClick={closeMenu}
          className="text-xl font-bold text-blue-600"
        >
          Community Blog
        </Link>

        <button
          className="md:hidden text-gray-800"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <div
        className={`flex flex-col md:hidden gap-4 px-6 pt-2 pb-4 bg-slate-200 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="text-gray-700 hover:text-blue-600"
        >
          Home
        </Link>
        <Link
          href="/blog"
          onClick={closeMenu}
          className="text-gray-700 hover:text-blue-600"
        >
          Blogs
        </Link>
        {session?.user && (
          <Link
            href="/blog/create"
            onClick={closeMenu}
            className="text-gray-700 hover:text-blue-600"
          >
            Create
          </Link>
        )}
        {role === "admin" && (
          <Link
            href="/admin"
            onClick={closeMenu}
            className="text-gray-700 hover:text-blue-600 font-semibold"
          >
            Admin
          </Link>
        )}
        {session ? (
          <>
            <span className="text-sm text-gray-600">{session.user.name}</span>
            <button
              onClick={() => {
                closeMenu();
                signOut({ callbackUrl: "/" });
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              closeMenu();
              signIn("google", { callbackUrl: "/" });
            }}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4 px-6 pb-4">
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
            <span className="text-sm text-gray-600">{session.user.name}</span>
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
