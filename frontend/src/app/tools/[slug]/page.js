import Link from 'next/link';
import AdSensePlaceholder from '@/components/AdSensePlaceholder';
import ToolPlayground from '@/components/ToolPlayground';

// Generate dynamic metadata for search engine optimization
export async function generateMetadata(props) {
  const params = await props.params;
  const slug = params.slug;

  try {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/tools/${slug}`);
    if (!res.ok) {
      return {
        title: 'Tool Not Found - AI Tools Directory',
        description: 'The requested AI tool could not be found.'
      };
    }
    const tool = await res.json();
    return {
      title: `${tool.name} - AI Business Tool Details, Pricing & Reviews`,
      description: tool.short_description,
      openGraph: {
        title: `${tool.name} - AI Business Tool Details, Pricing & Reviews`,
        description: tool.short_description,
        type: 'website',
        url: `http://localhost:3000/tools/${tool.slug}`,
      }
    };
  } catch (error) {
    return {
      title: 'AI Tool Details - AI Tools Directory',
      description: 'Review details, pricing and features of AI business tools.'
    };
  }
}

async function getTool(slug) {
  const res = await fetch(`http://127.0.0.1:8000/api/v1/tools/${slug}`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function ToolDetail(props) {
  const params = await props.params;
  const slug = params.slug;
  const tool = await getTool(slug);

  if (!tool) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Tool Not Found</h1>
        <p className="text-gray-400 mb-8">The AI tool you are looking for does not exist or has been removed.</p>
        <Link href="/" className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-full font-medium transition-colors">
          Back to Directory
        </Link>
      </div>
    );
  }

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': tool.name,
    'description': tool.description,
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': tool.pricing_model === 'Free' ? '0' : 'Varies',
      'priceCurrency': 'USD'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': tool.user_rating || '4.5',
      'reviewCount': '24'
    }
  };

  // Static list of premium looking mockup reviews for UX completion
  const mockReviews = [
    {
      author: "Sarah J., Marketing Director",
      rating: 5,
      comment: "Absolutely essential for our daily operations. Saved us hours of manual effort."
    },
    {
      author: "David K., Technical Founder",
      rating: 4.5,
      comment: "Highly functional and integrates nicely into our standard workflow."
    }
  ];

  return (
    <div className="pb-20">
      {/* Schema.org Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Directory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                  {tool.category}
                </span>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-white mt-3">{tool.name}</h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                  {tool.pricing_model}
                </span>
                <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/20">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-bold text-yellow-500">{tool.user_rating?.toFixed(1) || "4.5"}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">{tool.description}</p>

            <div className="flex flex-wrap gap-4">
              <a href={tool.website_url} target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer">
                Visit Website
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
          </div>

          <AdSensePlaceholder slot="tool-detail-mid" />

          {/* Interactive Sandbox Playground */}
          <ToolPlayground tool={tool} />

          {/* User Reviews Section */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">User Reviews</h2>
            <div className="space-y-6">
              {mockReviews.map((review, idx) => (
                <div key={idx} className="border-b border-white/5 last:border-b-0 pb-6 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-white">{review.author}</span>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'fill-current' : 'stroke-current fill-none'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar/AdSense Container */}
        <div className="space-y-8">
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Tool Information</h3>
            <ul className="space-y-4">
              <li className="flex justify-between py-2 border-b border-white/5">
                <span className="text-gray-400 text-sm">Pricing Model</span>
                <span className="text-white text-sm font-medium">{tool.pricing_model}</span>
              </li>
              <li className="flex justify-between py-2 border-b border-white/5">
                <span className="text-gray-400 text-sm">Category</span>
                <span className="text-white text-sm font-medium">{tool.category}</span>
              </li>
              <li className="flex justify-between py-2 border-b border-white/5">
                <span className="text-gray-400 text-sm">Rating</span>
                <span className="text-white text-sm font-medium">{tool.user_rating?.toFixed(1) || "4.5"} / 5.0</span>
              </li>
              <li className="flex justify-between py-2">
                <span className="text-gray-400 text-sm">Added on</span>
                <span className="text-white text-sm font-medium">{new Date(tool.created_at).toLocaleDateString()}</span>
              </li>
            </ul>
          </div>
          
          <AdSensePlaceholder slot="tool-detail-sidebar" />
        </div>
      </div>
    </div>
  );
}
