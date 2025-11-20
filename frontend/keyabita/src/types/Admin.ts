/**
 * Represents an admin user object stored in authentication context.
 *
 * @typedef {Object} Admin
 * @property {number} id - Unique identifier for the admin.
 * @property {string} username - Username of the admin.
 * @property {string} role - Role of the admin (e.g., "superadmin", "editor").
 * @property {string} token - Authentication token for API requests.
 *
 * If no admin is logged in, this can be `null`.
 */
export type Admin = {
    id: number;
  username: string;
  role: string;
  token: string;
} | null;