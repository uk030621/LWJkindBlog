// app/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      {!session ? (
        <>
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Welcome to the Community Blog
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Share your stories and thoughts. Sign in to get started!
          </p>
          <Link
            href="/auth/signin"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In with Google
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Welcome back, {session.user.name}!
          </h1>
          <p className="text-lg text-gray-600 mb-6">You're signed in.</p>
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </form>
        </>
      )}
    </main>
  );
}
