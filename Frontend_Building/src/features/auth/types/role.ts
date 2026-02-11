export const ROLE = {
  ADMIN: "ADMIN",
  STAFF: "STAFF",
} as const;

export type Role = typeof ROLE[keyof typeof ROLE];