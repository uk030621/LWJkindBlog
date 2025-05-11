"use client";

import { signIn, signOut } from "next-auth/react";

export default function AuthButtons({ isAuthenticated, userName }) {
  return (
    <div className="flex flex-col items-center">
      {isAuthenticated ? (
        <>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-700 mt-8">
            Welcome back, {userName}!
          </h1>
          <p className="text-lg text-gray-600 mb-6">You&apos;re signed in.</p>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 mt-8">
            Welcome to Kind Blogs
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Share your stories and thoughts.
            <br />
            <span>Sign in to get started!</span>
          </p>
          {/*<button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In with Google
          </button>*/}
        </>
      )}
    </div>
  );
}
