// src/app/dashboard/staff/buildings/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BuildingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    { name: "Tòa nhà được giao", href: "/dashboard/staff/buildings/my-buildings" },
    { name: "Tất cả tòa nhà", href: "/dashboard/staff/buildings/all-buildings" },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>
      {children}
    </div>
  );
}