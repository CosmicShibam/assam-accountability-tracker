import { useState, useMemo, useEffect, Fragment } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight, CheckCircle, Clock } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { usePromises } from "../context/PromiseContext";
import { getStatusStyles, getNormalizedStatus } from "../types";

export default function Promises() {
  const { promises } = usePromises();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "All");
  
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearchQuery(q);
    const cat = searchParams.get("category");
    if (cat) setCategoryFilter(cat);
  }, [searchParams]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(promises.map(p => p.category)));
    cats.sort();
    return ["All", ...cats];
  }, [promises]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredPromises = useMemo(() => {
    const filtered = promises.filter(p => {
      const matchCat = categoryFilter === "All" || p.category.toLowerCase() === categoryFilter.toLowerCase();
      const matchSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.promiseText.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (categoryFilter === "All" && !searchQuery) {
      filtered.sort((a, b) => a.category.localeCompare(b.category));
    }
    
    return filtered;
  }, [promises, searchQuery, categoryFilter]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter]);

  const totalPages = Math.ceil(filteredPromises.length / itemsPerPage);
  const displayedPromises = filteredPromises.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-8">
          Government Promises Database
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" size={20} />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full clay-input rounded-xl py-3 pl-12 pr-4 text-on-surface border-none focus:ring-2 focus:ring-primary/50 outline-none placeholder:text-outline-variant" 
              placeholder="Search promises..." 
              type="text" 
            />
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            <span className="font-medium text-sm text-outline mr-2">Filter by:</span>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`clay-chip text-xs px-4 py-2 rounded-full font-medium transition-colors ${categoryFilter === cat ? 'bg-primary-container text-on-primary-container font-bold' : 'bg-surface text-on-surface-variant hover:bg-surface-variant'}`}
              >
                {cat}
              </button>
            ))}
            
            <div className="ml-auto relative">
              <button className="clay-input flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-on-surface">
                <span>Sort: Newest</span>
                <ChevronDown size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPromises.map((p, index) => {
          const styles = getStatusStyles(p.status);
          const showCategoryHeader = categoryFilter === "All" && !searchQuery && (index === 0 || p.category !== displayedPromises[index - 1].category);

          return (
            <Fragment key={p.id}>
              {showCategoryHeader && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-4 mb-2 pb-2 border-b border-outline-variant/30 flex items-center">
                  <h2 className="font-heading text-2xl font-bold text-on-surface">{p.category}</h2>
                </div>
              )}
              <Link to={`/promises/${p.id}`} className="clay-card rounded-[2rem] p-6 flex flex-col h-full hover:scale-[1.02] transition-transform duration-300">
                <div className="flex justify-between items-start mb-4 gap-2">
                  <span className="bg-primary-container/30 text-on-primary-container text-xs px-3 py-1 rounded-full border border-primary-container/50 font-semibold">{p.category}</span>
                  <span className={`px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold text-xs border whitespace-nowrap ${styles.badge}`}>
                    <span className={`w-2 h-2 rounded-full ${styles.bgColor}`}></span> {styles.label}
                  </span>
                </div>
                <h2 className="font-heading text-xl font-medium text-on-surface mb-3 line-clamp-2">{p.title}</h2>
                <p className="text-on-surface-variant mb-6 flex-grow line-clamp-3 text-sm">{p.promiseText}</p>
                <div className="flex justify-between items-end border-t border-outline-variant/20 pt-4 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs text-outline font-medium">Last Verified</span>
                    <span className="text-sm font-medium text-on-surface">{p.lastVerifiedAt || 'Pending'}</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${styles.color}`}>
                    <CheckCircle size={16} />
                    <span className="text-xs font-semibold">Source: {p.sourceTitle ? 'Official' : 'Pending'}</span>
                  </div>
                </div>
              </Link>
            </Fragment>
          );
        })}
        {filteredPromises.length === 0 && (
          <div className="col-span-full py-16 text-center text-outline">
            No promises found matching your criteria.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="clay-input w-10 h-10 rounded-full flex items-center justify-center text-outline-variant hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>
          
          {Array.from({ length: totalPages }).map((_, idx) => {
            const page = idx + 1;
            return (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full font-medium transition-colors ${currentPage === page ? 'bg-primary text-on-primary shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3)]' : 'clay-input text-on-surface-variant hover:text-primary'}`}
              >
                {page}
              </button>
            );
          })}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            className="clay-input w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
