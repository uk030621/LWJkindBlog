import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/app/lib/mongodb";
import { redirect } from "next/navigation";
import { getUserRole } from "@/app/lib/getUserRole";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const role = await getUserRole(session?.user?.email);

  if (role !== "admin") redirect("/"); // Only admins allowed

  const client = await connectToDB();
  const db = client.db();
  const users = await db.collection("users").find().toArray();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">
                <form
                  action={`/api/users/${user._id}/role`}
                  method="POST"
                  className="inline"
                >
                  <input
                    type="hidden"
                    name="role"
                    value={user.role === "admin" ? "user" : "admin"}
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                  >
                    Make {user.role === "admin" ? "User" : "Admin"}
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
