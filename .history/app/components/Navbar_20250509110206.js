export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between p-4 bg-blue-500 text-white">
      <h1 className="text-xl font-bold">Community Blog</h1>
      <div>
        {session ? (
          <>
            <span className="mr-4">
              {session.user.name} ({session.user.role})
            </span>
            {session.user.role === "admin" && (
              <a href="/dashboard" className="mr-4">
                Dashboard
              </a>
            )}
            <button
              onClick={() => signOut()}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-green-500 px-3 py-1 rounded"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
