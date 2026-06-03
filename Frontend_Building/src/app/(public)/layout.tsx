import { PublicFooter } from './components/PublicFooter';
import { PublicHeader } from './components/PublicHeader';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} min-h-screen flex flex-col bg-white`}>
      <PublicHeader />
      <main className="flex-grow pt-20">{children}</main>
      <PublicFooter />
    </div>
  );
}