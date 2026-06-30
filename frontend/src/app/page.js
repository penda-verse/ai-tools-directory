import ToolCard from '@/components/ToolCard';
import SearchBar from '@/components/SearchBar';
import AdSensePlaceholder from '@/components/AdSensePlaceholder';
import Link from 'next/link';

async function getTools(search = '', category = '') {
  try {
    const url = new URL('http://127.0.0.1:8000/api/v1/tools/');
    if (search) url.searchParams.append('search', search);
    if (category) url.searchParams.append('category', category);

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch tools:", error);
    return [];
  }
}

export default async function Home(props) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || '';
  const activeCategory = searchParams?.category || '';

  const tools = await getTools(search, activeCategory);

  const categories = [
    { name: 'All Tools', value: '' },
    { name: 'Productivity', value: 'Productivity' },
    { name: 'Marketing', value: 'Marketing' },
    { name: 'Design & Video', value: 'Design' }, // Database uses 'Design'
    { name: 'Development', value: 'Development' },
    { name: 'Automation', value: 'Automation' },
    { name: 'Finance', value: 'Finance' },
    { name: 'HR', value: 'HR' }
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="text-center py-16 lg:py-28 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 blur-[130px] rounded-full pointer-events-none"></div>
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
          Find the Perfect <span className="text-gradient">AI Tool</span><br />
          for Your Business
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Discover, compare, and leverage the most powerful artificial intelligence software to automate workflows, optimize operations, and scale faster.
        </p>
        
        {/* Dynamic Search Bar */}
        <SearchBar />
      </section>

      <AdSensePlaceholder slot="home-header" />

      {/* Categories & Filter Tabs */}
      <section className="mt-8">
        <div className="border-b border-white/10 pb-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Browse Categories</h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map((cat) => {
              // Maintain search query if active
              const href = cat.value 
                ? `/?category=${cat.value}${search ? `&search=${search}` : ''}`
                : `/${search ? `?search=${search}` : ''}`;
              
              const isActive = activeCategory === cat.value;

              return (
                <Link
                  key={cat.name}
                  href={href}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Tools Results Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {activeCategory ? `${activeCategory} Tools` : 'All Business AI Tools'}
            </h2>
            <p className="text-gray-400 text-sm">
              Showing {tools.length} curated tool{tools.length === 1 ? '' : 's'} strictly focused on business and productivity.
            </p>
          </div>

          {(search || activeCategory) && (
            <Link
              href="/"
              className="inline-flex items-center text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors bg-purple-500/10 px-4 py-2 rounded-xl border border-purple-500/20 self-start md:self-auto"
            >
              Clear Filters
              <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </Link>
          )}
        </div>

        {/* Grid Display */}
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 glass-panel rounded-3xl border border-white/5">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z"></path>
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">No tools match your query</h3>
            <p className="text-gray-400 max-w-sm mx-auto text-sm">
              We couldn&apos;t find any tools matching your search. Try using other keywords or browsing a different category.
            </p>
          </div>
        )}
      </section>

      <AdSensePlaceholder slot="home-footer" />
    </div>
  );
}
