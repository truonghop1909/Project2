import { ReactNode } from 'react';

interface SidebarMenuSectionProps {
  title: string;
  children: ReactNode;
}

export function SidebarMenuSection({ title, children }: SidebarMenuSectionProps) {
  return (
    <div className="space-y-1">
      <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </p>
      {children}
    </div>
  );
}