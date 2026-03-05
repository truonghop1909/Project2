// app/dashboard/staff/buildings/layout.tsx

import { ReactNode } from "react";

export default function StaffBuildingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="p-6">
      {children}
    </div>
  );
}
