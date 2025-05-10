// app/lib/isAdmin.js
export const isAdmin = (email) => {
  const admins =
    process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];
  return admins.includes(email);
};
