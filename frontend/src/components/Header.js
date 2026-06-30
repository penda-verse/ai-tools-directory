import Link from 'next/link';
import TipBar from './TipBar';

export default function Header() {
  return (
    <header className="fixed w-full top-0 z-50 glass-panel border-b border-white/10 flex flex-col">
      <TipBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-gradient">
              AI Tools Directory
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm font-semibold">Home</Link>
            <Link href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm font-semibold">FAQ</Link>
            <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm font-semibold">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-300 hover:text-white transition-colors text-sm font-semibold">Terms</Link>
          </nav>
          <div className="flex items-center">
            <Link href="/contact" className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/30 text-sm font-semibold cursor-pointer">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
