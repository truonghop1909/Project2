// src/app/dashboard/staff/buildings/page.tsx
import { redirect } from "next/navigation";

export default function BuildingsIndexPage() {
  // Chuyển hướng mặc định đến my-buildings
  redirect("/dashboard/staff/buildings/my-buildings");
}