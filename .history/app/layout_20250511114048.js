import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Providers from "./components/Providers";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Community Blog",
  description: "A collaborative blog platform",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Navbar />
        <Providers session={session}>
          <main className="pt-20">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
