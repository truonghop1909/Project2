export const ROLE = {
  ADMIN: "ROLE_ADMIN",
  STAFF: "ROLE_STAFF",
} as const;

export type Role = typeof ROLE[keyof typeof ROLE];