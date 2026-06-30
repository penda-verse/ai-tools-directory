import Link from 'next/link';

export default function ToolCard({ tool }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="block group h-full">
      <div className="glass-panel rounded-2xl p-6 h-full flex flex-col hover-lift relative overflow-hidden transition-all duration-300 border border-white/5 hover:border-purple-500/30">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
            {tool.name}
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
            {tool.category || "AI Tool"}
          </span>
        </div>
        
        <p className="text-gray-400 text-sm flex-grow mb-6 line-clamp-3">
          {tool.short_description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
          <div className="flex items-center space-x-1 text-yellow-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium">{tool.user_rating?.toFixed(1) || "5.0"}</span>
          </div>
          <span className="text-xs font-semibold text-gray-300 bg-white/5 px-2 py-1 rounded-md">
            {tool.pricing_model || "Free"}
          </span>
        </div>
      </div>
    </Link>
  );
}
