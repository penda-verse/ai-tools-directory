import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'AI Tools Directory - Find the Best AI for Your Business',
  description: 'A comprehensive directory of the best artificial intelligence tools for business, marketing, finance, HR, and productivity.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-purple-500/30">
        <Header />
        <main className="min-h-screen pt-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
