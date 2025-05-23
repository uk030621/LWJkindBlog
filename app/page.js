import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import AuthButtons from "./components/AuthButtons";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col items-center justify-start min-h-screen  px-4 text-center py-4 bg-background">
      <AuthButtons
        isAuthenticated={!!session}
        userName={session?.user?.name || ""}
      />
    </main>
  );
}
