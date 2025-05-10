// app/page.js

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
        Welcome to the Community Blog
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-xl">
        Share your thoughts, read others&apos;, and collaborate in a space
        powered by the community. Please sign in to get started.
      </p>
    </main>
  );
}
