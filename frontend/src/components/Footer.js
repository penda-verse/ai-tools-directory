import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-xl font-bold text-gradient">AI Tools Directory</span>
            <p className="mt-4 text-gray-400 max-w-xs text-sm leading-relaxed">
              Discover and compare the best artificial intelligence tools for business, marketing, finance, HR, and automation.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} AI Tools Directory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
