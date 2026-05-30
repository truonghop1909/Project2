// app/(public)/layout.tsx

import { PublicFooter } from "./components/PublicFooter";
import { PublicHeader } from "./components/PublicHeader";


export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-grow">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}