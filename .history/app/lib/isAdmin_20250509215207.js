// app/lib/isAdmin.js
export const isAdmin = (email) => {
  const adminEmails = ["admin@example.com", "moderator@example.com"];
  return adminEmails.includes(email);
};
